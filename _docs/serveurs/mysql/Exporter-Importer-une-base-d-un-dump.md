<!-- --- title: MySQL / Exporter/Importer une base d'un dump -->
Pour exporter en gzip

``` sh
mysqldump -u user -p database | gzip > database.sql.gz
``` 

Pour importer une seule base à partir d'un dump complet, il faut entrer la commande suivante :
``` sh
mysql -u USERNAME -p --one-database BASE_A_RESTAURER < dumpcomplet.sql
``` 

Remplacez `BASE_A_RESTAURER` par le nom de la base de votre choix qui est contenue dans le fichier _dumpcomplet.sql_.

La même chose avec un fichier d'export compressé en tar.gz
``` sh
zcat your_db_dump.sql.tar.gz | mysql -u USERNAME -p BASE_A_RESTAURER
``` 

<!-- --- tags: server, mysql -->