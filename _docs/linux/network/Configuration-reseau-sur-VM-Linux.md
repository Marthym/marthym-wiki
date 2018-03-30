Lors de la manipulation de VM on peut avoir besoin de changer l'adresse IP ou de 
mettre la VM en DHCP, ce tuto explique comment faire.

Toutes les commandes se tapent connecté root :

~~~ bash
$ sudo -i
~~~

## Interface réseau
Les interfaces réseau se configurent dans le fichier `/etc/network/interfaces`, 
c'est là que l'on décide si le réseau est en DHCP ou en statique.

La VM par défaut est configuré en mode DHCP, on va donc voir comment la mettre en statique.

### IP DHCP vers IP statique
Déjà, allez vérifiez le nom de l'interface réseau :

~~~ bash
# ifconfig -a
~~~

L'interface qui nous intéresse est l'interface ethx (eth0, eth1, ...).

Ensuite ouvrez le fichier interfaces :

~~~ bash
# vi /etc/network/interfaces
~~~

Recherchez la configuration de l'interface qui nous intéresse, ça devrait ressembler à ça :

~~~
auto eth0
iface eth0 inet dhcp
~~~

Remplacez par la configuration statique :

~~~ conf
auto eth0
iface eth0 inet static
    address 172.16.139.29
    netmask 255.255.255.0
    gateway 172.16.139.2
    network 172.16.139.0
    broadcast 172.16.139.255
    dns-nameservers 172.16.139.2
~~~

Par exemple. On remplacera le début de l'adresse par le bon sous-réseau. Par défaut la gateway sur une VM VMWare est l'adresse `2`, cette adresse sert aussi de DNS.

Ensuite, il faut mettre a jour le DNS en éditant le fichier resolv.conf :

~~~ bash
# vi /etc/resolv.conf
~~~

Ajouter une ligne `nameserver` avec l'adresse du serveur DNS 172.16.139.2.

Puis, si vous êtes sur de ne pas avoir besoin de repasser en DHCP, vous pouvez supprimer le paquet dhcp-client :

~~~ bash
# apt-get remove dhcp-client
~~~

Enfin, il faut relancer l'interface réseau pour que les nouveaux paramètres soient pris en compte :

~~~ bash
# /etc/init.d/networking restart
~~~

## Configuration Proxy
### apt
Pour configurer le proxy pour apt, c'est dans le fichier /etc/apt/apt.conf, il faut ajouter la ligne :

~~~ conf
Acquire::http::Proxy "http://proxy.tl.internal:3128/";
~~~

## Liens
  * http://www.howtogeek.com/howto/ubuntu/change-ubuntu-server-from-dhcp-to-a-static-ip-address/
  
<!-- --- tags: linux, vmware, network -->
