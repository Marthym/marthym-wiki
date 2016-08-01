Au fil des mises à jours d'une Debian, il arrive que des fichiers de configuration ne soient pas bien nettoyé. Il est parfois difficile dans les deb de supprimer des fichiers. Voilà comment trouver ces fichiers obsolète et les supprimer.

## Procédure standard

```bash
dpkg-query -W -f='${Conffiles}\n' | grep 'obsolete$'

 /etc/apparmor.d/abstractions/evince ae2a1e8cf5a7577239e89435a6ceb469 obsolete
 /etc/apparmor.d/tunables/ntpd 5519e4c01535818cb26f2ef9e527f191 obsolete
 /etc/apparmor.d/usr.bin.evince 08a12a7e468e1a70a86555e0070a7167 obsolete
 /etc/apparmor.d/usr.sbin.ntpd a00aa055d1a5feff414bacc89b8c9f6e obsolete
 /etc/bash_completion.d/initramfs-tools 7eeb7184772f3658e7cf446945c096b1 obsolete
 /etc/bash_completion.d/insserv 32975fe14795d6fce1408d5fd22747fd obsolete
 /etc/dbus-1/system.d/com.redhat.NewPrinterNotification.conf 8df3896101328880517f530c11fff877 obsolete
 /etc/dbus-1/system.d/com.redhat.PrinterDriversInstaller.conf d81013f5bfeece9858706aed938e16bb obsolete
```

L'idée est ensuite de trouver à quel package appatiennent ces fichiers puis de supprimer le fichier et demander une reconfiguration du package en question :

```bash
dpkg -S /etc/bash_completion.d/initramfs-tools
initramfs-tools: /etc/bash_completion.d/initramfs-tools
dpkg -S /etc/bash_completion.d/insserv
initramfs-tools: /etc/bash_completion.d/insserv
```

Donc nos fichiers initramfs-tools et insserv appartiennent à initramfs-tools. 

```bash
rm /etc/bash_completion.d/initramfs-tools /etc/bash_completion.d/insserv
apt install --reinstall initramfs-tools insserv
```

Et voilà.

Malheureusement, ça ne fonctionne pas pour tous les types de fichier, ça serait trop facile.

## Les fichiers dbus-1
Pour je ne sais quelle raison, ça ne fonctionne pas avec les fichiers présent dans `/etc/dbus-1/system.d/`, il faut alors ré-installer les packages correspondant.

```bash 
dpkg -S /etc/dbus-1/system.d/com.redhat.NewPrinterNotification.conf
  system-config-printer-common: /etc/dbus-1/system.d/com.redhat.NewPrinterNotification.conf
dpkg -S /etc/dbus-1/system.d/com.redhat.PrinterDriversInstaller.conf
  system-config-printer-common: /etc/dbus-1/system.d/com.redhat.PrinterDriversInstaller.conf

apt purge system-config-printer-common
apt install system-config-printer
```

Inutile de les supprimer à la main.

## Les fichiers Apparmor
Et biensûr les fichiers apparmor pausent aussi des problèmes. Purger le package qui les installe ne change rien du tout. Il semble qu'il faille aussi purger les profils apparmor.

```bash
apt purge apparmor-profiles apparmor-profiles-extra evince ntp
apt install apparmor-profiles apparmor-profiles-extra evince ntp
```

Rq: Pourquoi `evince` et `ntp` sont de la partie. Je sais pas, François Marier suspecte que ces fichiers sont livré pour l'un des package apparmor mais qu'ils sont finalement migré par `evince` ou `ntp` eux même et que du coup `dpkg` s'emmèle les pinceaux.

## Liens

  * [[https://feeding.cloud.geek.nz/posts/cleaning-up-obsolete-config-files-debian-ubuntu/]]

