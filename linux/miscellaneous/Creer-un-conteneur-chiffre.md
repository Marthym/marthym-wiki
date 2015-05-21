L'idée ici est de créer un fichier n'importe où sur le disque. Se fichier pourra être monté comme une partition et contiendra des données chiffrées.

## Création du fichier
Attention, c'est ici que l'on détermine la taille du fichier et c'est pas facile à changer par la suite

~~~ bash
dd if=/dev/urandom of=testfile bs=1M count=5000
~~~

Ici on a un fichier de 5 Go.

## Création de la partition
On va ensuite monter ce ficheir comme une partition grâce à losetup 

~~~ bash
# losetup -f
/dev/loop0

# losetup /dev/loop0 testfile
~~~

Attention, la commande suivante efface tout ce qui se trouve dans le fichier :

~~~ bash
# cryptsetup luksFormat /dev/loop0
~~~

Répondre YES puis saisir le mot de passe du volume.

~~~ bash
# cryptsetup luksOpen /dev/loop0 testfs
# mkfs.ext4 /dev/mapper/testfs
~~~

A ce stade, la partition est créée. Il ne reste plus qu'à la monter avec :

~~~ bash
# mount -o rw /dev/mapper/testfs /media/testfs
~~~

## Après le redémarrage
Le conteneur ne reste monté que le temps d'un démarrage si vous ne le démontez pas entre temps. Après un redémarrage, pour monté/démonter un conteneur
voici un script qui permet de le faire en automatique :

~~~ bash
#!/usr/bin/env bash
###################################
# Montage de containeur chiffré
#
#	$1 = fichier containeur à monter
#

if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Doit être lancé en tant que ROOT"
    exit
fi

mntrep=$1
mntfile=${mntrep##*/}
mntrep="/media/$mntfile"

mount|grep -q $mntfile

if [ $? == 1 ]
then 
	loopdev=$(losetup -f)
	losetup $loopdev $1
	cryptsetup luksOpen $loopdev $mntfile
	mkdir $mntrep
	mount -o rw /dev/mapper/$mntfile $mntrep
	chmod 777 $mntrep
	echo "Partition cryptfs monté !"
else 
	umount $mntrep
	rm -Rf $mntrep
	cryptsetup luksClose /dev/mapper/$mntfile
	output=$(losetup -a | grep $mntfile)
	for LINE in ${output} ; do
		echo ${LINE}
		losetupres=${LINE}
		loopdev=${losetupres%%:*}
		losetup -d $loopdev
	done 

	echo "Partition cryptfs démonté !"
fi
~~~

## Trucs & Astuces
 * Une bonne idée est ensuite de cacher le fichier dans un répertoire ... caché, exemple ".trucmachinquiarienavoir"
 * Le fichier peut être renommé autant de fois que nécessaire
 
<!-- --- tags: linux, security -->
