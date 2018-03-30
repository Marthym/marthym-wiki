<!-- --- title: Oracle / Connaître l'encodage de sa base -->
Il peut être utile de vérifier l'encodage de sa base Oracle, notamment en cas de problèmes de montage d'un dump. Pour 
cela, il existe un moyen très simple de le faire, à l'aide de la requête SQL suivante :

``` sql
SELECT value$ FROM sys.props$ WHERE name = 'NLS_CHARACTERSET';
``` 

On peut également exécuter cette autre requête SQL, qui remonte tous les paramètres de la base :

``` sql
SELECT * FROM NLS_DATABASE_PARAMETERS;
``` 

<!-- --- tags: server, oracle -->