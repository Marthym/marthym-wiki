Déjà c'est quoi le MTA ? C'est le **Mail Transfert Agent**, en gros le truc qui s'occupe part déjà de distribuer
les mails au différents users. Quand il est long à démarrer ça peut venir de trois facteurs :

  * le réseau est mal configuré, à savoir qu'il y a une route par défaut mais qu'elle ne fonctionne pas
  * le DNS est mal configuré ;
  * le MTA essaye de se connecter à un smarthost inexistant ou inaccessible.

Donc pour régler le problème, allez vérifier que `/etc/network/interfaces` est bien configuré. Ensuite vérifiez
la configuration DNS dans `/etc/resolv.conf`, ça doit ressembler à ça pour une résolution en local :

~~~
domain localdomain
search localdomain
nameserver 127.0.0.1
~~~

FIXME Si ça ne fonctionne toujours pas, dommage, je sais pas ce que c'est un "smarthost inexistant ou inaccessible" :p

<!-- --- tags: linux -->