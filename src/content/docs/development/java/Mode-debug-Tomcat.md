---
title: "Mode debug sur Tomcat"
category: Développement
subcategory: Java
tags: [development, java, tomcat, debug, server, remote]
---
Comme pour [jboss], il est possible de démarrer Tomcat en mode debug pour pouvoir s'y connecter ensuite 
via [Eclipse], il s'agit du mode JPDA :

``` sh
catalina.sh jpda run
```

Tomcat écoute alors sur le port `8000`.

[jboss]: {{% relref "serveurs/jboss" %}}
[Eclipse]: {{% relref "outils/eclipse" %}}