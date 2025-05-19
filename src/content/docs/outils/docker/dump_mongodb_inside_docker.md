---
title: "Dump base mongo depuis un container docker"
category: Outils
subcategory: Docker
tags: [development, docker, mongo, database]
---

## mongodump

No Auth :

```shell
docker exec <mongodb container> sh -c 'mongodump --archive' > db.dump
```
Authenticated : 

```shell
docker exec <mongodb container> sh -c 'mongodump --authenticationDatabase admin -u <user> -p <password> --db <database> --archive' > db.dump
```

## mongorestore

No Auth : 

```shell
docker exec -i <mongodb container> sh -c 'mongorestore --archive' < db.dump
```

Authenticated : 

```shell
docker exec -i <mongodb container> sh -c 'mongorestore --authenticationDatabase admin -u <user> -p <password> --db <database> --archive' < db.dump
```

## Liens

* https://dev.to/mkubdev/mongodump-and-mongorestore-with-docker-39m7
