---
title: "Mettre à jour une Jail"
category: Linux
subcategory: FreeNAS
tags: [linux, freenas, jail, bsd]
---

Les Jails dans FreeNAS s’administrent à l’aide d’`iocage`. Quand on crée une jail on la base sur une version de BSD. La commande `iocage list` montre la version du système de la jail.

```shell
# iocage list
+-----+--------------+-------+--------------+---------------+
| JID |     NAME     | STATE |   RELEASE    |      IP4      |
+=====+==============+=======+==============+===============+
| 1   | trucmachin   | up    | 11.3-RELEASE | 192.168.0.102 |
+-----+--------------+-------+--------------+---------------+
| 2   | machintruc   | up    | 11.3-RELEASE | 192.168.0.103 |
+-----+--------------+-------+--------------+---------------+
| 3   | trucmuch     | up    | 11.2-RELEASE | 192.168.0.104 |
+-----+--------------+-------+--------------+---------------+
```

Pour mettre à jour le système d’une jail :

```shell
# iocage update trucmuch
```

Ensuite il est recommandé de faire une snapshot de la jail au cas où. Dans la partie `Volume` de FreeNAS.

```shell
# iocage upgrade -r 11.3-RELEASE trucmuch
```
