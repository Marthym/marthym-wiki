---
title: "Export Importer une image Docker"
category: Outils
subcategory: Docker
tags: [development, docker]
---
Pour exporter :

``` sh
docker save mynewimage > /tmp/mynewimage.tar
bzip2 /tmp/mynewimage.tar
```

Pour ré-importer:

``` sh
bzip2 -d /tmp/mynewimage.tar.bz2
docker load < /tmp/mynewimage.tar
```
