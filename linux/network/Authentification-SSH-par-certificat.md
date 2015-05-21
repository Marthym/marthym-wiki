L'objectif est de pouvoir se connecté via SSH à un serveur sans fournir de mot de passe. 
Cela ne sera bien-sur possible de depuis une machine ayant la clé privé d'installé !

On commence par générer la paire de clés si c'est pas déjà fait :

~~~ bash
ssh-keygen -t rsa -C "your_email@example.com"
~~~

Laisser les clés se générer dans l'emplacement par défaut et laisser la passphrase vide sinon 
il faudra à chaque fois renseigner la passphrase.

Ensuite il faut installer la clé publique sur le serveur :

~~~ bash
ssh-copy-id -i ~/.ssh/id_dsa.pub user@machine
~~~

Cette commande ne fait qu’ajouter votre clé publique dans un fichier sur le serveur. Voici une commande équivalente :

~~~ bash
cat ~/.ssh/id_rsa.pub | ssh user@machine "cat - >> ~/.ssh/authorized_keys"
~~~

Grâce à cette technique plus besoin de mot de passe pour les crons par exemple et la password se 
balade pas sur le réseau. Par contre quiconque possède votre clé privé ou accède à votre compte 
local peut se connecter au serveur.

<!-- --- tags: linux, security -->
