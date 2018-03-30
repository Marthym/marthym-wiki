<!-- --- title: Oracle / Tracer une requête Oracle -->
Il arrive qu'une partie de l'appli (voire toute l'appli) rame particulièrement. Selon la version d'Oracle, il est plus 
ou moins facile de tracer une requête. Dans tout les cas, il peut arrivé qu'on est besoin d'un maximum d'info.

## Oracle 10g et Entreprise Manager
Sur un serveur 10g, le plus simple est d'ouvrir l'entreprise manager et de cliquer sur l'onglet performances. De là, 
sous le graphique, un lien "Sessions les plus consommatrices..." qui permet de visualiser les requêtes et les sessions 
les plus gourmandes.

## Oracle 8i et 9i
Dans ces versions, on n'a pas les outils de la 10g et la recherche s'avère plus compliqué. La solution la plus simple 
est de tracer les sessions (voire toute la base). Pour cela, voilà la marche à suivre. L'intérêt de cette procédure un 
peu lourde est qu'il n'est pas nécessaire de redémarrer l'instance et la trace ne s'applique que sur une seule session.

Déjà, faut trouver la session qui va bien :

``` sql
SQL> select sid, serial# from v$session where username = 'CCS43';
``` 

S'il y en a plusieurs, on peut filtrer sur des champs comme PROGRAM ou MACHINE.

Ensuite on vide le répertoire de trace du serveur, en général `ORACLE_HOME/admin/ORCL/udump`

Puis on démarre la trace sur la session :

``` sql
SQL> exec DBMS_SYSTEM.SET_SQL_TRACE_IN_SESSION (sid=>507, serial#=>4957,sql_trace=>TRUE);
``` 

On lance les requêtes que l'on veut tracer ou on va dans la partie de l'appli qui rame.

On récupère le fichier `.trc` généré dans le répertoire de trace

On arrête la trace : 

``` sql
SQL> exec DBMS_SYSTEM.SET_SQL_TRACE_IN_SESSION (sid=>507, serial#=>4957,sql_trace=>FALSE);</code>
``` 

On tkprof le fichier TRC pour avoir un truc lisible.

PS : On peut aussi exécuter un 

``` sql
SQL> alter system set timed_statistics = TRUE;
``` 

Cela va permettre de connaitre les temps de réponse d'oracle, le temps de parsing ou d'exécution de chaque requête. Ca 
permet lors du tkprof de trier par temps d'exécution pour avoir les plus grosse requêtes en haut du fichier.

## Liens
  * http://alexzeng.wordpress.com/2008/08/01/how-to-trace-oracle-sessions/
  * http://www.oradev.com/create_statistics.jsp

<!-- --- tags: server, oracle -->