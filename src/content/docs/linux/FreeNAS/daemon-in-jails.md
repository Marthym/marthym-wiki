---
title: "Démarrer un daemon dans un jails"
category: Linux
subcategory: FreeNAS
tags: [linux, freenas, jail, daemon]
---

L’idée est de faire en sort qu'un démon soit lancé au démarrage de la jail. Pour la description on va prendre une appli node.js qui montre plusieurs détails de configuration.

Sur les jails actuelle, c’est la version `12.2-RELEASE-p3`.

## Script de démarrage

Voilà le script utilisé dans `/etc/rc.d/monappli`

```shell
#!/bin/sh
#
# PROVIDE: monappli                                         #1
# REQUIRE: networking                                       #2
# KEYWORD:

. /etc/rc.subr

name="monappli"
rcvar="monappli_enable"                                     #3
monappli_user="monuser"                                     #4
monappli_env_file="/var/lib/www/.env"                       #5
monappli_command="/usr/local/bin/node /var/lib/www/dist/app.js"
pidfile="/var/run/monappli/${name}.pid"
command="/usr/sbin/daemon"
command_args="-P ${pidfile} -S -r -f ${monappli_command}"   #6

load_rc_config $name
: ${monappli_enable:=no}

run_rc_command "$1"
```

1. Ce que le script produit
2. Le réseau est nécessaire pour démarrer
3. Nom de la variable dans `rc.conf`
4. L’utilisateur qui lance l'appli
5. Le fichier `.env` de l’appli, ça évite de changer de répertoire
6. La commande daemon qui lance l’appli
   * `-S` logge la console dans syslog (évite de gérer le rolling)

Pensez à `chmod +x` le fichier et à `chown` le répertoire du pid

```shell
chmod +x /etc/rc.d/monappli
mkdir /var/run/monappli
chown monuser:monuser /var/run/monappli
```

A partir de la vous pouvez taper 

```shell
service monappli start|stop|restart
```
Et pour voir les logs 

```shell
tail -200f /var/log/messages
```
## Lancement au démarrage de la jail

Éditer `/etc/rc.conf` et ajouter 

```
enable_monappli=YES
```

Redémarrez la jail et le service devrait se lancer.
