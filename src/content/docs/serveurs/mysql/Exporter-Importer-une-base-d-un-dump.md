---
title: "Exporter/Importer une base d’un dump"
category: Serveurs
subcategory: MySQL
tags: [server, mysql, database, jdbc, java]
---
Pour exporter en gzip

```shell
mysqldump -u user -p database | gzip > database.sql.gz
```

Pour importer une seule base à partir d'un dump complet, il faut entrer la commande suivante :
```shell
mysql -u USERNAME -p --one-database BASE_A_RESTAURER < dumpcomplet.sql
```

Remplacez `BASE_A_RESTAURER` par le nom de la base de votre choix qui est contenue dans le fichier _dumpcomplet.sql_.

La même chose avec un fichier d'export compressé en tar.gz
```shell
zcat database.sql.gz | mysql -u USERNAME -p BASE_A_RESTAURER
```

### Via SSH

Dump

```shell
ssh sshuser@10.10.10.10 -p 2222 "mysqldump -u USERNAME -p BASE_A_RESTAURER" | gzip > BASE_A_RESTAURER.sql.gz
```

Restauration dans un container. les `sed` permettent de gérer certaines options qui pourraient ne pas être compatibles avec de vielles versions de MySQL.

```shell
zcat BASE_A_RESTAURER.sql.gz \
        | sed -E 's/ROW_FORMAT=[A-Z]+//g' \
        | sed 's/KEY_BLOCK_SIZE=[0-9]*//g' \
        | docker exec -i BASE_A_RESTAURER-mysql-1 \
            mysql -u root -pROOT_PASSWORD BASE_A_RESTAURER \
            --default-character-set=latin1

```


### Progression de l’import

Cerise sur le gâteau, voici comment suivre la progression de l’import. Un outil magique `pv` (Pipe View) permet de visualiser l’avancement d’un pipe. Du coup avec la commande suivante :

```shell
zcat database.sql.gz | pv --progress --size $(zcat database.sql.gz | wc -c) --name '  Importing.. ' | mysql -u USERNAME -p BASE_A_RESTAURER
```

On a le résultat suivant :

```shell
zcat database.sql.gz | pv --progress --size $(zcat database.sql.gz | wc -c) --name '  Importing.. ' | mysql -u USERNAME -p BASE_A_RESTAURER
  Importing.. : [==================================>                                               ] 43%
```

* **--progress** pour dire que l’on veut une barre de progression
* **--size $(zcat database.sql.gz | wc -c)** permet de récupérer la taille décompressée de l’archive. Attention, il parcourt toute l’archive donc ça peut être un peu long.
* **--name '  Importing.. '** pour afficher un joli libellé.
