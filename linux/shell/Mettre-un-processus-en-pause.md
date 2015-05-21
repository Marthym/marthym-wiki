On est en train de compresser un film depuis 45mn et merde on a besoin de compresser un gros
fichier pour l'envoyer rapidos. Pas de bol si on lance juste la compression du fichier, ça va prendre 20mn au lieu
de 10s que ça prendrait normalement. On pourrait stopper la compression du film pour zipper le fichier mais on
veut pas perdre les 45mn déjà effectuées ...

``` sh
killall -STOP avidemux
```

pour mettre le processus en pause et
``` sh
killall -CONT avidemux
```

pour reprendre.

Si on a pas le nom du processus on peut faire avec `kill -STOP 1234` et `kill -CONT 1234`

<!-- --- tags: linux -->