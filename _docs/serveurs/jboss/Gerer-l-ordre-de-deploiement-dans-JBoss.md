<!-- --- title: jBoss / Gérer l'ordre de déploiement dans JBoss -->
C'est un question qui peut paraître inutile mais dans au moins un cas c'est crucial :p

Dans le cas de la création d'un WS Axis2, on utilise une classe AxisServlet qui se trouve être déployé dans l'EAR de 
CameleonEdge ! Dans ce cas, il est important que la webapp que l'on crée avec le WS soit déployé après l'EAR de Cameleon. 
Or, par défaut dans JBoss, les WAR sont quoi qu'il arrivent déployer avant les EAR, donc problème ...

La solution est de créer dans le répertoire deploy du server JBoss un sous-répertoire "deploy.last" (en fait c'est 
surtout le .last qui compte) et d'y mettre les webapps a déployer en dernier ! La solution a été testé pour CrystalRock 
et fonctionne très bien !

On notera tout de même qu'il est possible d'influencer l'ordre des WAR en les préfixant avec des chiffres 
(ex : `1_MonAppliWebService.war`, ...) dans ce cas, les WAR sans préfixe seront déployer puis les WAR avec préfixe dans 
l'ordre de leur préfixe.

Pour finir avec cette histoire d'ordre, il est possible de modifier l'ordre de déploiement par défaut de JBoss en 
modifiant le fichier `jboss-4.2.0.GA\server\cameleon\conf\xmdesc\org.jboss.deployment.MainDeployer-xmbean.xml` comme 
suit :
``` xml
<value value="250:.rar,300:-ds.xml,400:.jar,450:cameleon.ear,500:.war,550:.jse,650:.ear,800:.bsh"/>
``` 

au lieu de
``` xml
<value value="250:.rar,300:-ds.xml,400:.jar,500:.war,550:.jse,650:.ear,800:.bsh"/>
``` 

C'est pas la meilleure solution, toucher à la configuration de JBoss peut entraîner des problèmes si plus tard la R&D 
décide de changer l'ordre de déploiement ou de se servir de cet ordre par défaut pour je ne sais qu'elle fonctionnalité 
magique ...

<!-- --- tags: server, jboss -->