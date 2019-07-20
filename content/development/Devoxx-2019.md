---
title: "Devoxx 2019"
category: Développement
tags: [development, java, devoxx]
weight: -1
---

## Vidoés intéressantes


## Sujets

### Outils intéressants 

* `ClassGrap` pour l'instrospection de classes
* `deptective` maven plugin pour controler les dépendances
* `resilience4j` outil pour faire entre du circuit breaker
* `dev-tools` de pivotal. C'est un dépendance avec plein d'outils pour le dev spring
* `picocli` pour faire des appli java pour la ligne de comande

Alors c'est possible de transformer un jar en commande linux en conca* 

### Jar to terminal command
ténant le jar dans un fichier sh

### Faire fonctionner le CSRF

Dans Spring il faut ajouter un `csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())`

Ajouter un endpoint `/api/csrf` qui renvoit le token

```java
@GetMappint("/api/csrf")
public CsrfToken csrf(CsrfToken token) {
    return token;
}
```

Attention que le cors pour cette resource soit bien limité a notre front

### Spring

Ajouter la dépendance `io.micrometer:micrometer-registry-prometheus` dans l’appli finale comme implémentation de l’api micrometer.

activer les endpoint de management (actuator) :

`management.endpoint.web.exposure.include=*`


ajouter un tag specifique à l’application:

`management.metrics.tags.application=review`
`management.metrics.tags.application=cronos`

Spring gère les duration par defaut comme propriétés !

La dépendance de dev `spring-boot-configuration-processor` permet de rajouter des meta donnée lors de la compilation. Ces meta données peuvent être utiliser par les ide pour valider les propriétés customs par exemple.

## Docker et JVM 

Explorer un docker avec Dive
https://github.com/wagoodman/dive


Pour améliorer le startup on peu utiliser le CDS (Class Data Sharing)
`java -Xshare:dump` crée une archive de l’état de la jvm après démarrage et l’utilise pour lancer les applications plus rapidement avec l’option `-Xshare:on`.
En mettant cette archive sur un layer ou un volume partagé, on gagne du temps de up à moindre cout. 

Pour les JVM à courte vie, utiliser un GC adapté (Serial GC par exemple)