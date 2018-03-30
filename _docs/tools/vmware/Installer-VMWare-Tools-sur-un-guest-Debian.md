Les VMWare Tools ne sont pas obligatoire sur les guests mais ils permettent de faire pas mal de truc comme gérer proprement la sourie si vous avez une
interface graphique, activer les répertoires partagés avec l'hôte ou réduire le vmdk de votre VM après y avoir fait le ménage.

Les étapes suivantes nécessites d'être root sur la machine. Pour ça soit

``` sh
sudo -i
```

soit
``` sh
su -
```

## Installation des paquets pré-requis
Les VMTools se compilent sur la machine, il faut donc installer au préalables les outils de compil sur la machine :

``` sh
apt-get update
apt-get upgrade
```

Ceci met à jour les dépôts et les paquets sur la machine.
``` sh
apt-get install gcc linux-headers-`uname -r` libglib2.0-0
```

Validez que vous souhaitez continuer ...<br/>
Cela installe le compilateur, ses dépendances ainsi que les entêtes correspondant au noyaux de la machine.

## Récupérer les fichiers d'installation
Il faut maintenant récupérer les scripts d'installation, pour ça, une fois la machine démarré, au niveau de VMPlayer aller dans
"Virtual Machine -> Install VMWare Tools ..." et cliquer sur "Install". Contrairement à Windows, cette action ne lance pas l'installeur,
ça ne fait que simuler l'insertion d'un CD dans le lecteur de la machine.

Il faut maintenant monter le lecteur :
``` sh
mount /media/cdrom0
```

Puis copier le fichier d'installation sur la VM :
``` sh
cp /media/cdrom0/VMwareTools-*.tar.gz ./
tar zxvf VMwareTools-*.tar.gz
```

Les fichiers sont maintenant extrait dans ''vmware-tools-distrib''.

## Lancer l'installation
Lancez maintenant l'installeur :
``` sh
vmware-tools-distrib/vmware-install.pl
```

Là ya maintenant un série de question toutes plus explicites les unes que les autres ! On fait entrer à chaque fois sauf si on sait ce qu'on fait et
qu'on veut virer des options par défaut. Si tout s'est bien passé vous devriez avoir ça à la fin
``` sh
Enjoy,

--the VMware team
```

Maintenant il suffit de redémarrer la machine :
``` sh
shutdown -r now
```

## En cas d'erreur
Normalement les endroits où ça peut merder c'est là :
``` sh
Searching for GCC...
```

ou là :
``` sh
Searching for a valid kernel header path...
```

C'est en général que vous avez mal fait les étapes d'installation des pré-requis ! Il vous manque des paquets, refaite ces étapes.

<!-- --- tags: linux, vmware -->