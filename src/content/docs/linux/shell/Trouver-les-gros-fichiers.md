---
title: "Trouver les gros fichiers"
category: Linux
subcategory: Shell
tags: [linux, shell, cleanup]
---
Un ligne de commande bien pratique pour ça :

``` sh
du -hms /* | sort -nr | head
```

Ca ne donne que le premier niveau de hiérarchie, il faudra relancer la commande pour affiner le recherche par sous-dossier.
