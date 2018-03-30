<!-- --- title: Oracle / Utiliser DataPump en ligne de commande -->
Depuis la 10g, il y a deux méthodes pour exporter/importer un schéma :

* Import / Export normaux (exp)
* DataPump (>=10g uniquement) (expdp)
La méthode ~DataPump est plus rapide et plus souple. Préférez donc celle là !

## DataPump
``` sh
c:\> expdp system/manager directory=DATA_PUMP_DIR dumpfile=EDGE_SP3_FIX016_AXA.dmp schemas=edge
``` 
``` sh
c:\> impdp system/manager directory=DATA_PUMP_DIR dumpfile=EDGE_SP3_FIX016_AXA.dmp schemas=edge
``` 
L'intérêt du ~DataPump est qu'il crée les schémas s'ils n'existent pas, qu'il permet de re-mapper les schémas et les 
tablespaces très facilement et qu'il va 3x plus vite que l'export normal.

### Localiser le DIRECTORY
L'une des particularité du Datapump est qu'à l'inverse de l'export standard, les fichiers sont lut et écrit, non pas 
dans le répertoire courant mais dans un DIRECTORY Oracle, genre de lien base de données vers un répertoire physique. 
Il ne faut donc pas mettre le fichier n'importe où !

Par défaut, un DIRECTORY est toujours présent dans Oracle, le directory ~DATA_PUMP_DIR. Il se trouve généralement dans 
$ORACLE_HOME/admin/INSTANCE/dpdump. Mais cela diffère selon les installation. Pour le localiser à coup sur, sous 
sql*plus :

``` sql
SQL> select * from dba_directories;

OWNER   DIRECTORY_NAME   DIRECTORY_PATH  
------- ---------------- -------------------------------------------- 
SYS     DATA_PUMP_DIR    D:\oracle\product\10.2.0\admin\campj\dpdump\  
``` 

Il est aussi possible d'en créer un avec la commande :

``` sql
SQL> create directory TEMP_DATAPUMP_DIR as 'c:\temp\';
``` 
Attention ! Oracle ne vérifie l'existence ni les permissions du répertoire ! S'il y a un soucis de ce genre c'est au 
moment du dump qu'une erreur sera levé !

### Remarque 1
le paramètre SQLFILE de la commande impdp permet d'obtenir un fichier SQL contenant les requêtes de l'import. Ca permet 
entre autre d'avoir la liste des tablespaces de l'export.

### Remarque 2
Il est possible de re-mapper les tablespaces ou les users pour, par exemple, déverser un user edge_test dans un user 
edge_prod. Les paramètres ~REMAP_SCHEMA et ~REMAP_TABLESPACE s'utilisent de la façon suivante :

``` sh
c:\> impdp system/manager directory=DATA_PUMP_DIR dumpfile=EDGE_SP3_FIX016_AXA.dmp remap_schema=edge:cameleon remap_tablespace=users:tbs_cameleon
``` 

## Page d'aide
Pour obtenir la liste des options : 

``` sh
expdp help=y
``` 

~~~
Copyright (c) 2003, 2005, Oracle.  All rights reserved.


The Data Pump export utility provides a mechanism for transferring data objects
between Oracle databases. The utility is invoked with the following command:

   Example: expdp scott/tiger DIRECTORY=dmpdir DUMPFILE=scott.dmp

You can control how Export runs by entering the 'expdp' command followed
by various parameters. To specify parameters, you use keywords:

   Format:  expdp KEYWORD=value or KEYWORD=(value1,value2,...,valueN)
   Example: expdp scott/tiger DUMPFILE=scott.dmp DIRECTORY=dmpdir SCHEMAS=scott
               or TABLES=(T1:P1,T1:P2), if T1 is partitioned table

USERID must be the first parameter on the command line.

Keyword               Description (Default)
------------------------------------------------------------------------------
ATTACH                Attach to existing job, e.g. ATTACH [=job name].
COMPRESSION           Reduce size of dumpfile contents where valid
                      keyword values are: (METADATA_ONLY) and NONE.
CONTENT               Specifies data to unload where the valid keywords are:
                      (ALL), DATA_ONLY, and METADATA_ONLY.
DIRECTORY             Directory object to be used for dumpfiles and logfiles.
DUMPFILE              List of destination dump files (expdat.dmp),
                      e.g. DUMPFILE=scott1.dmp, scott2.dmp, dmpdir:scott3.dmp.
ENCRYPTION_PASSWORD   Password key for creating encrypted column data.
ESTIMATE              Calculate job estimates where the valid keywords are:
                      (BLOCKS) and STATISTICS.
ESTIMATE_ONLY         Calculate job estimates without performing the export.
EXCLUDE               Exclude specific object types, e.g. EXCLUDE=TABLE:EMP.
FILESIZE              Specify the size of each dumpfile in units of bytes.
FLASHBACK_SCN         SCN used to set session snapshot back to.
FLASHBACK_TIME        Time used to get the SCN closest to the specified time.
FULL                  Export entire database (N).
HELP                  Display Help messages (N).
INCLUDE               Include specific object types, e.g. INCLUDE=TABLE_DATA.
JOB_NAME              Name of export job to create.
LOGFILE               Log file name (export.log).
NETWORK_LINK          Name of remote database link to the source system.
NOLOGFILE             Do not write logfile (N).
PARALLEL              Change the number of active workers for current job.
PARFILE               Specify parameter file.
QUERY                 Predicate clause used to export a subset of a table.
SAMPLE                Percentage of data to be exported;
SCHEMAS               List of schemas to export (login schema).
STATUS                Frequency (secs) job status is to be monitored where
                      the default (0) will show new status when available.
TABLES                Identifies a list of tables to export - one schema only.
TABLESPACES           Identifies a list of tablespaces to export.
TRANSPORT_FULL_CHECK  Verify storage segments of all tables (N).
TRANSPORT_TABLESPACES List of tablespaces from which metadata will be unloaded.
VERSION               Version of objects to export where valid keywords are:
                      (COMPATIBLE), LATEST, or any valid database version.

The following commands are valid while in interactive mode.
Note: abbreviations are allowed

Command               Description
------------------------------------------------------------------------------
ADD_FILE              Add dumpfile to dumpfile set.
CONTINUE_CLIENT       Return to logging mode. Job will be re-started if idle.
EXIT_CLIENT           Quit client session and leave job running.
FILESIZE              Default filesize (bytes) for subsequent ADD_FILE commands.
HELP                  Summarize interactive commands.
KILL_JOB              Detach and delete job.
PARALLEL              Change the number of active workers for current job.
                      PARALLEL=<number of workers>.
START_JOB             Start/resume current job.
STATUS                Frequency (secs) job status is to be monitored where
                      the default (0) will show new status when available.
                      STATUS[=interval]
STOP_JOB              Orderly shutdown of job execution and exits the client.
                      STOP_JOB=IMMEDIATE performs an immediate shutdown of the
                      Data Pump job.
~~~
<!-- --- tags: server, oracle -->