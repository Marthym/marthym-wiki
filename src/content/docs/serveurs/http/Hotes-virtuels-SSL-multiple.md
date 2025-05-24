---
title: "Hôtes virtuels SSL multiples"
category: Serveurs
subcategory: HTTP
tags: [server, http, apache, security, ssl]
---

Alors on trouve sur internet une flopper de tuto pour configurer sous Apache des VirtualHost SSL multiple.
On a beau les lire et les re-lire, essayer des centaines de combinaisons pour chaque fichier de configuration, on en vient
toujours au même résultat : C'est le premier vhost qui est retourné !

## Explication technique
Ce que la plus part des tuto ne dit pas c'est déjà qu'il faut avoir des version d'Apache et de OpenSSL très récente
pour que ça ai une chance de fonctionné. Mais même avec ça, je n'ai pas réussi à le faire fonctionner.

La raison technique a cette impossibilité est la suivante :

```
The reason is that the SSL protocol is a separate layer which encapsulates the HTTP protocol. So the SSL session is a
separate transaction, that takes place before the HTTP session has begun. The server receives an SSL request on IP
address X and port Y (usually 443). Since the SSL request did not contain any Host: field, the server had no way to
decide which SSL virtual host to use. Usually, it just used the first one it found which matched the port and IP
address specified.
```

Du coup, quand ça ne fonctionne pas, deux choix reste possible pour contourner le problème :

  * Utiliser plusieurs adresse IP
  * Utiliser plusieurs ports

## Solution
La solution pas trop compliqué est donc d'utiliser plusieurs port, mais ça demande d'avoir un frontal qui va faire la
redirection vers les différents port selon le nom de domaine demandé. Mais dans le cas des phases de développement est
pas toujours pratique ni facile d'avoir ce genre d’architecture en place pour de simple développements.

Du coup on va configurer Apache sur plusieurs adresse IP. Par contre cette solution ne fonctionne un serveur Apache
Windows (ou du moins je sais pas comment) car il est nécessaire de pouvoir configurer plusieurs adresse IP sur une même
interface réseau.

### Configuration système
Suivre le tuto pour [[Avoir plusieurs adresses IP sur la même interface|Avoir-plusieurs-adresses-IP-sur-la-meme-interface]] ...

### Configuration Apache
#### Fichier d'écoute
Ensuite, une fois que l'on a plusieurs adresse IP, il faut demander à Apache d'écouter sur ces adresse. Dans `/etc/apache2/port.conf`

``` apache
<IfModule mod_ssl.c>
    # If you add NameVirtualHost *:443 here, you will also have to change
    # the VirtualHost statement in /etc/apache2/sites-available/default-ssl
    # to <VirtualHost *:443>
    # Server Name Indication for SSL named virtual hosts is currently not
    # supported by MSIE on Windows XP.

    NameVirtualHost 172.16.139.21:443
    NameVirtualHost 172.16.139.22:443
    Listen 443
</IfModule>
```

On n'utilise pas la notation `*:443` car il nous demanderait lors du démarrage un vhost par défaut pour `*:443` et ce
n'est pas ce que l'on veut faire.

#### Fichiers des hôtes virtuel
Ensuite dans `/etc/apache2/sites-available/` on va créer un premier fichier pour le premier serveur virtuel :

``` apache
<IfModule mod_ssl.c>
<VirtualHost 172.16.139.21:443>
        ServerAdmin webmaster@dev.local
        ServerName mnt.dev.local

        DocumentRoot /var/www/dev/mnt/public
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>

...

</VirtualHost>
</IfModule>
```

Et un fichier deuxième fichier pour le deuxième hôte :

``` apache
<IfModule mod_ssl.c>
<VirtualHost 172.16.139.22:443>
        ServerAdmin webmaster@dev.local
        ServerName www.recette.local
        ServerAlias mnt.recette.local mgp.recette.local

        DocumentRoot /var/www/recette/public
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>

...

</VirtualHost>
</IfModule>
```

Je ne m'attarde pas sur les différentes options pour le SSL ou les droits des répertoires, le sujet du tuto n'est pas là.
Le point d’intérêt se trouve dans les premières lignes de chaque fichier. On remarque que l'on utilise les adresse IP
au lieu de "*".<br/>
Autre point intéressant dans le deuxième fichier on définit des alias qui vont permettre d'arriver sur le même serveur
SSL avec des noms de sous-domaine différent.

### Pour finir
Pour finir, on active les deux sites :

``` sh
a2ensite mnt.dev.local-ssl
a2ensite recette.local-ssl
```

Puis on redémarre le serveur Apache :

``` sh
service apache2 reload
```

## Liens
 * <https://httpd.apache.org/docs/2.2/ssl/ssl_faq.html#vhosts2>
