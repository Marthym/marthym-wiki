---
title: "Gestion des dates Oracle"
category: Serveurs
subcategory: Oracle
tags: [server, oracle, database, sql]
---

La pseudo colonne SYSDATE affiche la date et l'heure courante. Ajouter 1 à SYSDATE avance la date d'un jour. 
On peut alors utiliser des fractions pour ajouter des heures/minutes/secondes. Voilà un exemple :

``` sql
SQL> select sysdate, sysdate+1/24, sysdate +1/1440, sysdate + 1/86400 from dual;

SYSDATE              SYSDATE+1/24         SYSDATE+1/1440       SYSDATE+1/86400
-------------------- -------------------- -------------------- --------------------
03-Jul-2002 08:32:12 03-Jul-2002 09:32:12 03-Jul-2002 08:33:12 03-Jul-2002 08:32:13
```

Et quelques exemples possible :

| Description                               | Date Expression                             |
|-------------------------------------------|---------------------------------------------|
| Maintenant                                | SYSDATE                                     |
| Lendemain                                 | SYSDATE + 1                                 |
| Dans 7 jours                              | SYSDATE + 7                                 |
| Dans 1 heure                              | SYSDATE + 1/24                              |
| Dans 3 heures                             | SYSDATE + 3/24                              |
| Dans une demi-heure                       | SYSDATE + 1/48                              |
| Dans 10mn                                 | SYSDATE + 10/1440                           |
| Dans 30s                                  | SYSDATE + 30/86400                          |
| Demain à minuit                           | TRUNC(SYSDATE + 1)                          |
| Demain à 8h                               | TRUNC(SYSDATE + 1) + 8/24                   |
| Prochain Lundi midi                       | NEXT_DAY(TRUNC(SYSDATE), 'MONDAY') + 12/24  |
| Premier jour du moi à minuit              | TRUNC(LAST_DAY(SYSDATE ) + 1)               |
| Prochain Lundi, Mercredi et Vendredy à 9h | TRUNC(LEAST(NEXT_DAY(sysdate,''MONDAY' ' ),NEXT_DAY(sysdate,''WEDNESDAY''), NEXT_DAY(sysdate,''FRIDAY'' ))) + (9/24) |

