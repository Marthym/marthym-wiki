<!-- --- title: Oracle / Gestion des dates Oracle -->
La pseudo colonne SYSDATE affiche la date et l'heure courante. Ajouter 1 à SYSDATE avance la date d'un jour. 
On peut alors utiliser des fractions pour ajouter des heures/minutes/secondes. Voilà un exemple :

``` sql
SQL> select sysdate, sysdate+1/24, sysdate +1/1440, sysdate + 1/86400 from dual;

SYSDATE              SYSDATE+1/24         SYSDATE+1/1440       SYSDATE+1/86400
-------------------- -------------------- -------------------- --------------------
03-Jul-2002 08:32:12 03-Jul-2002 09:32:12 03-Jul-2002 08:33:12 03-Jul-2002 08:32:13
``` 

Et quelques exemples possible :
<table>
<tr><th>Description</th><th>Date Expression</th></tr>
<tr><td>Maintenant</td><td>SYSDATE</td></tr>
<tr><td>Lendemain</td><td>SYSDATE + 1</td></tr>
<tr><td>Dans 7 jours</td><td>SYSDATE + 7</td></tr>
<tr><td>Dans 1 heure</td><td>SYSDATE + 1/24</td></tr>
<tr><td>Dans 3 heures</td><td>SYSDATE + 3/24</td></tr>
<tr><td>Dans une demi-heure</td><td>SYSDATE + 1/48</td></tr>
<tr><td>Dans 10mn</td><td>SYSDATE + 10/1440</td></tr>
<tr><td>Dans 30s</td><td>SYSDATE + 30/86400</td></tr>
<tr><td>Demain à minuit</td><td>TRUNC(SYSDATE + 1)</td></tr>
<tr><td>Demain à 8h</td><td>TRUNC(SYSDATE + 1) + 8/24</td></tr>
<tr><td>Prochain Lundi midi</td><td>NEXT_DAY(TRUNC(SYSDATE), 'MONDAY') + 12/24</td></tr>
<tr><td>Premier jour du moi à minuit</td><td>TRUNC(LAST_DAY(SYSDATE ) + 1)</td></tr>
<tr><td>Prochain Lundi, Mercredi et Vendredy à 9h</td><td>TRUNC(LEAST(NEXT_DAY(sysdate,''MONDAY' ' ),NEXT_DAY(sysdate,''WEDNESDAY''), NEXT_DAY(sysdate,''FRIDAY'' ))) + (9/24)</td></tr>
</table>

<!-- --- tags: server, oracle -->