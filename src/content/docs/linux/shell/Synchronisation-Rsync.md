---
title: "Synchronisation Rsync"
category: Linux
subcategory: Shell
tags: [linux, shell, rsync]
---
Très pratique quand on change de PC par exemple et que l'on veux copier sa centaine de gigs du vieux PV au nouveau.

Au travers d'une connexion directe RJ45 :

``` sh
rsync -az --size-only --delete /home/kevin/source/* kevin@server.example.com:/home/kevin/destination/
```

* `-a` archive, conserve tout les attribut des fichiers en l'état (date, owner, ...)
* `-z` active la compression
* `--size-only` ne teste que la taille du fichier pour savoir s'il doit être mis à jour. C'est plus rapide que le Hash.
* `--delete` supprime de la destination les fichiers qui l'ont été de la source

## Autres options intéressantes
* `--delay-updates` Copie tout les fichiers à transférer dans un répertoire temporaire et les transfère à la fin. Pratique sur des environnements de prod.
* `--exclude-from=/root/sync_exclude` liste des patterns de fichiers à exclure de la copie.

Autre point intéressant, il est facile de mettre cette ligne de commande dans un cron. Pour se dispenser du mot de passe
on peut alors utiliser l'identification par clé de ssh.

## Le mode boule de feu

Pour des transferts ultra-rapide avec du sudo en face:

```
rsync --rsync-path="sudo rsync" -aHA --delete --info=progress2 --stats -e "ssh -T -o Compression=no" 10.0.0.4:/var/lib/mysql/ ./data
```

* `--rsync-path="sudo rsync"` on lance un sudo en face. Attention il faut un sudo sans mot de passe
* `-a` on préserve les attributs des fichier
* `-H` on préserve les Hard Links
* `-A` on préserve les ACLs
* `-e` on ajoute des options ssh
*  `--delete` on supprime les fichiers qui ont disparut sur la source
*  `--info=progress2` on affiche seleument la progression pas tous les fichiers
*  `--stats` on affiche des stats

Pour le ssh

* `-T` on forward l'agent
* `-o Compression=no` on ne compresse pas

### Config sudo
Le problème est que si vous avez mis un mot de passe sur le sudo de la machine d'en face, ça complique les choses. Le plus simple est de supprimer le password pour la commande rsync seulement. Pour ça il suffit de mettre un fichier `99-rsync-nopwd` dans `/etc/sudoers.d` avec la ligne :

```
obiwan ALL = (root) NOPASSWD: /usr/bin/rsync
```
