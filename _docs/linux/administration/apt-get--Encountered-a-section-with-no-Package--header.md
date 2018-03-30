Un beau matin alors que je veux mettre a jour ma debian, je me retrouve avec le message d'erreur suivant :
~~~
W: Impossible de récupérer copy:/var/lib/apt/lists/partial/... 
Encountered a section with no Package: header
~~~

C'est un problème bien foireux dont j'ai eu du mal à me sortir ! En fait ya eu un bug un moment donné et du coup sur les machines qui n'ont pas été mise à jour régulièrement on trouve ce message.
En fait sur internet on trouve que des solutions bidons ! La vrai solution c'est qu'il faut installer **bzip2** ! 
Pour faire ça :

``` sh
cd /var/lib/apt/lists
rm -Rf *
apt-get clean
apt-get update
``` 

Là ça vous met toujours l'erreur !
``` sh
apt-get install bzip2
``` 

Ya de bonne chance que ça marche pas, il va vous sortir un truc genre : 
~~~
Lecture des listes de paquets... Erreur !
E: Encountered a section with no Package: header
E: Problem with MergeList /var/lib/apt/lists/ftp.fr.debian.org_debian_dists_testing_main_i18n_Translation-en
E: Les listes de paquets ou le fichier « status » ne peuvent être analysés ou lus.
~~~

Du coup :
``` sh
rm /var/lib/apt/lists/ftp.fr.debian.org_debian_dists_testing_main_i18n_Translation-en
apt-get install bzip2
``` 

Et là ça devrait fonctionner
``` sh
rm -Rf /var/lib/apt/lists/*
apt-get clean
apt-get update
``` 

Et ça fonctionne ! Reste plus qu'à faire le dist-upgrade.

<!-- --- tags: linux -->
