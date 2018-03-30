L'objectif est de supprimer les données d'un disque dur de façon définitive 
pour se protéger d'une reconstruction de la table d'index

L’utilitaire « dd » fourni avec tous les *nix et dérivés, permet de faire 
de nombreuses manipulations sur des fichiers ou des systèmes de fichiers comme 
(liste non exhaustive): Formatter une disquette à partir d’une image, découper 
un fichier en plusieurs morceaux, faire une image d’un DVD ou encore — et c’est 
ce qui nous intéresse ici — détruire les données d’un disque dur en le remplissant 
de zéros ou de données aléatoires.

''Il faut toujours faire attention lorsqu’on utilise dd. Le simple fait 
d’oublier une option ou d’échanger les arguments aura des conséquences désastreuses.''

## Méthode rapide et peu sûre
``` sh
dd if=/dev/zero of=/dev/sdX bs=512 conv=notrunc
```

_L’argument `conv=notrunc` permet de ne pas limiter la taille du fichier de sortie._

## Méthode lente et moyennement sûre
On met du _random_ au lieu du _zero_

``` sh
dd if=/dev/urandom of=/dev/sdX bs=512 conv=notrunc
```

## Méthode très lente et sûre
Ici on fait en plusieurs passes (32)

``` sh
for n in `seq 32`; do dd if=/dev/zero of=/dev/sdX bs=512 conv=notrunc; done
```

_Notez qu’ici j’ai défini le paramètre `bs` qui correspond au nombre d’octets 
spécifié écrit en une seule fois. Ce qui permet de raccourcir considérablement 
le temps de chaque passe._

## Méthode vraiment très lente et très sûre
Enfin en plusieurs passes (16) avec du ramdom, c'est méga super long !

``` sh
for n in `seq 16`; do dd if=/dev/urandom of=/dev/sdX bs=512 conv=notrunc; done
```

## Liens
 * https://www.crashdump.fr/debian/effacer-definivement-toutes-les-donnees-dun-disque-dur-sous-nux-677/

<!-- --- tags: linux, security -->
