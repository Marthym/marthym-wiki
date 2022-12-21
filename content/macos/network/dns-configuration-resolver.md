---
title: "DNS Resolver MacOS"
category: MacOS
subcategory: Réseau
tags: [macos, network, dns]
---

Comme pour Linux avec systemd, MacOS est capable de gérer des résolvers spécifiques à un nom de domaine en particulier. Pour cela il suffit d’ajouter un fichier dont le nom est le nom de domaine dans `/etc/resolver/`. Exemple :

`/etc/resolver/trenzalor.lo`

```
nameserver 192.168.0.42
search_order 1
```

Pour vérifier la configuration, la commande `scutil --dns` doit donner ce genre de chose

```
resolver #8
  domain   : trenzalor.lo
  nameserver[0] : 192.168.0.42
  flags    : Request A records, Request AAAA records
  reach    : 0x00000002 (Reachable)
  order    : 1
```
