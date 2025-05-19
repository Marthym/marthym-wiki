---
title: "Cypher: Nodes sans Label"
category: Serveurs
subcategory: Neo4J
tags: [server, neo4j, database]
---

Pour lister (et supprimer) les Nodes n'aillant aucun label :

```sql
MATCH (n) WHERE SIZE(LABELS(n)) = 0
    DETACH DELETE n;
```

