En installant un serveur Webdav sur Nginx j'ai eu un problème avec les répertoires contenant des `[]` dans leur nom. Le répertoire sont toujours vide. Sachant que le Nginx WebDAV n'est proxifié par un frontal Nginx lui aussi.

En regardant bien la doc de [proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) on lit que le comportement du Nginx est différent selon que l'ont met ou non l'URI dans la commande :

 * `proxy_pass http://192.168.0.12;`
 * `proxy_pass http://192.168.0.12/marthym;`

Dans le premier cas, nginx transfère la requête telquelle, dans le second, nginx normalise l'URI. Ce qui génère des problèmes puisqu'il dé-urlencode les noms de répertoire demandés au WebDAV, d'où le soucis des `[]`.

<!-- - tags: nginx, webdav, bracket -->