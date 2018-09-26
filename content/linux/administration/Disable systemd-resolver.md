---
title: "Désactiver le DNS Resolver de System-D"
category: Linux
subcategory: Administration
tags: [linux, sysadmin, systemd, dns]
---

Dans ses dernières versions systemd embarque un resolver de dns. Malheureusement il est pas encore tout à fait sec et il peut y avoir des raté. Pour évité d’essuyer les platres, il est possible de réactiver l’ancien celui de NetworkManager.

<!-- more -->

1. Dans le NetworkManager activer le DNS par defaut

```bash
sudo vi /etc/NetworkManager/NetworkManager.conf

#Dans la section [main] ajouter
[main]
...
dns=default
...
```

2. Désactiver `systemd-resolved`

```bash
sudo systemctl disable systemd-resolved
sudo rm /etc/resolv.conf
sudo service network-manager restart
```

