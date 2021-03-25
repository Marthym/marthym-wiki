---
title: "DNS systemd-resolved"
category: Linux
subcategory: Réseau
tags: [linux, network, dns, systemd]
---

C’est le nouveau system de resolution DNS à base de systemd qui vient remplacer les anciens système tel que `resolvconf` et même le fichier `/etc/resolv.conf`. Il est récent et du coup pas forcément actif sur toutes les distributions.

Le gros avantage de `systemd-resolved` c’est le **Split DNS**. La capacité a choisir le DNS en fonction de l’interface réseau et du domaine que l’on souhaite résoudre. Dans le cas de VPN par exemple ça peut être pratique.

## Activation de `systemd-resolved`

Sur les dernières version de Debian par exemple (Debian 11 testing de mars 2021) c’est resolvconf qui fait le taff. Donc il y a quelque manipulations pour l’activer :

### Activer le service `systemd-resolved`

```shell
systemctl enable systemd-resolved.service
```

### Modifier la conf de NetworkManager

Dans le fichier `/etc/NetworkManager/conf.d/use-resolved.conf`

``` 
[main]
dns=systemd-resolved
```

### Installer les plugins NSSwitch nécessaires

```shell
apt install libnss-mymachines libnss-myhostname libnss-resolve
```

### Configurer NSSwitch pour passer par resolve 

Dans le fichier `/etc/nsswitch.conf`

```
hosts:          mymachines resolve [!UNAVAIL=return] files myhostname dns
```
