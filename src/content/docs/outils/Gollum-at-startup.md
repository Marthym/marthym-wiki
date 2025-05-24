---
title: "Gollum at startup"
category: Outils
tags: [outils, gollum]
---
Normalement ici gollum est installé, reste plus qu'a le faire démarrer en même temps que la machine. Sur Debian c'est
systemd le nouveau gestionnaire de service donc voici un script systemd à placer dans :
`~/.config/systemd/user/gollum.service`

```
[Unit]
Description=Gollum server
After=syslog.target
Wants=network-online.target
After=network-online.target

[Service]
Environment="WIKI_DIR=/home/${USER}/workspace/marthym-wiki"
ExecStart=/usr/local/bin/gollum --no-edit --show-all ${WIKI_DIR}
ExecStartPost=/usr/bin/git --git-dir=${WIKI_DIR}/.git --work-tree=${WIKI_DIR} pull

# Give a reasonable amount of time for the server to start up/shut down
TimeoutSec=10

[Install]
WantedBy=multi-user.target
```

``` shell
systemctl --user daemon-reload
systemctl --user start gollum
```

On note le `ExecStartPre` qui va permettre de synchroniser le wiki au démarrage. 

Après on peut aussi mettre en place un chron pour l'actualiser régulièrement mais dans le cas d'un wiki perso c'est pas
forcément nécessaire.

On lance gollum avec `--no-edit` pour éviter que les personnes sur le même réseau ne modifient le wiki.
