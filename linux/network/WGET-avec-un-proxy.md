WGET est un programme en ligne de commande qui permet de télécharger des fichiers depuis le web. Pour une utilisation en entreprise, 
il se peut qu’un proxy filtre les accès au web.


## Utiliser WGET avec un proxy simple

Créer un fichier .wgetrc (n'oubliez pas le point devant le fichier) a la racine de votre répertoire personnel avec le contenu suivant :

~~~
http_proxy = http://votre_proxy:port_proxy/
use_proxy = on
wait = 15
~~~

Vérifiez que ca fonctionne en rapatriant un fichier test :

``` sh
wget http://www.debian.org/Pics/debian.png
``` 

Si vous avez un message d'erreur comme ci-dessous, passez au paragraphe suivant :

~~~
requête Proxy transmise, en attente de la réponse...407 Proxy Authentication Required
ERREUR 407: Proxy Authentication Required.
~~~

## Utiliser WGET avec un proxy et authentification

Créer un fichier .wgetrc (n'oubliez pas le point devant le fichier) a la racine de votre répertoire personnel avec le contenu suivant :

~~~
http_proxy = http://votre_proxy:port_proxy/
proxy_user = votre_user_proxy
proxy_password = votre_mot_de_passe
use_proxy = on
wait = 15
~~~

Vérifiez que ca fonctionne en rapatriant un fichier test :

``` sh
wget http://www.debian.org/Pics/debian.png
``` 
<!-- --- tags: linux, network -->