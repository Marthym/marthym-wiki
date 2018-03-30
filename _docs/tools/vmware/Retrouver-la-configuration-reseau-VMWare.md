Il est possible avec VMPlayer de configurer les interfaces réseaux qu'il crée pour le NAT ou le Bridge (ou le Host-Only). 
Il existe même une interface graphique mais pour une raison inconnu, l'accès a cette interface a disparu entre deux 
versions. Il existe tout de même un moyen de la retrouver.

## Sous Windows
Depuis Windows, vous devez ouvrir une fenêtre ligne de commande (cmd) en tant qu'administrateur 
(click droit sur cmd.exe > Run as Administrator). Puis dans la fenêtre tapez :

~~~ bat
c:\> rundll32.exe vmnetui.dll VMNetUI_ShowStandalone
~~~ 

A tester ...

## Sous Linux
Sous Linux c'est plus simple :

``` sh
cd /usr/lib/vmware/bin
ln -s /usr/lib/vmware/bin/appLoader vmware-netcfg
ln -s /usr/lib/vmware/bin/vmware-netcfg /usr/bin/vmware-netcfg
``` 

On obtient à peu de chose prêt le même écran que sous Windows.

## Liens
  * http://communities.vmware.com/message/2155960#2155960
  * http://www.windows7home.net/how-to-enable-or-disable-administrator-account-in-windows-7/
  * http://wiki.debian.org/VMware#Running_vmware-netcfg_.28Virtual_Network_Editor.29_with_VMware_Player

<!-- --- tags: vmware -->