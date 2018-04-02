---
title: "Changer le nom d’une machine sans péter XE"
category: Serveurs
subcategory: Oracle
tags: [server, oracle, database]
---

  * [Changer le nom d’une machine]({% link _docs/linux/administration/Changer-le-nom-d'une-machine.md %})
  
Puis chercher les fichiers de configuration réseau _(par défaut dans : /usr/lib/oracle/xe/app/oracle/product/10.2.0/server/network/admin )_
  * listener.ora
  * tnsnames.ora

Remplacer l'ancien par le nouveau nom.

**Attention, faut remplacer le NOM de la machine par le nouveau NOM, pas par l'IP ni par localhost ni un truc du genre 
sinon ça fonctionne pas !**
