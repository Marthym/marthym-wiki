## Symptômes
On a ce genre de chose après une installation de paquets et les paquets ne sont pas configuré correctement :
~~~
Paramétrage de kerneloops-daemon (0.12+git20090217-3) ...
insserv: warning: script 'K01vmware' missing LSB tags and overrides
insserv: warning: script 'S50vmware-USBArbitrator' missing LSB tags and overrides
insserv: warning: script 'vmware' missing LSB tags and overrides
insserv: warning: script 'vmware-USBArbitrator' missing LSB tags and overrides
insserv: There is a loop at service minissdpd if started
insserv: Starting vmware-USBArbitrator depends on minissdpd and therefore on system facility `$all' which can not be true!
~~~

Dans ce cas c'est VMWare qui met la grouille !

## Solution
Créer le fichier suivant : `/etc/insserv/overrides/vmware` et y mettre ce qui suis dedans :

``` sh
### BEGIN INIT INFO
# Provides:          vmware
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 5
# Default-Stop:      2 3 5
# Short-Description: VMware VMX service for virtual machines
# Description:       Allows running of VMware virtual machines.
### END INIT INFO
```

Créer `/etc/insserv/overrides/vmware-USBArbitrator` et y mettre ce qui suis dedans :
``` sh
### BEGIN INIT INFO
# Provides:          vmware-USBArbitrator
# Required-Start:    $remote_fs $syslog vmware
# Required-Stop:     $remote_fs $syslog vmware
# Default-Start:     2 3 5
# Default-Stop:      2 3 5
# Short-Description: Start daemon when vmware starts
# Description:       Enable service provided by daemon.
### END INIT INFO
```

Enfin, exécuter :
``` sh
chmod +x /etc/insserv/overrides/vmware*
```

Remarque 1 : C'est testé sur Debian 6
Remarque 2 : On le fait pour vmware-USBArbitrator mais je suppose que ça doit être valable pour d'autre modules de VMWare.

## Liens
   * http://communities.vmware.com/message/1875412#1875412

<!-- --- tags: linux, vmware -->