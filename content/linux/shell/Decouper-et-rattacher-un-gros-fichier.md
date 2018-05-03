---
title: "Découper et rattacher un gros fichier"
category: Linux
subcategory: Shell
tags: [linux, shell]
---

``` sh
split -b 4000m fichier.tar.gz newfichier.tar.gz
```

``` sh
cat newfichier.tar.gz.* > fichier.tar.gz
```
