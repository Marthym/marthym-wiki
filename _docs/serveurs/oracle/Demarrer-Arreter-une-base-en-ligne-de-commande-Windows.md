<!-- --- title: Oracle / Démarrer/Arrêter une base en ligne de commande Windows -->
Pour démarrer : 

~~~
C:\> %ORACLE_HOME%\bin\oradim -startup -sid ORCL92 -usrpwd manager -starttype SRVC,INST -pfile C:\oracle9i\admin\ORCL92\pfile\init.ora
~~~

Pour arrêter :
~~~
C:\> %ORACLE_HOME%\bin\oradim -shutdown -sid ORCL92 -shutttype SRVC,INST -shutmode A
~~~

<!-- --- tags: server, oracle -->