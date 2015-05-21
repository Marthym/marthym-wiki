[[_TOC_]]
L'idée est de créer sur une clé USB une partition chiffré. Mais pas seulement, afin de rendre cette partition lisible sur Windows comme sur 
Linux et de pas avoir un clé vide sous Windows, ce qui semblerait louche, il faut avoir deux partition, une en clair et une en crypté. 
C'est pas si simple que ça en a l'air.

Ce tuto est plus ou moins un copie des tutos en liens que je met là au cas où le site disparaîtrait. 
J'ai quand même modifié quelques truc qui ne fonctionnaient pas à cause de traductions "à l'arrache".

## Introduction
Au cas où vous perdriez votre clé USB, toutes les données stockées dessus seront perdues et ce qui est plus important, 
elles seront très probablement dans les mains d'une autre personne qui aura alors accès à vos informations privées et utiliser ces informations 
si elle le juge approprié. C'est l'une des craintes de nombreux utilisateurs de clé USB. Une solution qui peut être facilement appliquée, consiste à ne 
pas stocker toute information privée sur une clé USB, mais cela va diminuer l'atout principal de votre clé USB à un strict minimum limité à toutes les 
données non-privée depuis qu'elles peuvent être presque toujours téléchargées n'importe quand et n'importe où à partir d'Internet. Une autre solution 
est de chiffrer (crypter) votre clé USB, celle-ci sera accessible uniquement aux utilisateurs qui possèdent le mot de passe correct qui permettra de 
déchiffrer les données.

Bien que le cryptage d'une clé USB semble être la meilleure solution et la plus facile, il faut indiquer qu'elle contient de nombreux inconvénients. 
Un inconvénient est que le décryptage de la clé USB doit être fait en utilisant un système Linux avec la version du noyau 2.6 ou supérieur, qui a un 
module « dm_crypt » chargé dans le noyau en cours d'exécution. Il existe quand même un moyen de déchiffrer une clé chiffré comme on va le faire depuis 
Windows grâce à un logiciel gratuit que l'on placera sur la partition non crypté de la clé.

NOTE:
Toutes les données sur votre clé USB seront détruits de manière Sauvegardez votre clé USB avant de continuer. 
Remplacer /dev/sdX avec le nom de fichier de votre périphérique bloc USB.

NOTE: Toutes les manip sont effectuée en super-utilisateur. Vérifiez toutes les commandes à deux fois avant de les valider, elles sont irréversible, 
si vous vous trompé de partition c'est mort !

## Partitionnement d'une clé USB
[[.img/luks-01.png|align=center]]

Commençons par savoir sur quel périphérique est votre clé :

``` sh
mount
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
udev on /dev type devtmpfs (rw,relatime,size=10240k,nr_inodes=1014025,mode=755)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000)
tmpfs on /run type tmpfs (rw,nosuid,noexec,relatime,size=812588k,mode=755)
/dev/disk/by-uuid/60b1acc3-2986-4799-b2ac-c6f61f6b3ce2 on / type ext4 (rw,relatime,errors=remount-ro,user_xattr,barrier=1,data=ordered)
tmpfs on /run/lock type tmpfs (rw,nosuid,nodev,noexec,relatime,size=5120k)
tmpfs on /run/shm type tmpfs (rw,nosuid,nodev,noexec,relatime,size=3287720k)
/dev/sdc1 on /boot/efi type vfat (rw,relatime,fmask=0022,dmask=0022,codepage=cp437,iocharset=utf8,shortname=mixed,errors=remount-ro)
/dev/md0 on /home type ext4 (rw,relatime,errors=remount-ro,user_xattr,barrier=1,stripe=128,data=ordered)
rpc_pipefs on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw,relatime)
binfmt_misc on /proc/sys/fs/binfmt_misc type binfmt_misc (rw,nosuid,nodev,noexec,relatime)
fusectl on /sys/fs/fuse/connections type fusectl (rw,relatime)
vmware-vmblock on /run/vmblock-fuse type fuse.vmware-vmblock (rw,nosuid,nodev,relatime,user_id=0,group_id=0,default_permissions,allow_other)
/dev/sde1 on /media/NOUVEAU NOM type vfat (rw,nosuid,nodev,relatime,uid=1000,gid=1000,fmask=0022,dmask=0077,codepage=cp437,iocharset=utf8,shortname=mixed,showexec,utf8,flush,errors=remount-ro,uhelper=udisks)
```

Ici on voit la clé sur la dernière ligne, en vfat. Notre périphérique est donc `/dev/sde`.

On peut maintenant partitionner notre clé (as root) : 

``` sh
cfdisk /dev/sde
```

Dans la capture ci-à-droite, on peut voir comment doivent se retrouver les partitions. On en crée 2, la première en principale sera la partition non crypté, 
la deuxième partition logique, sera la partition crypté. Dans ce cas, chaque partition fait 1 Go. Il faut "Maximiser" les partitions pour que la 
partition prenne réellement 1Go.

Pensez bien à enregistrer les modifications dans la table de partition !
Déconnectez la clé puis la rebrancher pour être sur que le système a bien pris en compte les nouvelles partitions.

## Ecrire des données aléatoires
Pour éviter des attaques par motifs du chiffrement, il est conseillé d'écrire des données aléatoires sur une partition avant de procéder à un chiffrement. 
La commande suivante ''dd'' peut être utilisé pour écrire ces données à votre partition, cela peut prendre un certain temps. Celui-ci dépend de l'entropie 
générée par votre système.<br/>
Dans notre cas, on voit que la partition qui va être chiffré est la `/dev/sde5` :

``` bash
dd bs=4K if=/dev/urandom of=/dev/sde5
```

## Chiffrement de partition
Maintenant il est temps de chiffrer la partition nouvellement créée. À cette fin, nous allons utiliser l'outil **cryptsetup**. Si la commande cryptsetup n'est pas disponible sur votre système, assurez-vous que le paquet cryptsetup soit installé. 

``` bash
apt-get install cryptsetup
```

La commande suivante va chiffrer `/dev/sdX1` partitionner avec 256-bit AES XTS algorithme. Cet algorithme est disponible sur n’importe quel noyau 
de version supérieur à 2.6.24.

``` bash
cryptsetup -h sha256 -c aes-xts-plain -s 256 luksFormat /dev/sde5
```

~~~
    ATTENTION!
    ========
    Cela va écraser les données sur /dev/sdX1 de façon irrévocable.
    Etes-vous sûr? (Majuscules Type oui): OUI
    Enter LUKS passphrase:
    Vérifiez mot de passe:
    Command succès.
~~~

Prenez bien garde à entrer un mot de passe dont vous vous souviendrez, c'est pas récupérable si vous l'oubliez !

## Montage USB partition et le déchiffrement
Dans l'étape suivante, nous allons définir le nom de notre partition chiffrée pour être reconnu par le mappeur de périphériques du système. 
Vous pouvez choisir n'importe quel nom. Par exemple, nous pouvons utiliser le nom de «private»:

``` bash
cryptsetup luksOpen /dev/sde5 private
    Enter LUKS passphrase:
    sous la touche 0 déverrouillé.
    Command succès.
```

Après l'exécution de cette commande, votre partition chiffrée sera disponible pour votre système, comme `/dev/mapper/private`, //private// étant le nom que 
vous avez donnez à luksOpen. Nous pouvons maintenant créer le système de fichiers et monter la partition dans /dev/mapper/private :

``` bash
mkfs.ext4 /dev/mapper/private
```

### Optionnel
NOTE: Je laisse cette partie à titre indicatif mais elle n'est pas nécessaire, on peut passer direct au grand paragraphe suivant.

Créer un point de montage et monter une partition:

``` bash
mkdir /media/private
mount /dev/mapper/private /media/private
chown-R myusername.myusername /media/private
```

Maintenant, votre partition chiffrée est disponible dans /media/private. Si vous ne souhaitez pas d'avoir un accès à la partition cryptée sur votre 
clé USB de plus vous devez d'abord le démonter du système, puis utiliser la commande cryptsetup pour fermer la protection connecté.

``` bash
umount /media/private
cryptsetup luksClose /dev/mapper/private
```
    
## Utilisation de la clé
### Linux
C'est le plus simple sous Linux, la plus part des système récent détectent automatiquement les partitions LUKS et demandent la passphrase au branchement.

### Windows
Sous Windows il ne voit même pas la partition crypté. 

La première chose à faire est de formater la partition normale en FAT 32. 

Remarque : Si on a une grosse clé et que l'on veut des gros fichiers, on peut faire en NTFS ou en 
[[exFAT|https://mabouali.wordpress.com/2012/10/27/exfat-for-your-usb-flash-drives/]].

Ensuite, pour pouvoir lire la partition sur Windows, on peut utiliser [[FreeOTFE|http://www.freeotfe.org/download.html]]. 
La bonne idée c'est d'installer la version "portable" sur la partition non chiffré ce qui permet alors de lire la partition non chiffré. 
Faite quand même attention que le mot de passe ne traîne pas sur la partition non chiffré !!

## Liens
  * en &rarr; [[http://www.linuxconfig.org/usb-stick-encryption-using-linux]]
  * fr &rarr; [[http://monblog.system-linux.net/blog/2011/03/19/chiffrement-du-systeme-de-fichiers-dune-cle-usb/]]
  
<!-- --- tags: linux, security -->
