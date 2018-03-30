<!-- --- title: Neo4j / Recovery required from position LogPosition -->

Après un arrêt intenpestif ou une tentative de backup à l'arrache de la base neo4j, on a eu un soucis pour la relancer !

## Symptomes
Pas de message nulle part mais base non démarré !

Le seul truc visible était dans neo4j/data/graph.db/messages.log

```
[NeoStoreDataSource] Recovery required from position LogPosition
```

Un truc comme ça !

## Solution

Deux chose :

* Supprimer le `store_lock` dans graph.db
* Supprimer les log de transactions dans graph.db : `rm neostore.transaction.db.*`

Attention tout de même, c'est un peu du 80/20 % de change que ça redémarre. Si la base est vraiment corrompue ça ne fonctionnera pas !