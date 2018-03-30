Je cherchais un lecteur de zik hyper léger avec un minimum de fonctionnalités :

* Shuffle
* Lecture en boucle
* Intégré à Gnome-shell
* Commandable du clavier

Résultat de la recherche, [Music Player Daemon](http://www.musicpd.org/). Bon ya de la config à faire pour l'afficher
dans gnome et pour le clavier mais au final ça fonctionne super. Il existe un panel de logicels pour le commander mais
dans un soucis de légèreté, [MPC](http://www.musicpd.org/clients/mpc/) est ce qu'il se fait de mieux.

Voici quelques commandes pratique avec MPC pour utiliser MPD à son plein potentiel :

## Ajouter toutes les chansons dans la liste courante

```sh
mpc clear && mpc update && mpc listall | mpc add
```

* `clear` vide la playlist courante
* `update` re-scanne le répertoire de zik pour mettre à jour les fichiers dans la base
* `listall` liste tous les fichiers dans la base
* `add` ajoute chaque fichier listé dans la playlist

## Enregistrer la playlist courante

```sh
mpc save pl-soft.m3u
```

## Lister les playlists

```sh
mpc lsplaylists
```

## Charger une playlist

```sh
mpc load pl-soft.m3u
```

## Interface ASCII

Il existe aussi un interface ASCII qui donne un peu de visualisation à ce qu’il se passe dans MPC mais le nom de l’outil est pas évident à retenir :

```sh
ncmpcpp
```

## Streaming

Il est possible de streamer des fichiers ou podcast :

```sh
mpc add http://traffic.libsyn.com/lescastcodeurs/LesCastCodeurs-Episode-182.mp3
```

<!-- --- tags: shell, linux, musique, mpc, mpd -->
