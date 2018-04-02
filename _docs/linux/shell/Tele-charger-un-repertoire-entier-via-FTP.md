---
title: "Télécharger un répertoire entier via FTP"
category: Linux
subcategory: Shell
tags: [linux, shell, wget, network]
---
``` sh
wget -r --restrict-file-names=nocontrol ftp://username:password4@www.monserveur.com/monrepertoire
```
