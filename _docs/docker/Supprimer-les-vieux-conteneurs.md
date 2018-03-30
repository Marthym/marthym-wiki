Pour supprimer les vieux conteneur de plus d'une semaine par exemple : 

``` sh
docker ps -a | grep 'weeks ago' | awk '{print $1}' | xargs docker rm -v 
``` 

Les conteneurs issue d'images non taggé :

``` sh
docker ps -a | awk '$2 ~ "[0-9a-f]{12}" {print $"$1"}'
docker ps -a | awk '$2 ~ /^[0-9a-f]+$/ {print $1}' | xargs docker rm -v 
``` 

Et pour virer tous les conteneurs arrété :

``` sh
docker rm -v $(docker ps -a -q)
``` 

_Remarque: le `-v` permet de supprimer aussi les volumes déclaré mais non monté qui se trouvent alors dans 
`/var/lib/docker` sans quoi ils restent orphelin et sont alors compliqué a nettoyer !_

<!-- --- tags: docker -->