Comment lancer un serveur web en une ligne de commande bash :

``` bash
while true; do { echo -e 'HTTP/1.1 200 OK\r\n'; cat index.html; } | nc -l 8080; done
```

L'intéret c'est que l'on peut voir facilement ce qui est envoyé comme entête HTTP, c'est simple et rapide !


## liens
* https://razvantudorica.com/08/web-server-in-one-line--bash/

<!-- --- tags: bash, linux, server -->