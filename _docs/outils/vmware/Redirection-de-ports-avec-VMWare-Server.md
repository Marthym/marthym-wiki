Il est possible depuis un serveur VMWare de faire de la redirection de port vers les VM invités qui s'y trouve pour par 
exemple rendre une VM accessible en FTP sans pour autant être obligé de la mettre en "Bridge" et donc de lui donner une 
adresse réseau.

Pour cela il faut modifier le fichier : `/etc/vmware/vmnet8/nat/nat.conf` sur le serveur !

Dans la section ''incomingtcp'' on a les redirections pour le protocole TCP (celui qui nous intéresse pour le FTP ou 
le SSH. Il suffit d'ajouter une ligne comme suivant :

``` sh
# SSH
#      ssh -p 8889 root@localhost
8889 = 192.168.89.145:22
``` 

Ici, on redirige le port 8889 de la machine hôte vers le port SSH (22) de la machine invité. Donc quand on fait un ssh 
sur le port 8889 sur la machine hôte, on tombe sur la machine invité.

## Liens
  * http://www.vmware.com/support/ws5/doc/ws_net_nat_advanced.html

<!-- --- tags: vmware -->
