---
title: "UUID Most Significant Bits"
category: Serveurs
subcategory: MySQL
tags: [server, mysql, database, uuid]
---

Comment dans une requête MySQL peut on extraire les bits les plus significatif d'un UUID. En gros ça correspond en Java à UUID.randomUUID().getMostSignificantBits().

``` sql
SELECT -conv(substring_index(uuid(), '-', 1), 16, 10)
```

Ce qui donne un long !