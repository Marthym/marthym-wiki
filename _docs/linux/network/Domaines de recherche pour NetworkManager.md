<!-- --- title: Domaines de recherche pour NetworkManager -->

Dans les versions récentes de Gnome Shell, l'interface de NetworkManager ne donne plus la possibilité de saisir les
domaines de rechercher pour les serveurs DNS. Il est possible de les mettre dans le `resolv.conf` mais le fichier
est géré par NetworkManager et peut être écrasé n'importe quand. Un solution est donc de mettre manuellement la configuration
de NetworkManager à jour dans le fichier `/etc/NetworkManager/system-connections/Wired connection 1`:

~~~
[connection]
id=Wired connection 1
uuid=86fe8169-0452-488e-8662-0cb1dc834333
type=ethernet
timestamp=1423488595

[ipv6]
method=auto
ip6-privacy=2

[ipv4]
method=auto
dns=172.17.10.31;172.17.11.100;208.67.222.222;208.67.220.220;
dns-search=livingobjects.com;lo.internal;
ignore-auto-dns=true
~~~

en rajoutant la ligne **dns-search**.

## Liens
 * https://developer.gnome.org/NetworkManager/stable/ref-settings.html

<!-- --- tags: linux, network, dns -->