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

<!-- --- tags: linux, tools -->
<!-- --- words: rsync, synchronization -->