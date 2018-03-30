<!-- --- title: Teradata / [Error 1178] [SQLState HY000] The Teradata Database did not provide the expected response -->
## Symptômes

~~~
[Teradata JDBC Driver] [TeraJDBC 15.00.00.15] [Error 1178] [SQLState HY000] The Teradata Database did not provide the expected response - unable to read 8224 byte(s) from the database. Only 209814 byte(s) were received from the database and 202217 byte(s) have already been read. 
~~~

Le problème se pose à l'exécution d'une requête bête :

``` sql
select * from table_truc where the_date between ? and ?
``` 

sachant que ça fonctionne très bien sur la plus-part des table mais pas sur l'une d'elles ??

## Solution
En fait, la table contenait un champ de type `Structured UDT` formé comme suit :

``` sql
CREATE TYPE SYSUDTLIB.AddAttribute_Type  AS CHAR(24) CHARACTER SET LATIN ARRAY [10] DEFAULT NULL ;
``` 

C'est ça qui causait le souci. En supprimant ce champ de la close SELECT, la requête re-fonctionne très bien.

Reste à savoir comment on sélectionne ce type de champ.

**Edit 2015-04-08:**<br/>
J'avais oublié de mettre à jour, en fait un bug dans les driver JDBC interdit de faire un select de champ tableau si ce
dernier est pas à la fin du select. Donc lors d'un select il faut trier les champs UDT et les mettre à la fin du select.
Cela fonctionne aussi avec plusieurs champs UDT.

<!-- --- tags: java, teradata -->