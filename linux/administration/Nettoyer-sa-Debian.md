Même si ce n'est pas dans les proportion de Windows, un Linux a tendance à accumuler des reliquats de vieux paquets et du cache pas vraiment
utile qui à la longue pèsent lourd sur l'espace disque (ça ne ralenti pas le système pour autant).

## Localepurge
C'est la première chose à faire, ''localepurge'' est un outil qui à chaque install de paquet ou de mise à jour, va faire le ménage dans les langues installé.
Sa première utilisation va potentiellement faire gagner pas mal de place.

``` sh
apt-get install localepurge
localepurge
```

Cette opération ne se fait qu'une fois, par la suite localepurge se lance automatiquement avec ''apt''.

## Le nettoyage régulier
### Les symptomes
Si on lance la commande suivante
``` sh
du -hs /var/cache/apt/archives
728M /var/cache/apt/archives
```

On constate que le cache des paquets prend une place significative au sein du système pour une utilité très réduite.

### La solution
Cette suite de commande va permettre d'effectuer un nettoyage rapide des caches d'apt sans risque d'endommager le système :
``` sh
apt-get autoclean
apt-get clean
apt-get autoremove
```

La première commande supprimera tous les paquets .deb présent dans le cache dont une version plus récente est installé, la deuxième supprime tous les paquets
du cache, et non pas seulement ceux obsolètes comme la commande précédente, enfin la troisième commande supprime les dépendances qui ne sont plus nécessaires.

Si vous faite un `du` par la suite vous verrez le gain de place.

## Gagner encore de la place
Si cela n'a pas suffit, voici encore quelques façons de gratter un peu de place.

  * **Nettoyer /var/tmp** ce dernier contient des fichier ... temporaires non effacé
  * **Nettoyer /var/log** qui contient les log du système

### Nettoyer les kernels
Lors des mise à jour de kernel, les anciens kernel sont conservé afin de pouvoir y revenir en cas de problème.
Il est possible de dés-installer les anciens kernel ainsi que tout ce qui leur est associé (header, src, ...) via apt-get.

La commande suivante vous permet de connaître le kernel actuellement utilisé

``` sh
uname -r
3.2.0-3-amd64
```

Celle pour les kernels installé :
``` sh
dpkg --list 'linux-image*'

Souhait=inconnU/Installé/suppRimé/Purgé/H=à garder
| État=Non/Installé/fichier-Config/dépaqUeté/échec-conFig/H=semi-installé/W=attend-traitement-déclenchements
|/ Err?=(aucune)/besoin Réinstallation (État,Err: majuscule=mauvais)
||/ Nom                     Version          Architecture     Description
+++-=======================-===========-=============-====================================================
un  linux-image             <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-486     <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-686     <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-686-big <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-amd64   <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-k7      <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-openvz- <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-vserver <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-vserver <aucun>                   (aucune description n'est disponible)
un  linux-image-2.6-xen-686 <aucun>                   (aucune description n'est disponible)
ii  linux-image-3.2.0-3-486 3.2.23-1    i386          Linux 3.2 for older PCs
ii  linux-image-3.2.0-4-486 3.2.32-1    i386          Linux 3.2 for older PCs
ii  linux-image-486         3.2+46      i386          Linux for older PCs (meta-package)
```

Les "**ii**" sont les packages installé, pour supprimer ceux qui ne sont plus utilisé, dans l'exemple précédent c'est le **3.2.0-3-486** :

``` sh
apt-get purge linux-image-3.2.0-3-486 linux-headers-3.2.0-3*
```

**ATTENTION Cette commande est a utiliser avec beaucoup de parcimonie, c'est irréversible et ça casse la VM ou le PC définitivement !**

### Trouver les gros fichiers
[[include:Trouver les gros fichiers]]

## Liens
  * http://www.crowd42.info/quelques-pistes-pour-nettoyer-se-debian-ou-ubuntu
  * http://forum.ovh.com/showthread.php?t=27814

<!-- --- tags: linux -->