Normalement ici gollum est installé, reste plus qu'a le faire démarrer en même temps que la machine. Sur Debian c'est 
systemd le nouveau gestionnaire de service donc voici un script systemd à placer dans :
`/usr/lib/systemd/system/gollum.service`

~~~
[Unit]
Description=Gollum server
After=syslog.target
After=network.target
After=named.service

[Service]
User=johndo
Environment="WIKI_DIR=/home/johndo/johndo-wiki"
ExecStartPre=/bin/bash -c "/usr/bin/git --git-dir=${WIKI_DIR}/.git --work-tree=${WIKI_DIR} pull | logger"
ExecStartPre=/usr/bin/git --git-dir=${WIKI_DIR}/.git --work-tree=${WIKI_DIR} pull
ExecStart=/usr/local/bin/gollum --no-edit --gollum-path ${WIKI_DIR}
TimeoutSec=10

[Install]
WantedBy=multi-user.target
~~~

On note le `ExecStartPre` qui va permettre de synchroniser le wiki au démarrage. _Par contre impossible de faire
fonctionner la commande StartPre à cause d'une erreur ssh. Il ne trouve pas le site github. La seule façon de la faire
fonctionner est de mettre un deuxième StartPre avec le bash._

Après on peut aussi mettre en place un chron pour l'actualiser régulièrement mais dans le cas d'un wiki perso c'est pas 
forcément nécessaire.

On lance gollum avec `--no-edit` pour éviter que les personnes sur le même réseau ne modifient le wiki.

<!-- --- tags: tools, gollum -->