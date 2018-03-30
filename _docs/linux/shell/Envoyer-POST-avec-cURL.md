Comment envoyer une requête POST avec le contenu d'un fichier dans le body. Le tout avec un header :

``` sh
curl -H "Content-Type: application/json" \ 
    --data "@salut.txt" http://localhost:8082/export \
    | python -m json.tool
``` 

Le fichier salut.txt est dans le répertoire courant ...

En bonus on notera la dernière ligne qui permet, si la requète retourne du JSON, de formater lisiblement le résultat.


<!-- tags: linux, network -->
