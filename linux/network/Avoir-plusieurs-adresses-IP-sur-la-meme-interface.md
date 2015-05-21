Avec Linux (je sais pas pour Windows) il est possible de configurer plusieurs adresse IP 
pour une même carte réseau.

## Utilité
A quoi ça sert ? Le cas qui m'intéressait au moment de trouver ça c'est le cas d'un serveur Apache
 publiant plusieurs serveurs virtuels en SSL. Dans ce cas Apache n'est pas capable pour des raisons technique de fournir cette fonctionnalité a partir d'un seul couple IP:PORT. Mais si notre serveur apache dispose de plusieurs IP il devient capable de faire ça.

## Configuration
Il faut éditer le fichier `/etc/network/interfaces` comme suit :

~~~
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug eth0
#iface eth0 inet dhcp

iface eth0 inet static
    address 172.16.139.20
    netmask 255.255.255.0
    gateway 172.16.139.254
    up   ip addr add 172.16.139.21/24 dev eth0 label eth0:0
    down ip addr del 172.16.139.21/24 dev eth0 label eth0:0
    up   ip addr add 172.16.139.22/24 dev eth0 label eth0:1
    down ip addr del 172.16.139.22/24 dev eth0 label eth0:1
~~~
    
Ici on se sert de l'outil ''ip'' (futur remplaçant du vieillissant ''ifconfig'') pour ajouter 
des adresses à des label d'eth0 (l'interface par défaut).

_**Remarque :** Pour les VMs le gateway par défaut est x.x.x.2_

Une fois le réseau redémarré, on obtiendra donc l'affichage suivant :

~~~ bash
root@ubuntu:~# ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 16436 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:3c:85:09 brd ff:ff:ff:ff:ff:ff
    inet 172.16.139.20/24 brd 172.16.139.255 scope global eth0
    inet 172.16.139.21/24 scope global secondary eth0:0
    inet 172.16.139.22/24 scope global secondary eth0:1
    inet6 fe80::20c:29ff:fe3c:8509/64 scope link
       valid_lft forever preferred_lft forever
~~~
       
## Liens
  * http://www.cyberciti.biz/faq/bind-alias-range-of-ip-address-in-linux/
  * http://wiki.debian.org/NetworkConfiguration#Multiple_IP_addresses_on_One_Interface
  
<!-- --- tags: linux -->
