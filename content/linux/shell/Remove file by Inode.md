---
title: "Suppression de fichiers par Inode"
category: Linux
subcategory: Shell
tags: [linux, shell, inode]
---

Il m’est arrivé l’autre jour de créer par accident un fichier '`-I`' et là, c’est le drame !

Impossible de supprimer ce fichier par les `rm` conventionnel.

La solution c’est de supprimer le fichier par son inode :

```shell
ls -il
find . -inum 782263 -exec rm -i {} \;
```

Et voilà.