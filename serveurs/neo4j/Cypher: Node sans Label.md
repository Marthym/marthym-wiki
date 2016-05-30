<!-- --- title: Neo4j / Cypher: Nodes sans Label -->

Pour lister (et supprimer) les Nodes n'aillant aucun label :

```sql
MATCH (n) WHERE SIZE(LABELS(n)) = 0
    DETACH DELETE n;
```

