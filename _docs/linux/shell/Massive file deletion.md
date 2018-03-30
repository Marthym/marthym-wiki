Supprimer des milliers de fichiers en même temps est assez compliqué. Plusieurs solutions :

* `rm -rf /mon/repertoire`
* `find /mon/repertoire/* -type f -mtime +3 -delete`
* `rsync -a --delete /tmp/empty /mon/repertoire/`

le plus rapide est clairement le rsync !