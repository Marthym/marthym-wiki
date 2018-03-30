<!-- --- title: Neo4j / Cypher: Paths sans path intermédiaire -->

Quand on demande un path a Neo4j il va nous donner avec les paths intermédiaire. Par exemple :

```sql
MATCH (:Attribute {_type:'realm',name:'iwan'})<-[:Attribute]-(s:Planet),
path = (s)-[:MdxPath*0..10]->(:Planet)
RETURN nodes(path)
```
va retourner :

 * *interface*
 * *interface / application*
 * **interface / application / cos**
 * **cpe**

Alors que ce qui m'intéresse c'est juste les deux derniers. Je ne veux pas les chemins
intermédiaires.

Pour n'avoir que les paths complet, la solution est de demander les paths pour lesquels le dernier
node n'a pas de lien vers une Planet (dans le cas de l'exemple).

```sql
MATCH (:Attribute {_type:'realm',name:'iwan'})<-[:Attribute]-(s:Planet),
path = (s)-[:MdxPath*0..10]->(p:Planet)
WHERE NOT ((p)-[:MdxPath]->(:Planet))
RETURN nodes(path)
```
