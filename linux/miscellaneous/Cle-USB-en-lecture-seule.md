Pour diverses raisons, une clé USB (notamment celles en FAT32) peuvent se retrouver 
monté en lecture seule. Il y a une multitude de cas et de solutions :

## Montage auto "as root"
C'est le montage automatique de Gnome ou autre qui se fait en tant que root et du coup 
impossible d'écrire autrement qu'en étant root. Dans ce cas vérifier dans `/etc/fstab` 
qu'il n'y ai pas les lignes suivantes :

~~~
/dev/sdc1       /media/usb0     auto    rw,user,noauto  0       0
/dev/sdc2       /media/usb1     auto    rw,user,noauto  0       0
~~~

Mieux vaut pas de configuration par défaut qu'une mauvaise conf.

<!-- --- tags: linux -->
