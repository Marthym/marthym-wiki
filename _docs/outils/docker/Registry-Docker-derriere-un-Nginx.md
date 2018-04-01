L'idée est de placer un registry Docker derrière un frontal Nginx afin de faire du HTTPS voire de l'authentification.

Le premier truc c'est la conf Nginx :

~~~ conf
server {
    listen      80;
    listen      443 ssl;
    server_name  docker.livingobjects.com;

    access_log off;
    server_tokens off;

    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP  $remote_addr;

    # On commence par dire où se situent nos certificats SSL
    # On aurait pu les mettre séparément dans chaque "server" en ayant besoin.
    ssl_certificate /etc/nginx/ssl/docker.livingobjects.com.crt;
    ssl_certificate_key /etc/nginx/ssl/docker.livingobjects.com.key;
    ssl_session_timeout 5m;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS;

    #limit_conn perip 20;
    #limit_req zone=antiddos burst=10 nodelay;
    client_max_body_size 0;
    chunked_transfer_encoding on;

    location / {
        proxy_pass http://docker-registry:5000;
    }
}
~~~

J'ai passé un moment à la faire fonctionné ...

Ensuite, si le certificat est auto-signé, Docker va pas apprécié. Pour lui faire accepter la pilule il faut installé le 
certificat de l'autorité sur le client Docker. Pour ça :

 * Copier les fichiers `.crt` et `.key` dans `/usr/local/share/ca-certificates`
 * Lancer la commande `update-ca-certificates`

Et voilà.

<!-- --- tags: docker -->