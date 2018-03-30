<!-- --- title: Oracle / Désinstaller Oracle XE sous Linux -->
C'est pas bien compliqué mais pour le faire proprement ya quelques trucs à pas oublier.

## Désinstallation des packages
### Debian

``` sh
apt-get remove oracle-xe-universal
apt-get purge oracle-xe-universal
```

## Suppression des fichiers restant

``` sh
rm -Rf /usr/lib/oracle/xe
rm -Rf /etc/oratab
rm -Rf /etc/init.d/oracle-xe
rm -Rf /etc/sysconfig/oracle-xe
rm -Rf $(find . -name *oracle*)
```

<!-- --- tags: linux, oracle -->