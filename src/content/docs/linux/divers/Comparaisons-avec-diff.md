---
title: "Comparaisons avec diff"
category: Linux
subcategory: Divers
tags: [linux, misc, diff, bash]
---
Quelques commandes `diff` pour comparer des répertoires et des fichiers :

## Répertoires
Comparaison de répertoire en récursif sans tenir compte des espaces :

``` bash
diff -rqwB rep-original rep-modifié | sort > modification-rep.diff
```

## Fichiers
Comparaison des fichiers sans tenir compte des espaces et au format universel (patch): 

``` bash
diff -wBu fichier-original.txt fichier-modifié.txt > fichier-diff.diff
```
