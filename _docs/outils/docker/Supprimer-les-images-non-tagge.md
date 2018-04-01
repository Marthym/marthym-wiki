Pour virer toutes les images non taggé :

``` sh
docker rmi $(docker images | grep '^<none>' | awk '{print $3}')
``` 

Attention si l'image est utilisé par un conteneur ça marchera pas.

A partir de la 1.3.1 :

``` sh
docker rmi $(docker images -f "dangling=true" -q)
``` 

<!-- --- tags: docker -->