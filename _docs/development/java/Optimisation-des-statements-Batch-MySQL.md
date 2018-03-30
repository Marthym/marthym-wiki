<!-- --- title: Java / Optimisation des statements Batch MySQL -->
Par défaut le mode batch du driver JDBC de MySQL n'est pas correctement optimisé. Il effectue un aller/retour serveur 
pour chaque requête au lieu de le faire en une seule fois.

Pour le rendre plainement opérationnel il faut ajouté l'option `rewriteBatchedStatements` à la connexion JDBC.

~~~ java
jdbc:mysql://127.0.0.1/?rewriteBatchedStatements=true
~~~

<!-- --- tags: java, server, mysql -->