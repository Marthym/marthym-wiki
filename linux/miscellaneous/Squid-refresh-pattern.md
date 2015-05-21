Dans le cadre de mon serveur proxy pour fichier téléchargés, je suis tombé sur un problème avec neo4j dont les fichiers
tar.gz n'étaient jamais mis en cache.

## Symptômes
Le premier symptôme est que le fichier est systématiquement re-téléchargé.

Deuxième symptôme, les logs store affichent que le fichier est immédiatement RELEASE et que sa date de péremption est passé.

## Explication
En fait, dans l'entête de la requête HTTP, il y a une directive

~~~
Cache-Control "must-revalidate"
~~~

Ce qui implique de récupérer le fichier à chaque fois. Pour régler ça, il est possible de demander à Squid d'ignorer
certaine entêtes. C'est pas conseillé mais dans le cadre un proxy de téléchargement, c'est pas interdit.

Pour faire ça on met à jour les refresh pattern :
~~~
refresh_pattern ^ftp:             1440    20%     10080
refresh_pattern ^gopher:          1440    0%      1440
refresh_pattern Packages\.bz2$    0       20%     4320 refresh-ims
refresh_pattern Sources\.bz2$     0       20%     4320 refresh-ims
refresh_pattern Release\.gpg$     0       20%     4320 refresh-ims
refresh_pattern Release$          0       20%     4320 refresh-ims
refresh_pattern -i cgi-bin        0       0%      0
refresh_pattern .                 1440    20%     10080 override-expire override-lastmod ignore-no-store ignore-must-revalidate ignore-private ignore-auth
~~~

Ici pour toutes les URL on ignore les directives de cache.

## Liens
* http://www.squid-cache.org/Doc/config/refresh_pattern/

<!-- --- tags: linux, squid, tools -->