---
title: "Supprimer un type de fichier dans une arborescence"
category: Linux
subcategory: Shell
tags: [linux, shell, cleanup]
---
Par exemple les fichiers générés par VSS :

``` sh
rm $(find . -name *.scc)
```
