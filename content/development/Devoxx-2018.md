---
title: "Devoxx 2018"
category: Développement
tags: [development, java, devoxx]
---

## Vidoés intéressantes
Toutes les vidéos sont visionnable sur le [Youtube de Devoxx](https://www.youtube.com/channel/UCsVPQfo5RZErDL41LoWvk0A/videos)

* Nouveautés - [Après Java 8, Java 9 et 10 — JM. Doudou](https://www.youtube.com/watch?v=dYubeLiObqY) *45mn* \\
  *Toujours bon a savoir pour resté informer*
* Perf/JIT - [Java lang invoke — Rémi Forax](https://www.youtube.com/watch?v=z5UkoLaW6ME) *45mn* \\
  *Très technique, peu applicable mais super intéressant*
* Architechture - [Être architecte logiciel en 2018 — Arnauld Loyer & Cyrille Martraire](https://www.youtube.com/watch?v=1igv2rHGKfo) *2h40m* \\
  *Conf intéressante, duo sympa, attention à pas entrer dans le purisme*

## Chaos Ingeneering

* VRK: Equivalent Gatling
* Pumba / TC (Traffic Control: Met de la latence dans le réseau

## Tests

* Cypress: Test end to end (vs Selenium)

## Spring Boot

* Spring Boot Activator ?
* AuthenticationManager doit être créé à la main
* Voir `@Secure` ce qu’on peut en faire
* Désactiver le monitoring par défaut si on veut pas l’utiliser (MicroMeter)
* Spring embarque un client Consul

## Maven

* Regarder le Maven Docker Plugin par Fabric8

## Mesure et Metriques
* Prometheus: Pull de métriques, en Go, compatible Grafana, pas de trace log, fourni les metrique système, Alerte

## Migrations Java 9, 10, ...

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

## Java 10

La plus grosse nouveauté c’est l’utilisation de `var` pour l’inférence de type. Ca n’est pas du JS, ça ne fait qu’inférer le type, ças ne veut pas dire que l’on peut y mettre n’importe quoi après.

C’est pratique pour éviter d’écrire des wagons de `<>`. Par contre pas d’inférence vers les super-types ou les interfaces, `var l = new ArrayList` donne le type `ArrayList` à var et pas le type `List`.

Meilleur support de Docker. Ajout d’une option par défaut sous Linux `-XX-UseContainerSupport` qui ajuste les paramêtres de la JVM aux informations du container (cgroup, CPU, ...).

## Bon à savoir !!

* La lecture d’un champ `volatile` par la JVM impose que toutes les lectures de champ suivantes soient faite depuis la RAM, jusqu`à ce que les registres soient vidé. Ce qui veut dire que celà imposé une remonté des dites variables dans la RAM pour pouvoir les lire. Ca peut induire de problèmes de perf.
* java.lang.invoke = appel de method en reflection pour les vresion 8, 9, 10

## Architechture

* Préférer le Domain Driven Dev, un découpage par fonctionalité. La même entité de base peut être des entités différentes dans des modules application différents
* Le DDD implique beaucoup de mapper entre les Entité des différents domaines
* Il peut être intéressant de versionner le json via un Content-Type spécifique en header de request `application/vnd.myapplication.user.v1+json`.
* Les données peuvent être recopié de l’autorité vers le consomateur mais en aucun cas une donées recopiée ne peut être modifié.\\
  Recopié la donnée (ou un sous-ensemble de la donnée) permet au module consomateur d’être autonome. Mais n’étant pas le propriétaire il ne peut ni les modifier ni les distribuer.
* L’archi doit avant tout tenir compte des compétences et des ressources présentent
* Commencer un développement avec un Monolite Modulaire (Micro-Service Ready) plutôt que direct un Micro-Service mal découpé.
* Archi Decision Record: Concerver toutes les décisions, par exemple des fichiers .md dans un répertoire.\\
  <https://github.com/joelparkerhenderson/architecture_decision_record#how-to-start-using-adrs-with-tools>