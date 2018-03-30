<!-- --- title: Java / Installer Java Sun JDK sous Debian -->
C'est très simple mais faut avoir les bons dépôt activé.

## Vérifier la liste de ces dépôts
Éditer le fichier `/etc/apt/sources.list` et faites en sorte qu'il ressemble à ça :

~~~
# deb cdrom:[Debian GNU/Linux testing _Wheezy_ - Official Snapshot i386 CD Binary-1 20111205-04:44]/ wheezy main

deb http://ftp.fr.debian.org/debian/ testing main contrib non-free
deb-src http://ftp.fr.debian.org/debian/ testing main contrib non-free

deb http://security.debian.org/ testing/updates main contrib non-free
deb-src http://security.debian.org/ testing/updates main contrib non-free

deb http://ftp.fr.debian.org/debian/ stable main contrib non-free
deb-src http://ftp.fr.debian.org/debian/ stable main contrib non-free

deb http://security.debian.org/ stable/updates main contrib non-free
deb-src http://security.debian.org/ stable/updates main contrib non-free
~~~

Ce qui est important c'est d'avoir ''contrib non-free'' dans ses dépôts car le Java Sun se trouve dans les ''non-free'',
sinon c'est |OpenJDK qui est dans les ''main'' mais qui peut poser des soucis.

Attention, les lignes ''testing'' ne doivent pas être là si vous utiliser un Debian Stable ! Par contre pour une Debian en Testing,
il faut les deux, donc rajouter les ligne ''stable'' qui n'y sont pas par défaut.

## Installer Java

``` sh
apt-get install sun-java6-jdk
```

Note que si vous n'avez besoin que de JRE la procédure est la même mais le paquet est sun-java6-jre. Le paquet JDK contient la JRE,
il n'est donc pas nécessaire d'installer les deux.

## Installer l'alternative
[[include:../linux/Comment installer une alternative]]

<!-- --- tags: linux, java -->