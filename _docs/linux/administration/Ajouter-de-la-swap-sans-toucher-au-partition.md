
Ouais, il faut un minimum de swap pour installer Oracle XE (ou autre chose) et on a pas toujours 
ce que l'installeur demande. 
Par exemple si on a pas choisi de partitionner à la main !

Mais comme Linux c'est quand même super bien branlé, on va pouvoir créer un fichier de 
swap supplémentaire qui va permettre d'atteindre le minimum demandé 
sans avoir a retoucher les partoches.

Déjà, pour savoir combien on a :

~~~ bash 
# free
~~~

Puis on crée un fichier de swap de la taille de l'espace qu'il manque :

~~~ bash 
# dd if=/dev/zero of=/swapfile bs=1M count=100
~~~

Le `count` représente l'espace manquant en Mo.

Ensuite il faut créer le fichier :

~~~ bash 
# mkswap /swapfile
~~~

Puis l'activer :

~~~ bash 
# swapon /swapfile
~~~

Retestez la commande `free` vous devriez constater l'augmentation de la swap. 
Cette astuce est temporaire, au prochain démarrage, 
la swap sera revenue à son niveau précédent, il vous faudra supprimer le fichier `/swapfile` 
pour récupérer l'espace.

<!-- --- tags: linux, security -->
