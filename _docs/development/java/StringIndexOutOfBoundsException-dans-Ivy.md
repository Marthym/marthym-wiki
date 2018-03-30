<!-- --- title: Java / StringIndexOutOfBoundsException dans Ivy -->
Quand on utilise un serveur Ivy perso en plus d'un repo local. Qu'une des dépendances est en "latest.integration" et 
que le repo distant est accédé en SSH, on peut prendre une erreur ~StringIndexOutOfBoundsException disant qu'il y a 
un problème lors du listing du répertoire.

Cela vient du SSH. J'ai pas le détail mais on changeant dans le ivysettings.xml, au niveau du repo distant, "ssh" par 
"sftp", ca se met à fonctionner correctement.

<!-- --- tags: java, ivy -->