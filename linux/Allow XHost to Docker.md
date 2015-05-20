Pour une raison que j'ignore, une mise à jour récente de Debian bloque l'accès Xhost au container Docker locaux. Pour
authoriser à nouveau il faut un `xhost +`. Pour éviter le mode open bar, on utilise la commande suivante :

``` bash
xhost +local:docker
```

Pour l'activer au boot de la machine j'ai modifié `/etc/rc.local` et rajouter :

``` bash
...
# By default this script does nothing.

/usr/bin/xhost +local:docker

exit 0
...
```

<!-- --- tags: linux, docker, x11 -->