C'est pas bien compliqué mais on cherche longtemps la bonne méthode dans la multitude de conneries du web.

Déjà, oublier l'idée de faire ça avec Windows, c'est de la merde et ça marche pas à moitié !

Ensuite, et c'est d'autant plus valable avec les PC de dernière génération et leur boot UEFI, prendre un 
image Debian "testing" plutôt qu'une stable. La stable ne possède pas les fichier nécessaire pour l'EFI alors qu'avec 
l'ISO testing ça se fait tout seul.

Donc déjà pour télécharger l'ISO le mieux est d'utiliser Jigdo :

``` sh
# apt-get install jigdo-file
$ jigdo-lite http://cdimage.debian.org/cdimage/weekly-builds/amd64/jigdo-cd/debian-testing-amd64-CD-1.jigdo
```

Le nom de l'image à peut-être changé !

Une fois qu'on a l'image, c'est simple comme bonjour, pas besoin de logiciel spécialisé, on fait juste :

``` sh
# umount /dev/sde1
# cat debian-testing-amd64-CD-1.iso > /dev/sde
```

Attention au nom du périphérique ! Allez pas écraser des partitions utilisé ! Dans mon cas c'est `sde`. Il faut faire attention aussi que toute les partitions du 
périphérique soient bien démonté, sinon la commande `cat` s'arrète sans le moindre message d'erreur et ça fonctionnera pas !

Ensuite avec `fdisk` vous pouvez vérifier le résultat :

``` sh
# fdisk -l /dev/sde

Attention : identifiant de table de partitions GPT (GUID) détecté sur « /dev/sde » ! L'utilitaire sfdisk ne prend pas GPT en charge. Utilisez GNU Parted.


Disque /dev/sde : 2019 Mo, 2019557376 octets
255 têtes, 63 secteurs/piste, 245 cylindres, total 3944448 secteurs
Unités = secteurs de 1 * 512 = 512 octets
Taille de secteur (logique / physique) : 512 octets / 512 octets
taille d'E/S (minimale / optimale) : 512 octets / 512 octets
Identifiant de disque : 0x6d433c0a

Périphérique Amorce  Début        Fin      Blocs     Id  Système
/dev/sde1   *           0     1327103      663552    0  Vide
/dev/sde2           26200       27031         416   ef  EFI (FAT-12/16/32)
```

Comme on peut le voir, ca a automatiquement créé la partition EFI ...

<!-- --- tags: linux, debian -->