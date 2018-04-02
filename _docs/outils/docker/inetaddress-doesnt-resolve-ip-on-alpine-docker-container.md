---
title: "InetAddress does’nt resolve ip on alpine docker container"
category: Outils
subcategory: Docker
tags: [development, docker, error]
---
C'est un problème qu'on a rencontré quand on a voulu réduire la taille des docker en utilisant l'image Alpine
comme image de base.

## Symptome

    Exception in thread "main" java.net.UnknownHostException: mysql: unknown error
        at java.net.Inet6AddressImpl.lookupAllHostAddr(Native Method)
        at java.net.InetAddress$2.lookupAllHostAddr(InetAddress.java:928)
        at java.net.InetAddress.getAddressesFromNameService(InetAddress.java:1323)
        at java.net.InetAddress.getAllByName0(InetAddress.java:1276)
        at java.net.InetAddress.getAllByName(InetAddress.java:1192)
        at java.net.InetAddress.getAllByName(InetAddress.java:1126)
        at java.net.InetAddress.getByName(InetAddress.java:1076)
        at SomaDBTest.main(SomaDBTest.java:52)

## Solution
En gros l'image Alpine veut par défaut résoudre les noms de machine pas DNS en priorité au lieu d'utiliser d'abord les fichiers (hosts).

```docker
RUN echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf
```
