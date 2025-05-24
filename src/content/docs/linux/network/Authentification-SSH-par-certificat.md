---
title: "Authentification SSH par certificat"
category: Linux
subcategory: Réseau
tags: [linux, network, ssh, secutity]
---
L'objectif est de pouvoir se connecté via SSH à un serveur sans fournir de mot de passe. 
Cela ne sera bien-sur possible de depuis une machine ayant la clé privé d'installé !

On commence par générer la paire de clés si c'est pas déjà fait :

``` bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

:::note
Pour les systèmes récents préférer `ssh-keygen -t ed25519 -C "okenobi@jedi.net"` qui génère des clés elliptiques plus courtes et plus sécures
:::

Laisser les clés se générer dans l'emplacement par défaut et laisser la passphrase vide sinon 
il faudra à chaque fois renseigner la passphrase.

:::caution[Obsolète]
La passphrase est obligatoire, c'est le B.A. BA. D'autant que maintenant les systèmes sont capables de déverrouiller la clé lors de la première utilisation ce qui évite de taper le mot de passe à chaque fois.
:::

Ensuite il faut installer la clé publique sur le serveur :

``` bash
ssh-copy-id -i ~/.ssh/id_dsa.pub user@machine
```

Cette commande ne fait qu’ajouter votre clé publique dans un fichier sur le serveur. Voici une commande équivalente :

``` bash
cat ~/.ssh/id_rsa.pub | ssh user@machine "cat - >> ~/.ssh/authorized_keys"
```

Grâce à cette technique plus besoin de mot de passe pour les crons par exemple et la password se 
balade pas sur le réseau. Par contre quiconque possède votre clé privé ou accède à votre compte 
local peut se connecter au serveur.
