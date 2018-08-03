---
title: "Déverrouillé une clé privé avec password"
category: Linux
subcategory: Réseau
tags: [linux, network, ssh]
---

Avec un clé ssh verrouillé par un password, on utilise GnomeKeyring pour déverrouiller la clé au début de la session mais dans la session est une session ssh, ça ne fonctionne pas et on se retrouve à rentrer le mot de passe chaque fois qu’on fait un git pull ! Pas cool !

<!-- more -->

Une fois dans la session :

``` bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
```

Ca permet de démarrer le ssh-agent puis de déverrouiller la clé. Renseigner le mot de passe et c’est ok.