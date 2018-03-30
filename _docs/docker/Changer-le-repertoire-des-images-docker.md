Comme j'ai deux disques durs et que je voudrais pas charger le SSD pour rien, je voulais changer le répertoire des images.

Pour ça, dans le fichier `/etc/default/docker.io` il faut rajouter l'option `-g` dans les options :

~~~
# Use DOCKER_OPTS to modify the daemon startup options.
#DOCKER_OPTS="--dns 8.8.8.8 --dns 8.8.4.4"
DOCKER_OPTS="-g /home/docker"
~~~

pensez à créer le nouveau répertoire, voire à y copier le contenu de l'ancien répertoire `/var/lib/docker`

<!-- --- tags: docker -->