---
title: "Optimisation des statements Batch MySQL"
category: Développement
subcategory: Java
tags: [development, java, sql, mysql, database]
---
Par défaut le mode batch du driver JDBC de MySQL n'est pas correctement optimisé. Il effectue un aller/retour serveur 
pour chaque requête au lieu de le faire en une seule fois.

Pour le rendre pleinement opérationnel il faut ajouter l'option `rewriteBatchedStatements` à la connexion JDBC.

``` java
jdbc:mysql://127.0.0.1/?rewriteBatchedStatements=true
```
