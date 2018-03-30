Chose qui peut être pratique si l'on a une VM valable 30 jours ou avec des logiciels valable un certain laps de temps ...

Dans le fichier _.vmx_, ajouter les lignes suivantes :

~~~
tools.syncTime = "FALSE"
time.synchronize.continue = "FALSE"
time.synchronize.restore = "FALSE"
time.synchronize.resume.disk = "FALSE"
time.synchronize.shrink = "FALSE"
time.synchronize.tools.startup = "FALSE"
time.synchronize.tools.enable = "FALSE"
time.synchronize.resume.host = "FALSE"
rtc.startTime = "1342101600"
~~~

**Attention** il se peut que `tools.syncTime` soit déjà déclaré dans le fichier. Pour `rtc.startTime` c'est le timestamp 
qui correspond à l'heure de la VM souhaité. Pour s'aider à la convertion heure/timestamp on peut aller sur ce site : 
http://www.4webhelp.net/us/timestamp.php

<!-- --- tags: vmware -->