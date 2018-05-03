---
title: "Rafraichir un repo git dans Redmine"
category: Outils
tags: [linux, misc, redmine, git]
---

En fait, il n'y a rien d'automatique.

Il faut commencer par cloner le repo sur le serveur remine. Ensuite on active la fonctionnalité Dépôt pour le projet et on ajoute le repo (en précisant le chemin physique). Attention c’est le chemin du répertoire `.git` qu’il faut renseigner, Ex `/var/lib/git/longback/cosmos/.git` sinon ça fonctionne pas.

Ce n’est pas fini, il car le repo ne se pull pas automatiquement. Pour cela, dans `/etc/cron.d` on ajoute le fichier suivant :

``` cron
*/5 * * * * <user> git --git-dir '/var/lib/git/longback/cosmos/.git' pull --all && curl 'http://<serveur-redmine>/sys/fetch_changesets?key=<key>&id=<projet>'
```

Et là pour le coup, ça fonctionne, dès qu’un commit est poussé sur le repo, dans les 5 minutes les tickets redmine sont mis à jour.