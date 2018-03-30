<!-- --- title: Teradata / Logger les requêtes Teradata -->
Dans un console bteq connecté en dbc :

Pour un seul utilisateur. Mais ça a pas trop marché pour moi

``` sql
begin query logging with explain,objects, sql on all account=('myaccount')
end query logging with explain,objects, sql on all account=('myaccount')
``` 

Pour tous les utilisateurs et là ça a fonctionné

``` sql
begin query logging with objects, sql on all
end query logging with objects, sql on all
``` 

Et pour lister les règles

``` sql
select * from dbc.dbqlrules
``` 

Enfin, pour voir les requêtes enregistrées

``` sql
SELECT * FROM DBC.QryLogSQL;
``` 

<!-- --- tags: server, teradata -->