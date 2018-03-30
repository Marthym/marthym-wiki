Ce qui est pas si évident que ça a faire sous Linux. C'est utile si on n'a pas accès à la console de la 
machine ou pour que le JBoss se lance tout seul au démarrage.

## Script init.d
Il faut commencé par créer un script d'init. Pour cela on peut se servir de celui se trouvant à la fin de la page.

Attention de bien penser à changer la variable ''CAMELEON_DIR'' avec le bon chemin d'installation de JBoss.

## Installation
Ensuite on installe le script. Pour cela, en root :

``` sh
chmod +x cameleon
cp cameleon /etc/init.d/
```

Là le script est installé mais si vous voulez qu'il se lance seul au démarrage il faut l'ajouter aux runlevel :

``` sh
update-rc.d cameleon defaults
```

''Remarque :'' pour le retirer 

``` sh
update-rc.d -f  cameleon remove
```

`FIXME` J'ai pas trop tester ça donc y aller avec des pincettes

## Utilisation
Une fois le script installé, pour l'utiliser :

``` sh
sudo -i
[sudo] password for administrateur: 
service cameleon start
Starting Cameleon Edge: cameleon.
exit
déconnexion
```

Afin de suivre le lancement du JBoss, on pourra utiliser la commande suivante :

``` sh
tail -f /opt/cameleon-edge/jboss-4.2.0.GA/server/cameleon/log/server.log
```

Le **tail** affiche la fin du fichier server.log en temps réel du coup ça simule une console.
Pour en sortir il suffit de faire `Ctrl+C`
`FIXME` Mettre la commande tail dans le status

Pour arrêter ou redémarrer le serveur, utiliser respectivement :

``` sh
service cameleon stop
service cameleon restart
```

## Files
[[include:.doc/init-d-jboss.sh]]

<!-- --- tags: linux, server, jboss -->
