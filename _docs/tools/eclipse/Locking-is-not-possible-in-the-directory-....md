---
title: "Locking is not possible in the directory ..."
category: Outils
subcategory: Eclipse
tags: [eclipse, error]
---
En fait c'est parce qu'Eclipse ne comprends pas qu'on est en mode partagé ! Du coup il essaye de verrouiller l'appli via 
le répertoire d'install au lieu d'allé chercher dans le répertoire de l'utilisateur.

Pour régler ça, il faut que le répertoire d'install d'Eclipse soit en lecture seule pour les utilisateurs. Du coup il 
ira chercher dans le répertoire de chaque utilisateur.

<!-- --- tags: eclipse -->