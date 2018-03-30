<!-- --- title: jBoss / Connexion JBoss SQL-Server -->
La configuration se fait dans les fichiers `*-ds.xml` présent dans le répertoire deploy du JBoss. Le but de cette page 
est surtout de donner la configuration pour les driver SQL-Server 2005 qui présentent des performence et une stabilité 
meilleure sur les versions récentes de SQL-Server.

## Driver SQL-Server 2000
C'est la configuration par défaut à l'installation de CCS.

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<datasources>
    <local-tx-datasource>
        <jndi-name>ccpDataSource</jndi-name>
        <connection-url>jdbc:microsoft:sqlserver://127.0.0.1:1433;DatabaseName=CCS44Gb;SelectMethod=cursor</connection-url>
        <driver-class>com.microsoft.jdbc.sqlserver.SQLServerDriver</driver-class>
        <user-name>sa</user-name>
        <password>sa</password>
		
        <!-- sql to call on an existing pooled connection when it is obtained from pool -->
        <check-valid-connection-sql>select 'x'</check-valid-connection-sql>
		
    </local-tx-datasource>
</datasources>
``` 

Les librairies de ce driver se composent de trois fichiers jar dans le répertoire deploy :
  * msbase.jar
  * msutil.jar
  * mssqlserver.jar

## Driver SQL-Server 2005
Pour les serveurs 2005, les drivers 2000 fonctionnent mais il est conseillé d'utiliser la version 2005. Ces drivers ont 
été ré-écrit complètement par Micro$oft et donne des performances vu qu'ils exploitent mieux les fonctionnalités de 
SQL-Server 2005.

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<datasources>
    <local-tx-datasource>
        <jndi-name>ccpDataSource</jndi-name>
        <connection-url>jdbc:sqlserver://localhost:1433;DatabaseName=CCS44Gb;SelectMethod=cursor</connection-url>
        <driver-class>com.microsoft.sqlserver.jdbc.SQLServerDriver</driver-class>
        <user-name>sa</user-name>
        <password>sa</password>
		
        <!-- sql to call on an existing pooled connection when it is obtained from pool -->
        <check-valid-connection-sql>select 'x'</check-valid-connection-sql>

    </local-tx-datasource>
</datasources>
``` 

Cette version n'est constituée que d'un seul fichier à mettre dans le répertoire deploy, sqljdbc.jar.

<!-- --- tags: server, jboss -->