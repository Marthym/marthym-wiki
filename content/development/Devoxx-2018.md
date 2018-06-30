---
title: "Devoxx 2018"
category: Développement
tags: [development, java, devoxx]
weight: -1
---

## Vidoés intéressantes
Toutes les vidéos sont visionnable sur le [Youtube de Devoxx](https://www.youtube.com/channel/UCsVPQfo5RZErDL41LoWvk0A/videos)

* Nouveautés - [Après Java 8, Java 9 et 10 — JM. Doudou](https://www.youtube.com/watch?v=dYubeLiObqY) *45mn* \\
  *Toujours bon a savoir pour resté informer*
* Spring - [Applications Web avec Spring Boot 2.0 — S. Nicoll](https://www.youtube.com/watch?v=Cf_PMzQBhog) *47mn* \\
  *Les nouveauté de Spring Boot 2.0, Reactor, Actuator, ...*
* Architecture - [Architecture hexagonale pour les nuls — Y. Chéné)(https://www.youtube.com/watch?v=Hi5aDfRe-aE) *30mn* \\
  *Survol des bases de cette archi mais très intéressant*
* Perf/JIT - [Java lang invoke — Rémi Forax](https://www.youtube.com/watch?v=z5UkoLaW6ME) *45mn* \\
  *Très technique, peu applicable mais super intéressant*
* Architechture - [Être architecte logiciel en 2018 — Arnauld Loyer & Cyrille Martraire](https://www.youtube.com/watch?v=1igv2rHGKfo) *2h40m* \\
  *Conf intéressante, duo sympa, attention à pas entrer dans le purisme*
* Architechture - [De la grosse application spaghetti aux micro services — N. Helleringer & P. Grimaud](https://www.youtube.com/watch?v=jbBdYrlpgh8&t=5s) *45m* \\
  *Rapide survol d’un découpage d’application legacy, un bon aperçu mais ils ne font que survoler les problèmes qu’ils ont eu*
* Système - [SystemD pro level — P.A. Grégoire & Q. Adam](https://www.youtube.com/watch?v=v-jdlc5YdDc) *2h20m* \\
  *Très bon talk sur SystemD, des bases à la pratique, mais déjà vu l’an dernier*
* Front - [Angular et performances — C. Balit & W. Chegham](https://www.youtube.com/watch?v=ZxZQv5wopOs) *45m* \\
  *C’est les base mais pour les non initiés c’est intéressant*
* Culture - [L’ordinateur quantique](https://www.youtube.com/watch?v=ciM6xK05t2o) *20m* \\
  *Vulgarisation sur l’ordi quantique*
* Système - [Gagner des super pouvoirs avec le terminal — S. Ehret](https://www.youtube.com/watch?v=mxRpBHar_BQ)
* Culture - [On n’est pas chez Google ici !](https://www.youtube.com/watch?v=LeONtn2ECxo)
* Web - [RetourAuxSources Les cookies HTTP — H. Sablonnière](https://www.youtube.com/watch?v=KL9MR721c4w) *47m* \\
  *Retour sur le fonctionnement des cookies et les problèmes que ça engendre)

## Front

### Tests

* Cypress: Test end to end (vs Selenium)


### Angular

* `source-map-explorer` est un outil qui permet de voir l’impact des dépendances sur la taille du code
* Bazel un outil de build qui sera utilisé pour la prochaine version de angular (on peut faire du Java)
* Le Server Side Render est géré par Angular Universal
* Pour améliorer les perf on peut géré le changeDetection (pushStrategie) par composant attention à faire attention a ce que l’on fait, on peut facilement tout casser

## Back

### Spring Boot

* Spring Boot Activator ?
* AuthenticationManager doit être créé à la main
* Voir `@Secured` ce qu’on peut en faire
* Désactiver le monitoring par défaut si on veut pas l’utiliser (MicroMeter)
* Spring embarque un client Consul
* gRPC: Protocole de communication binaire inter-service à base de HTTP/2.0 + protobuff 
  * <https://github.com/LogNet/grpc-spring-boot-starter>
* Tailable Cursors avec MongoDB. Les données sont envoyé au travers d’un Flux dés qu’elles arrivent sur Mongo
* Spring Boot Actuator a été grandement remanié pour la v2.0. C’est le handpoint des infos interne de Spring.

### Maven

* Regarder le Maven Docker Plugin par Fabric8

### Migrations Java 9, 10, ...

La nouvelle politique de mise à jour choisie par Oracle impose de se poser la question de la migration. Une nouvelle version tout les 6 mois et un support gratuit beacoup plus court.

* **jdeps**: `jdeps --class-path 'libs/*' --jdkinternals --dot-output './graphViz' -recursive vanaheim.jar`
  * **--jdkinternals**: Propose un remplacement pour les API internes
  * **--dot-output**: Génère des fichiers dot pour visualisation GraphViz
* Fin du support gratuit Java 8 en Janvier 2019, plus de mise à jour de sécurité (RGPD ?)
* Version de Java tout les 6 mois
* Possible suppression de classes ou méthodes @Deprecated d’une version à l’autre
* Identifiant `_` n’est plus valide
* Plus d’accès au API internes
* Nécessite IntelliJ 2018.1
* Plus de split package
* Plus de dépendances cycliques
* `jax-b` & `jax-ws` n'est plus résolut -> utiliser une dépendance externe. Retiré en Java 11.

### Java 10

La plus grosse nouveauté c’est l’utilisation de `var` pour l’inférence de type. Ca n’est pas du JS, ça ne fait qu’inférer le type, ças ne veut pas dire que l’on peut y mettre n’importe quoi après.

C’est pratique pour éviter d’écrire des wagons de `<>`. Par contre pas d’inférence vers les super-types ou les interfaces, `var l = new ArrayList` donne le type `ArrayList` à var et pas le type `List`.

Meilleur support de Docker. Ajout d’une option par défaut sous Linux `-XX-UseContainerSupport` qui ajuste les paramêtres de la JVM aux informations du container (cgroup, CPU, ...).

### Bon à savoir !!

* La lecture d’un champ `volatile` par la JVM impose que toutes les lectures de champ suivantes soient faite depuis la RAM, jusqu`à ce que les registres soient vidé. Ce qui veut dire que celà imposé une remonté des dites variables dans la RAM pour pouvoir les lire. Ca peut induire de problèmes de perf.
* java.lang.invoke = appel de method en reflection pour les vresion 8, 9, 10
* Dans l’industrie, certaine migration à Maven on pris 1 an pour être acceptées.
* Complexité Cognitive vs Complexité Cyclomatique
* Lire "Coder Proprement (Clean code) de Robert C. Martin"

## Système

### Mesure et Metriques

* Prometheus: Pull de métriques, en Go, compatible Grafana, pas de trace log, fourni les metrique système, Alerte

### SystemD

* Il est possible de créer des Unit SystemD de type `Path` qui exécute quelque chose dés qu’un fichier est modifié
* Pour chaque utilisateur il y a un deamond SystemD qui lance gère les process dans le contexte de l’utilisateur
* Les Units `Timer` peuvent remplacer cron.
* il est possible de faire des snapshot SystemD pour sauver une configuration de services.
* systemd-nspawn permet de poper un systemd secondaire à l’intérieur d’un container permettant d’avoir un gestion de process propre dans le container
* `systemd-analyze blame` pour connaitre les temps de démarrage des service

### Terminal

* tig: Un git graphique en terminal... <https://jonas.github.io/tig/>
* thefuck: <https://github.com/nvbn/thefuck>
* mpd / ncmpcpp: Lecteur de zic <https://github.com/MusicPlayerDaemon/MPD> et son client pour terminal <https://rybczak.net/ncmpcpp/>

## Divers

### Chaos Ingeneering

* VRK: Equivalent Gatling
* Pumba / TC (Traffic Control: Met de la latence dans le réseau

### Architechture

* Préférer le Domain Driven Dev, un découpage par fonctionalité. La même entité de base peut être des entités différentes dans des modules application différents
* Le DDD implique beaucoup de mapper entre les Entité des différents domaines
* Il peut être intéressant de versionner le json via un Content-Type spécifique en header de request `application/vnd.myapplication.user.v1+json`.
* Les données peuvent être recopié de l’autorité vers le consomateur mais en aucun cas une donées recopiée ne peut être modifié.\\
  Recopié la donnée (ou un sous-ensemble de la donnée) permet au module consomateur d’être autonome. Mais n’étant pas le propriétaire il ne peut ni les modifier ni les distribuer.
* L’archi doit avant tout tenir compte des compétences et des ressources présentent
* Commencer un développement avec un Monolite Modulaire (Micro-Service Ready) plutôt que direct un Micro-Service mal découpé.
* Archi Decision Record: Concerver toutes les décisions, par exemple des fichiers .md dans un répertoire.\\
  <https://github.com/joelparkerhenderson/architecture_decision_record#how-to-start-using-adrs-with-tools>
* Architecture Hexagonale
  * Pas de code d’infra dans le domain
  * Les Service comme l’API ne doivent avoir aucune dépendance lourde
  * Les classe de @Service de spring sont des coquilles vident qui étedent les Service du domaine
  * <http://blog.xebia.fr/2016/03/16/perennisez-votre-metier-avec-larchitecture-hexagonale/>
