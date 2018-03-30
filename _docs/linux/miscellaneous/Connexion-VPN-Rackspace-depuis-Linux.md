Sous Linux il n'existe pas de client VPN Cisco officiel mais Rackspace préconise l'utilisation de VPNC qui fonctionne très bien.

## Installation du package
Sous Debian & Co c'est simple :

~~~ bash
$ sudo apt-get install vpnc
~~~

## Configuration
Commencez par créer un fichier dans **/etc/vpnc**

~~~ bash
$ sudo vi /etc/vpnc/rackspace.conf
~~~

Ajoutez y les lignes suivante :

~~~
IPSec gateway 184.106.120.83
IPSec ID CameleonAdmins
IPSec secret {password group ? voir avec RSE}
Xauth username fcombes@cameleon-software.com
~~~

## Activer la connexion
Dans une console :

~~~ bash
$ sudo vpnc rackspace
~~~

Il vous faut alors renseigner votre password.

## Désactiver la connexion

~~~ bash
$ sudo vpnc-disconnect
~~~

<!-- --- tags: linux, vpn -->
