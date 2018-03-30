<!-- --- title: Oracle / Démarrage/Arrêt automatique d'Oracle sous Linux -->
Modifier le fichier /etc/oratab (ou /var/opt/oracle selon install)
Ajouter `<SID>:<ORACLE_HOME>:Y` le "Y" indiquant si la base doit être ou non démarré par "dbstart" et "dbshut".

Créer le script ''/etc/init.d/dboracle'' contenant :

``` sh
#!/bin/bash
  #
  # chkconfig: 35 99 10
  # description: Starts and stops Oracle processes
  #
 # Set ORA_HOME to be equivalent to the $ORACLE_HOME
  # from which you wish to execute dbstart and dbshut;
  #
  # Set
ORA_OWNER to the user id of the owner of the
  # Oracle database in ORA_HOME.
  #
  ORA_HOME=<Type your ORACLE_HOME
in full path here>
  ORA_OWNER=<Type your Oracle account name here>
  case "$1" in
     'start')
       # Start the TNS Listener
        su - $ORA_OWNER -c "$ORA_HOME/bin/lsnrctl start"
        # Start the Oracle
databases:
        # The following command assumes that the oracle login
        # will not prompt the user for any values
       su - $ORA_OWNER -c $ORA_HOME/bin/dbstart
        # Start the Intelligent Agent
        if [ -f $ORA_HOME/bin/emctl ];
then
            su - $ORA_OWNER -c "$ORA_HOME/bin/emctl start agent"
        elif [ -f $ORA_HOME/bin/agentctl ]; then
           su - $ORA_OWNER -c "$ORA_HOME/bin/agentctl start"
        else
            su - $ORA_OWNER -c "$ORA_HOME/bin/lsnrctl
dbsnmp_start"
        fi
        # Start Management Server
        if [ -f $ORA_HOME/bin/emctl ]; then
            su
- $ORA_OWNER -c "$ORA_HOME/bin/emctl start dbconsole"
        elif [ -f $ORA_HOME/bin/oemctl ]; then
            su
- $ORA_OWNER -c "$ORA_HOME/bin/oemctl start oms"
        fi
        # Start HTTP Server
        if [ -f $ORA_HOME/Apache/Apache/bin/apachectl
]; then
            su - $ORA_OWNER -c "$ORA_HOME/Apache/Apache/bin/apachectl start"
        fi
        touch /var/lock/subsys/dbora
       ;;
     'stop')
        # Stop HTTP Server
        if [ -f $ORA_HOME/Apache/Apache/bin/apachectl ]; then
  su - $ORA_OWNER -c "$ORA_HOME/Apache/Apache/bin/apachectl stop"
        fi
        # Stop the TNS Listener
      su - $ORA_OWNER -c "$ORA_HOME/bin/lsnrctl stop"
        # Stop the Oracle databases:
        # The following
command assumes that the oracle login
        # will not prompt the user for any values
        su - $ORA_OWNER -c $ORA_HOME/bin/dbshut
       rm -f /var/lock/subsys/dbora
        ;;
  esac
  # End of script dbora
```

Modifier les permissions du script :

``` sh
chmod 755 /etc/init.d/dbora
```

Enregistrer le service :

``` sh
/sbin/chkconfig --add dbora
```

_Cette action enregistre le services dans les mécanisme de démarrage de Linux. Sur SuSE SLES7 et Red Hat Advanced Server
2.1 ça crée des lien symbolique dans le répertoire rc`<runlevel>`.d vers /etc/init.d/dbora script._

## Liens
  * http://www.togaware.com/linux/survivor/Starting_Stopping.html
  
<!-- --- tags: linux, oracle -->