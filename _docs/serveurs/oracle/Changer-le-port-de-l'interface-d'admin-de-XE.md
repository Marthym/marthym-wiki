<!-- --- title: Oracle / Changer le port de l'interface d'admin de XE -->
Si vous utilisez CCM avec une base Oracle XE, vous allez devoir changer le port de l'interface d'administration de votre base Oracle XE.
En effet, si l'interface d'Oracle XE est déjà installé sur le port 8080 et que vous installez ensuite CCM, CCM va quand même choisir le port 8080.

Il faut donc exécuter la manipulation suivante :

 1. Veiller à ce que votre base tourne
 2. Ouvrir une invite de commande
 3. Lancer sqlplus
 4. Se logguer en tant qu'utilisateur système
 5. Exécuter la commande suivante (exemple : on change le port 8080 pour le port 8280): 

``` sql
EXEC DBMS_XDB.SETHTTPPORT('8082');
``` 

<!-- --- tags: server, oracle -->