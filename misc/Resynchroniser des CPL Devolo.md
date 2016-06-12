## Symptômes
Premier vrai sympte, les chaines HD de la box sont noire, impossible de les afficher. Seules les chaines LD fonctionnent. A force d'insiter la box me dit qu'il n'y a pas assez de débit pour afficher en HD.

Deuxième symptôme en testant les débits entre les différents PC :

```sh
iperf -c 192.168.1.xx -p 80 
```

Je me retrouve avec des débits de l'ordre de 700b/s ... ouahouh ! 

## Solution
La solution c'est de resynchroniser les CPL pour qu'ils se remettent à discuter à fond. Pour ça :

 - Tout débrancher
 - Débrancher les cables réseaux des CPL.
 - Brancher les deux premiers CPL
 - Sur chaque CPL, appuyez pendant 20s sur le petit bouton sur le coté du boitier. Jsuqu'à ce que les loupiotes passent au rouge.
 - Les deux boitiers se retrouve
 - On redébranche
 - On branche le premier
 - On appuis une fois sur le bouton
 - On branche le second dans la foulé et on appuit sur le bouton
 - On rappuit sur le bouton du premier
 - On rebranche le troisième 
 - On appuit sur le bouton
 - On rebranche tout les cable

Le débit passe maintenant à +50M/s

<!-- tags: cpl, débit, devolo, hd -->
