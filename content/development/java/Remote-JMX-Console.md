---
title: "Remote JMX Console"
category: Développement
subcategory: Java
tags: [development, java, jmx, console, remote]
---
Pour passer une application Java en JMX Remote Console, il faut ajouter des paramètres :

~~~
-Djava.rmi.server.hostname=172.17.10.19 
-Dcom.sun.management.jmxremote.port=1088 
-Dcom.sun.management.jmxremote.ssl=false 
-Dcom.sun.management.jmxremote.authenticate=false
~~~
