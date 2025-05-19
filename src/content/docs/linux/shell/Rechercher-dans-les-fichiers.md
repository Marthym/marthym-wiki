---
title: "Rechercher dans les fichiers"
category: Linux
subcategory: Shell
tags: [linux, shell, shortcut]
---
``` sh
find . -iname '*.jsp' | xargs grep 'string' -sl
find . -iname '*.jsp' -mtime -1 | xargs grep 'string' -sl
```
La première recherche simplement dans les fichiers, la seconde recherche dans les fichiers récemment modifiés.
