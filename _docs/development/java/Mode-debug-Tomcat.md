---
title: "Mode debug sur Tomcat"
category: Développement
subcategory: Java
tags: [development, java, tomcat, debug, server, remote]
---
Comme pour [[jboss]], il est possible de démarrer Tomcat en mode debug pour pouvoir s'y connecter ensuite 
via [[Eclipse|eclipse]], il s'agit du mode JPDA :

``` sh
catalina.sh jpda run
```

Tomcat ecoute alors sur le port `8000`.
