Un truc que j'ai cherché à faire avec Squid est de mettre en cache les téléchargements que docker fait pour construire
ses images afin qu'il ne re-télécharge pas systématiquement tout.

Pas compliqué, il suffit d'augmenter la taille max des fichiers a cacher et du répertoire de cache :

~~~ conf
cache_dir ufs /var/spool/squid3 5000 16 256
maximum_object_size 400 MB
~~~

Mais j'ai surtout eu un problème avec le téléchargement des JRE & JDK Oracle. En effet, le lien demande une
authentification et redirige alors vers la même URL mais avec une query-string :

    http://download.oracle.com/otn-pub/java/jdk/7u75-b13/jre-7u75-linux-x64.tar.gz

devient

    http://download.oracle.com/otn-pub/java/jdk/7u75-b13/jre-7u75-linux-x64.tar.gz?AuthParam=jkhefuihzefglkjhazfligezkfg

Et biensur le **AuthParam** change à chaque fois. Du coup Squid considère le fichier comme un nouveau fichier et le
remet en cache a chaque fois. C'est que qu'on appelle la duplication. Pas gênant pour les petits fichiers, beaucoup plus
pour les gros.

Pour palier ce problème dans Squid 3.4 (pas avant) il est possible de re-écrire le
[[StoreId|http://wiki.squid-cache.org/Features/StoreID]]. Pour cela, il faut commence par récupérer le programme
perl [[store-id.pl|http://pastebin.ca/2422099]] que je rajoute ici au cas où :

[[include:.doc/store-id.pl]]

Attention, ce fichier **doit être exécutable** !
Ensuite dans le fichier squid.conf on active la mise en cache des query-string en remplaçant :
~~~ conf
refresh_pattern -i (/cgi-bin/|\?) 0       0%      0
~~~

par
~~~ conf
refresh_pattern -i cgi-bin        0       0%      0
~~~

Puis on ajoute les lignes suivantes :
~~~ conf
store_id_program /usr/local/squid/store-id.pl /usr/local/squid/store_id_db
store_id_children 5 startup=1
~~~

 * `store_id_program` est le chemin vers le programme perl avec en argument le fichier de mapping des urls
 * `store_id_children` permet de paramétrer les sous-process, 5 max, 1 au départ.

Reste enfin le fichier de mappin d'URL a ajouter. Il est sous la forme :
 * Regex de l'url
 * tabulation
 * URL re-ecrite

Exemple :
~~~
^http:\/\/download\.oracle\.com\/otn\-pub\/java\/([a-zA-Z0-9\/\.\-\_]+\.(tar\.gz))	http://download.oracle.com/otn-pub/java/$1
~~~

Attention que la tabulation ne soit pas remplacer par défaut par votre éditeur de texte. Pour être sûr, on peut utiliser
cette commande :

``` sh
cat dbfile | sed -r -e 's/\s+/\t/g' |sed '/^\#/d' >cleaned_db_file
```

Cela va nettoyer le fichier de base pour être certain qu'il soit bon. Tout un listing d'url est donné en exemple dans la
doc Squid : http://wiki.squid-cache.org/Features/StoreID/DB

<!-- --- tags: linux, squid, tools -->