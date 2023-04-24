---
title: "Configuration TSIG pour bind9 et OctoDNS"
category: Serveurs
subcategory: DNS
tags: [server, dns, bind9, security]
---

Suite à Devoxx 2023 où j'ai entendu parler de OctoDNS, j'ai essayé de le mettre en place sur mon infra. Cette dernière est à base de [bind9](https://www.isc.org/bind/).

J’espérais que le provider pour bind9 saurait me créer des fichiers que je n’aurais plus qu’à pousser sur le serveur, mais non, il ne sait que lire ces fichiers ou mettre à jour via [AXFR](https://fr.wikipedia.org/wiki/Transfert_de_zone_DNS) et [RFC 2136](https://datatracker.ietf.org/doc/html/rfc2136). Ce qui est somme toute déjà pas mal. Je me suis donc lancé dans la configuration de bind9 pour la RFC.

## TSIG vs DNSSEC

Déjà, les documentations sont assez confusantes surtout quand on ne maîtrise pas. La configuration de clés TSIG ne nécessite pas de paire de clés. La pluspart des documentations font référence à la configuration DNSSEC qui est un peu plus complèxes et qui elles demandent l’utilisation de paire de clés. Et dans la configuration DNSSEC, la notion de clé TSIG intervient aussi ce qui vient parfaire la confusion.

## Génération de la clé TSIG

On commence par générer une clé [TSIG](https://fr.wikipedia.org/wiki/TSIG) à l’aide de la commande suivante :

```shell
tsig-keygen example.org
key "example.org" {
        algorithm hmac-sha256;
        secret "zvILnd5/3wGl4kWlBBrxApdtmclR5A4Ar3VSH1IR8mQ=";
};
tsig-keygen example.org > /etc/bind/example.org.key
chmod 400 /etc/bind/example.org.key
```

`tsig-keygen` génère la déclaration complète de la clé. On peut rediriger vers un fichier qui sera inclus dans notre `named.conf`.

Généralement, on choisit un nom de clé qui ressemble à un domaine, mais rien d’obligatoire. On prendra soin de limiter au maximum les accès à ce fichier qui contient un secret.

## Configuration bind9

Le fichier de la clé est à inclure dans le `named.conf` sur Debian et fils, c’est plus dans le fichier `named.conf.local` qui est le fichier portant la configuration locale de bind.

```conf
include /etc/bind/example.org.key;

zone "example.org." {
  type master;
  file "/var/lib/bind/db.example.org";
  notify explicit;
  # this enables AXFR
  allow-transfer { key example.org; };
  # this allows RFC 2136
  allow-update { key example.org; };
};
```

On redémarre Bind9 et c’est terminé. Il n’y a rien de plus. On redémarre et ça fonctionne.

On peut aussi ouvrir un peu en autorisant le réseau local au niveau de `allow-update` :

```shell
# Autorise le réseau local et la clé
allow-update { !{ !localnets; any; }; key example.org ;};
```

## Configuration Firewall

Si vous avez tendance à fermer tout ce qui peut l’être, vous n’avez ouvert pour le DNS que le port 53 pou l’UDP. Mais le protocole AXFR utilise TCP. Il ne vous faudra donc pas oublier d’ouvrir le 53 aussi sur TCP sans quoi vous allez prendre des timeout.

## Tester la configuration

Via une commande `dig` vous pouvez demander au serveur DNS d’exporter une zone. Cela vous permettra de savoir si cela fonctionne.

```shell
dig –y hmac-sha256:example.org:zvILnd5/3wGl4kWlBBrxApdtmclR5A4Ar3VSH1IR8mQ= @192.168.1.172 AXFR example.org.
```

## Remarques

Pour dire à un serveur bind qu’il doit utiliser une clé particulière pour contacter un autre serveur, la configuration suivante est nécessaire :

```conf
server 192.168.1.172 {
    keys {example.org};
};
```

## Liens

* https://bind9.readthedocs.io/en/v9_18_4/chapter6.html#tsig
