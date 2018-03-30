<!-- --- title: Java / Requête Oracle avec Variables Liées -->
C'est un info qui date mais c'est toujours juste.

## C'est quoi des Bind Variable déjà ?
Dans le processus d'exécution d'une requête, Oracle effectue plusieurs étapes. Parmi ces étapes, on retrouve le parsing. 
Durant cette étape, oracle décortique l'ordre SQL et choisit quel est le plan d'exécution le plus court pour récupérer 
les données ramenées par la requête.

Si une requête est exécuté 20 fois de suite, Oracle fait le parsing pour la première requête seulement. 
Il se ressert des infos de parsing obtenu pour la première requête pour exécuter les autres.

La où les BV interviennent c'est pour déterminer si une requête et une autre sont identique ou non et si du coup elle 
partage ou non les même infos de parsing. Par exemple :

``` sql
select colonne from table_toto where autre_colonne = 'valeur';
select colonne from table_toto where autre_colonne = 'autre valeur';
``` 

Ces deux requête, si elles sont envoyées à Oracle de cette façon sont considérées comme des requêtes différente et le 
parsing sera refait pour chaque requête alors qu'au final, le plan d'exécution est bien le même.

Si par contre, on avant la requête avec des BV au lieux des valeurs en dur :

``` sql
select colonne from table_toto where autre_colonne = :b1;
``` 

Là on peut exécuter la requête pour

  * b1 = valeur
  * b1 = autre valeur
  
Oracle considère les deux requêtes comme identique et ne refais pas l'étape de parsing.

Le gain de temps représente l'utilisation va de 5% à 25%. Le gain peut monter jusqu'à 90% en utilisant le profilage de 
requête qui est impossible sans les BV.

## Concrètement dans le code
Concrètement dans le code Java, ça veut dire quoi ? Ca veut dire qu'on évite les concaténations du genre :

``` java
String requete = "select colonne from table_toto where autre_colonne = '"+valeur+"'"
``` 

On utilisera plutôt les `PreparedStatement` :

``` java
String requete = "select colonne from table_toto where autre_colonne = ?";
PreparedStatement statement = conn.prepareStatement(requete);
statement.setString(1, "valeur");
ResultSet result = statement.executeQuery();
// ...
statement.setString(1, "autre valeur");
ResultSet result = statement.executeQuery();
``` 
<!-- --- tags: java, oracle, mysql -->