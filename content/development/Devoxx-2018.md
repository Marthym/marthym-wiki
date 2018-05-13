---
title: "Devoxx 2018"
category: Développement
tags: [development, java, devoxx]
---

## Vidoés intéressantes
Toutes les vidéos sont visionnable [ici](https://www.youtube.com/channel/UCsVPQfo5RZErDL41LoWvk0A/videos)

* [Après Java 8, Java 9 et 10 — JM. Doudou](https://www.youtube.com/watch?v=dYubeLiObqY)

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

## Maven

* Regarder le Maven Docker Plugin par Fabric8

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