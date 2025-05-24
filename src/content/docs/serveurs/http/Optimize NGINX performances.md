---
title: "Optimiser les performances"
category: Serveurs
subcategory: HTTP
tags: [server, http, nginx]
---
* Do not remove
{:toc}

Recopie d’un article de *Quentin Busuttil* sur [Optimiser NGINX]

## Les workers

Concentrons nous d’abord sur worker_processes. Cette directive spécifie le nombre total de workers à créer au démarrage de Nginx. La valeur optimale est d’en avoir un par cpu core. Si vous avez un VPS – lesquels ont souvent un vCPU avec un seul vCore – il arrive souvent que la valeur par défaut soit supérieure au nombre total de cores. Ce n’est pas très grave, néanmoins, les processus supplémentaires vont un peu se tourner les pouces… pas bien utile. Pour définir cette valeur, il nous suffit donc de déterminer le nombre total de cores :

``` bash
# grep -c ^processor /proc/cpuinfo
12
```

Passons maintenant à la directive worker_connections. Elle spécifie combien de connections simultanées chaque worker est en mesure d’établir. Étant donné qu’une connexion nécessite un file descriptor au minimum, une bonne base est d’établir ce nombre en fonction des limites de notre système. Dans le cas de Nginx en reverse proxy, il faut un file descriptor pour la connexion client et un autre vers le serveur proxifié, soit deux par connexion.

``` bash
# ulimit -n
1024
```

Gestion du [ulimit].

En dernier lieu, on permet aux workers d’accepter plusieurs nouvelles connexions de manière simultané en activant [multi_accept]. Cela peut être d’une grande utilité lors de pics de trafic.

```
multi_accept on;
```

## Les buffers

Les buffers permettent à Nginx de travailler en RAM plutôt que sur le disque. Je ne vais pas vous faire un dessin, vous savez bien que les accès disque sont infiniment plus lents que le travail en RAM. On va donc configurer les buffers pour que notre serveur puisse travailler en mémoire autant que faire se peut.

Il y a quatre types de buffers :

**client_body_buffer_size**
Le buffer qui récupère les données clients (typiquement les données POST).

**client_header_buffer_size**
Celui-ci s’occupe également des données du client, mais concerne l’en-tête. Généralement, 1k suffit ici amplement (la valeur par défaut). Qui plus est, dans le cas où cette limite est dépassée, alors c’est la directive large_client_header_buffers qui s’applique.

**client_max_body_size**
La taille maximum des requêtes envoyées par le client. Si vous autorisez des uploads de fichiers, il s’agit d’y penser ici. Si cette limite est dépassée, Nginx retourne une erreur 413.

**large_client_header_buffers**
Taille et nombre maximum que peuvent atteindre les buffers pour les en-têtes. Au delà, une erreur est retournée.


``` nginx
client_body_buffer_size 16K;
client_header_buffer_size 1k;
client_max_body_size 20m;
large_client_header_buffers 2 3k;
```

## Proxy buffers

Il existe des buffers spécifiquement dédiés aux proxies. Dans le cas où les buffers sont désactivés, Nginx commence l’envoie des données au client aussitôt qu’il les reçoit du backend serveur. Si le client est rapide, tout est pour le mieux. Cependant, si le client est moins véloce, ce fonctionnement oblige à conserver une connexion ouverte entre Nginx – le serveur de proxy – et le backend serveur ; ce qui peut s’avérer dommageable.

L’activation des buffers permet donc à Nginx de d’abord récupérer l’ensemble des données de la requêtes depuis le backend serveur, de libérer ce dernier, puis de servir les données au client.

**proxy_buffering**
Contrôle l’activation du buffer pour le proxy (activé par défaut).

**proxy_buffer_size**
Définie la taille du buffer pour les en-têtes de la réponse. 8k par défaut sur systèmes 64 bits. On peut ici laisser la valeur par défaut car les en-têtes dépassent rarement 8k.

**proxy_buffers**
Détermine la taille et le nombre des buffers pour le corps de la réponse. Une fois n’est pas coutume, la valeur dépendra grandement de votre application. La valeur par défaut (toujours pour les systèmes 64 bits) est de 8 buffers de 8k. Il s’agit de paramètres s’appliquant par requête. Ainsi, le réglage par défaut permettra de stocker dans les buffers des réponses jusqu’à 64kb. À vous de voir si votre application retourne des résultats plus importants (sachant qu’ensuite les fichiers sont écrits sur le disque).

``` nginx
proxy_buffering on;
proxy_buffer_size 1k;
proxy_buffers 12 4k;
```


## Les timeouts

**client_body_timeout**
Ce timeout s’applique au body. Il définit le temps maximum entre deux opérations d’écriture (pas le temps total de transfert donc). Admettons que je veuille transférer de gros fichiers (plusieurs centaines de MB), je pourrais fixer ce timeout à 30s (défaut 60s). Si le client n’envoie aucune donnée dans ce laps de temps, le serveur émet une erreur 408.

**client_header_timeout**
Même logique que la directive précédente mais le timeout s’applique bien ici à la totalité de la transaction. Néanmoins, les en-têtes étant beaucoup plus légères, je me contenterai pour ma part d’établir le timeout à 10s (défaut 60s) pour les headers.

**keepalive_timeout**
Cette directive permet à la fois de spécifier le keepalive timeout mais également le header Keep-Alive: timeout=durée.

Avec des serveurs tels qu’Apache où le serveur conserve un thread par connexion ouverte, de telles connexions impliquent une consommation de mémoire. Cependant, avec des serveurs événementiels comme Nginx, ce coût est relativement faible et il n’est donc pas très impactant en consommation ressources.

L’intérêt du keepalive est d’autant plus grand si vous êtes en https. En effet, à chaque ouverture de connexion, il vous faudra renégocier un [Three-way handshake TLS], ce qui prend du temps et demande de la puissance au serveur.

**send_timeout**
C’est en quelque sorte le pendant inverse des body et header timeouts. Ici, le s’agit de définir le temps après lequel le serveur coupe la connexion si le client ne reçoit plus la réponse. Par défaut, 60s.

**keepalive_requests**
Cette directive détermine le nombre de requêtes au bout duquel le connexion sera fermée. La valeur par défaut est à 100, ce qui est assez confortable et il n’est souvent pas nécessaire de modifier cette valeur. Néanmoins, si votre application nécessite le chargement de très nombreuses ressources (> 100), il peut être intéressant d’augmenter cette valeur pour qu’elle soit légèrement supérieur au nombre de ressources à charger.

``` nginx
client_body_timeout 30;
client_header_timeout 10;
keepalive_timeout 30;
send_timeout 60;
keepalive_requests 100;
```

## La compression

``` nginx
gzip on;
gzip_comp_level 5;
gzip_min_length 1000;
gzip_proxied any;
gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rss+xml
        application/vnd.geo+json
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/opentype
        image/bmp
        image/svg+xml
        image/x-icon
        text/cache-manifest
        text/css
        text/plain
        text/vcard
        text/vnd.rim.location.xloc
        text/vtt
        text/x-component
        text/x-cross-domain-policy;
```

Sachez également que la directive [gzip_buffers] peut s’avérer intéressante. Elle définie le nombre et la taille des buffers alloué à la compression. Par défaut, sur les architectures 64 bits, jusqu’à 16 buffers de 8k sont autorisés.

Tout va ici dépendre de la taille de vos fichiers. Il s’agit, comme expliqué dans [ce post][gzip_buffers_explique] d’arbitrer entre le nombre de buffers (gérer de nombreux buffers consomme un peu de CPU) ou attribuer plus d’espace aux buffers (utilise plus d’espace mémoire). Si vous n’avez pas assez d’espace dans les buffers pour contenir l’ensemble de la réponse, Nginx attendra qu’une partie de la réponse soit envoyée au client et utilisera ensuite l’espace libéré.

Enfin, sachez aussi qu’il est possible, avec le module [gzip static], de pré-compresser des fichiers pour que Nginx puisse les servir sans avoir à les compresser à la volée.

## Le cache statique

``` nginx
location ~* .(jpg|jpeg|png|gif|ico|css|js)$ {
  expires 60d;
}
```

## L’open file cache

Ce type de cache permet de conserver les métadonnées en mémoire, et donc de limiter l’I/O. Voici un exemple de configuration :

``` nginx
open_file_cache max=2000 inactive=5m;
open_file_cache_valid 2m;
open_file_cache_min_uses 2;
open_file_cache_errors on;
```

Cette configuration indique au serveur de mettre en cache 2000 open file descriptors et de les fermer si aucune requête les concernant n’est demandé au bout de 5 minutes. La validité des informations en cache est revérifiée après 2 minutes et un fichier doit être requêté un minimum de deux fois afin d’être valide pour le cache. Enfin, les fichiers d’erreurs sont ici également valables pour le cache.

## Le TLS

[générateur de configuration ssl de Mozilla]

Le [Three-way handshake TLS] prend du temps et est couteux en ressources. Activer la réutilisation de connexion SSL permet de limiter les aller/retour ([Speeding up SSL]).

**ssl_session_cache**
Il permet de définir si on active le cache on non, de spécifier le type de cache (builtin ou shared) ainsi que la taille de ce dernier. Il est à none par défaut. La doc Nginx établit que 1MB permet de stocker 4000 sessions. À vous de juger combien de à sessions vous estimez devoir faire face et la durée de rétention que vous leur accordez. N’ayez crainte, au pire des cas Nginx invalidera les sessions prématurément, il n’y aura pas d’effusion de sang.

**ssl_session_timeout**
Précise la durée au bout de laquelle la session est invalidée.

**ssl_buffer_size**
Permet de déterminer pour l’envoie des données. Gros débat sur la question de la taille de ce dernier, une fois de plus, tout dépend du type de contenus que vous servez.

``` nginx
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 24h;
ssl_buffer_size 1400;
```

En plus des caches, il y a une dernière optimisation qu’il est possible de réaliser, elle a pour doux nom l’OSCP stapling. Lorsqu’un serveur fourni un certificat, le client en vérifie la validité en interrogeant l’autorité émettrice du certificat. Évidemment, cela demande une requête supplémentaire au client. On peut éviter cela en demandant au serveur de joindre directement l’autorité émettrice et d’ainsi « agraffer » (d’où le stampling) la réponse signée et horodatée de l’autorité afin de prouver la validité du certificat.

``` nginx
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 216.146.35.35 216.146.36.36 valid=60s;
resolver_timeout 2s;
```

## Optimisations TCP

On arrive là dans le domaine de l’optimisation de pointe ! Il est possible de spécifier à Nginx la manière dont quelques options de TCP doivent être gérées. De manière synthétique, ces réglages vont nous permettre de :

 * diminuer la latence de 200ms avant l’envoie des données sur le réseau,
 * d’optimiser la copie des données depuis le file descriptors vers le buffer du kernel (ok, c’est compliqué !),
 * et de n’attribuer un thread Nginx qu’au dernier moment de la connexion (économie de ressources).

Pour comprendre tout cela dans les détails, vous pouvez vous référer à l’article [Optimisations Nginx : bien comprendre sendfile, tcp_nodelay et tcp_nopush] ou à [TCP TIME-WAIT & les serveurs Linux à fort trafic]

``` nginx
sendfile on;
tcp_nodelay on;
tcp_nopush on;
```

En dernier lieu, nous allons nous pencher sur quelques optimisations qui s’effectuent au niveau du block server, elles se placeront donc en général dans un VHOST.

À partir de là, la connexion est ouverte, et théoriquement, un socket est créé et le processus en écoute sur ce socket est réveillé : attribution de ressources Nginx dans le cas présent. Pour autant, tant qu’aucune vraie requête n’est effectuée, Nginx n’a rien à faire. L’option [TCP_DEFER_ACCEPT] du kernel permet donc de ne réveiller le processus que lors de l’envoie effectif de données. Cette option se traduit dans nginx par deferred.

Dans un autre registre, ce n’est pas tout à fait lié à TCP, mais j’en parle ici quand même, activer le [HTTP/2] peut avoir un impact significatif sur les performances.

``` nginx
server {
    # on active deferred 
    # pour ipv6 sur le port 80 (http) 
    listen [::]:80 default_server deferred;

    # pour ipv4 sur le port 80 (http) 
    listen 80 default_server deferred;

    # pour ipv6 sur le port 443 (https) 
    listen [::]:443 ssl http2 deferred;

    # pour ipv4 sur le port 443 (https) 
    listen 443 ssl http2 deferred;
    return 444;
}
```

Vous noterez que l’on active HTTP/2 seulement pour le TLS. Il est possible de l’activer en HTTP non sécurisé, mais les navigateurs ne le supportent pas.

Vous remarquez aussi peut-être le default_server. Cela indique à Nginx d’utiliser ce VHOST si l’en-tête Host n’est pas passée avec le requête. Dans le cas d’un accès direct via l’ip par exemple. Et en dernier lieu, return 444 signifie que dans ces cas là, la connexion sera réinitialisée puisque si plusieurs sites sont hébergés sur cette même ip:port, en l’absence de Host, il n’est pas possible de savoir lequel on doit servir.

Il y a de nombreuses optimisations potentielles au niveau de la pile TCP/IP, non spécifiques à Nginx, nombre d’entre elles sont détaillées dans cet article sur le [TCP Tuning].

## La thread pool

Il arrive que certaines opérations bloquantes soient lentes (comme la lecture de fichiers sur le disque). Les requêtes de fichiers de taille importante qui ne tiennent pas en mémoire par exemple, bloqueront un thread de Nginx jusqu’à ce que le disque retourne le fichier en question. Admettons-le, c’est assez dommage. Heureusement, Nginx a une solution pour ça !

Il s’agit de placer cette requête dans une « file d’attente » et de traiter d’autres requêtes en attendant que le disque ait fini son opération de lecture. Ainsi, on ne bloque pas plusieurs requêtes en attendant une I/O pour l’une d’entre elle, on place cette dernière en attente et on utilise le thread ainsi libéré pour servir d’autres requêtes.

Un article sur le blog de Nginx détaille le fonctionnement de la [Thread Pools] et présente un benchmark où les performances en charge sont multipliées par 9 ! Il faut pour cela utiliser l’option `aio` :

``` nginx
location / {
  root /var/www;
  aio threads;
}
```

## Liens

* [Optimiser NGINX]
* [ulimit]
* [multi_accept]
* [Three-way handshake TLS]
* [gzip_buffers]
* [gzip_buffers_explique]
* [gzip static]
* [générateur de configuration ssl de Mozilla]
* [Speeding up SSL]
* [OSCP stapling]
* [Optimisations Nginx : bien comprendre sendfile, tcp_nodelay et tcp_nopush]
* [TCP TIME-WAIT & les serveurs Linux à fort trafic]
* [TCP_DEFER_ACCEPT]
* [HTTP/2]
* [TCP Tuning]
* [Thread Pools]

[Optimiser NGINX]: https://buzut.fr/optimiser-nginx/
[ulimit]: https://buzut.fr/2016/05/27/optimiser-gestion-ressources-systeme-ulimit/
[multi_accept]: http://nginx.org/en/docs/ngx_core_module.html#multi_accept
[Three-way handshake TLS]: https://fr.wikipedia.org/wiki/Three-way_handshake
[gzip_buffers]: http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_buffers
[gzip_buffers_explique]: https://forum.nginx.org/read.php?2,239316,239344#msg-239344
[gzip static]: http://nginx.org/en/docs/http/ngx_http_gzip_static_module.html
[générateur de configuration ssl de Mozilla]: https://mozilla.github.io/server-side-tls/ssl-config-generator/
[Speeding up SSL]: https://vincent.bernat.im/en/blog/2011-ssl-session-reuse-rfc5077
[OSCP stapling]: https://fr.wikipedia.org/wiki/Agrafage_OCSP
[Optimisations Nginx : bien comprendre sendfile, tcp_nodelay et tcp_nopush]: https://t37.net/optimisations-nginx-bien-comprendre-sendfile-tcp-nodelay-et-tcp-nopush.html
[TCP TIME-WAIT & les serveurs Linux à fort trafic]: https://vincent.bernat.im/fr/blog/2014-tcp-time-wait-state-linux
[TCP_DEFER_ACCEPT]: https://unix.stackexchange.com/questions/94104/real-world-use-of-tcp-defer-accept
[HTTP/2]: https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol/2
[TCP Tuning]: http://kaivanov.blogspot.com.es/2010/09/linux-tcp-tuning.html
[Thread Pools]: https://www.nginx.com/blog/thread-pools-boost-performance-9x/