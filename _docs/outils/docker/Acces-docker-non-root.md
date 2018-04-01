---
title: "Accès Docker non root"
category: Outils
subcategory: Docker
tags: [development, docker, linux]
---
Normalement tous les accès docker se font en root avec sudo ou autre. Pour utiliser docker en non-root :

``` sh
sudo usermod -a -G docker netflow
```
