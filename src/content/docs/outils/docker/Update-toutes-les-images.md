---
title: "Update toutes les images"
category: Outils
subcategory: Docker
tags: [development, docker, error]
---
Pour mettre à jour toutes les images d'un docker en une commande:

``` sh
docker images | awk '{print $1}' | xargs -L1 docker pull
```
