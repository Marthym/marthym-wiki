<!-- --- title: Oracle / Exporter/importer un schéma de base -->
~~~
c:\> exp edge/leon file=c:\temp\EDGE_SP3_FIX016_AXA.dmp direct=y
~~~
``` sql
SQL> create user edge identified by leon;
SQL> grant connect,resource to edge
``` 
``` sh
c:\> imp system/manager file=c:\temp\EDGE_SP3_FIX016_AXA.dmp ignore=y fromuser=edge touser=edge
``` 

Voir aussi &rarr; [[Utiliser DataPump en ligne de commande]]

<!-- --- tags: server, oracle -->