---
title: "Installer backup sur jail BSD"
category: Linux
subcategory: FreeNAS
tags: [linux, sysadmin, bsd, jail, hubic, backup]
---
Une fois la jail créée, pour que les scripts de backup fonctionnent il faut install bash et hubic.py. C'est pas toujours intuitif alors voilà ce que j'ai fais la dernière fois :

``` csh
pkg install bash

python2.7 -m ensurepip
pip install --upgrade pip
wget https://raw.githubusercontent.com/puzzle1536/hubic-wrapper-to-swift/master/requirements.txt
pip install -r requirements.txt

wget https://raw.githubusercontent.com/puzzle1536/hubic-wrapper-to-swift/master/hubic.py
chmod +x hubic.py

ln -s /usr/local/bin/python2.7 /usr/bin/python

pkg install gnupg
```

En plus de ça, comme expliqué lors de l'installation de bash, il faut ajouter un script `postinit` à FreeNAS pour qu'il monte la partition fdescfs avec la commande `mount -t fdescfs null /mnt/storage/jails/<nom de la jail>/dev/fd`
