---
title: "Créer un packet pour Debian"
category: Linux
subcategory: Divers
tags: [linux, misc, debian, apt]
---

A la base tout vient d’un problème avec le packet `mysql-workbench` qui n’est plus maintenu et qui demande le packet `gdal-abi-2-1-2` qui n’existe plus car remplacé par `libgdal20`. Du coup impossible de l’installer proprement. La seule solution est de créer un packet virtuel qui fait le lien entre l’ancien et le nouveau packet de gdal-abi-2-1-2.

``` shell
apt install equivs
vi gdal_abi.txt
```

```
Section: misc
Priority: optional
Standards-Version: 3.9.2
    
Package: gdal-abi-2-1-2
Version: 2.1.2
Depends: libgdal20
Description: fake package for qgis which needs a gdal-abi-2-1-2
```

``` shell
equivs-build gdal_abi.txt
dpkg -i gdal-abi-2-1-2_2.1.2_all.deb
```

Enfin 

```shell
apt install mysql-workbench
```
