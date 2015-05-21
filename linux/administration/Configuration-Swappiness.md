Sur Linux, il y a un paramètre qui indique au système d'aller écrire en SWAP même si la RAM est pas pleine. Par défaut, ce paramètre est à 60 ce qui signifie qu'a partir du moment où la RAM est pleine à 40%, le système se défoule sur les disques.

Pour le modifier voilà comment faire :

 1. Ouvrez le fichier `/etc/sysctl.conf`
 2. Modifiez ou ajoutez le paramètre

~~~ properties
vm.swappiness=10
~~~

De cette façon, le système ne se mettra à swapper qu'à partir de 90% de remplissage.

## Remarque
Il est possible de connaître le réglage actuel avec la commande suivante :

~~~ bash
cat /proc/sys/vm/swappiness
~~~

Pour le changer immédiatement pour la session en cours :

~~~ bash
sysctl vm.swappiness=10
~~~

Note que dans ce cas, la configuration reviendra à la normale après le prochain démarrage si vous n'avez pas modifier le paramètre dans le fichier.
