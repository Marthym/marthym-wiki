<!-- --- title: Serveur Web / HTTPS Securisé avec Nginx -->

Générer des certificats SSL correctement configuré n'est pas aussi facile qu'il n'y parait !

## Génération des certificats

### Creation de l'autorité de certification (CA)

On commence par créer la clé, en 2048 sinon c'est pas suffisamment sécurisé :
``` bash
openssl genrsa -des3 -out dumydomain-ca.key 2048
```

Puis on crée le certificat de la CA :
``` bash
openssl req -new -x509 -days 3650 -key dumydomain-ca.key -out dumydomain-ca.crt
```
Valable 10 ans.

### Création du certificat pour notre serveur

Dans cette procédure, le FDQN doit être exactement le même que le nom de domaine du serveur. Il est possible d'utiliser
des wildcard pour avoir un certificat multi-domaine : `*.dumydomain.fr`

Comme pour la CA on commence par créer la clé :
``` bash
openssl genrsa -des3 -out dumydomain.fr.key 1024
```

Ensuite on crée la demande ce certificat :
``` bash
openssl req -new -nodes -newkey rsa:2048 -keyout dumydomain.fr.key -out dumydomain.fr.csr -days 3650
```

Enfin on crée le certificat grace à l'autorité et la demande précédemment généré :

``` bash
openssl x509 -req -in dumydomain.fr.csr -out dumydomain.fr.crt -sha256 -CA dumydomain-ca.crt -CAkey dumydomain-ca.key -CAcreateserial -days 365
```
Il est important d'utiliser SHA256 et non SHA1 car l'algo SHA1 n'est pas considéré comme suffisamment sur.

## Configuration Nginx

### Diffie Hellman Parameters

Il est nécessaire, pour éviter certaines failles de redéfinir les paramètres DH sur 2048 (cf. [https://weakdh.org/sysadmin.html](https://weakdh.org/sysadmin.html)

``` bash
openssl dhparam -out dhparams.pem 2048
```
Déplacer le fichier obtenu dans `/etc/nginx/ssl`.

### Configuration SSL
Déplacer les fichier de certificats et de clé dans le répertoire `/etc/nginx/ssl`.

Dans `/etc/nginx/conf.d` ajouter un fichier ssl.conf avec le contenu suivant :

``` config
ssl_certificate /etc/nginx/ssl/dumydomain.fr.crt;
ssl_certificate_key /etc/nginx/ssl/dumydomain.fr.key;

ssl_session_timeout 5m;
ssl_session_cache shared:SSL:10m;

ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;

ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';

ssl_dhparam /etc/nginx/ssl/dhparams.pem;
```

Il ne reste plus qu'a activer SSL dans la configuration du server et de tester via [SSLabs](https://www.ssllabs.com/ssltest/analyze.html?d=www.dumydomain.fr)
