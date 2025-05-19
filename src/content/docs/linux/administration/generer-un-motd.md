---
title: "Générer un MOTD pour banner SSH"
category: Linux
subcategory: Administration
tags: [linux, ssh, motd]
---

Comment générer une bannière de login SSH un peu cool.

Pour l’installation des outils

```shell
sudo apt install toilet toilet-fonts figlet 
git clone https://github.com/maandree/util-say.git
cd util-say
make
cd ..
git clone git@github.com:xero/figlet-fonts.git
```

Pour la génération

```shell
util-say/img2ponysay ~/Téléchargements/icons8-anaconda-85.png > vipers.txt
toilet -f Graffiti -d figlet-fonts ViPerS | /usr/games/lolcat -f -F 0.3 > vipers-txt.txt
paste vipers.txt vipers-txt.txt > vipers.motd
```