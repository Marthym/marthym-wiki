---
title: "Maven Release Plugin"
category: Développement
subcategory: Java
tags: [development, java, maven]
---

Quelques explications sur le fonctionnement du [Maven Release Plugin] utilisé pour l’automatisation des releases.

## parent
Déjà la première chose est de configurer les différents plugins de release dans le parent.

``` xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-release-plugin</artifactId>
  <version>2.5.3</version>
</plugin>
<plugin>
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>versions-maven-plugin</artifactId>
  <version>2.5</version>
</plugin>
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-javadoc-plugin</artifactId>
  <version>3.0.0</version>
  <configuration>
    <skip>true</skip>
  </configuration>
</plugin> 
```

### Maven Release Plugin
Le [Maven Release Plugin] est le plugin qui va faire le gros du travail, Mettre à jour le pom avec les bons numéros de version, faire les commit et poser les tags.

### Versions Maven Plugin
Le [Versions Maven Plugin] va permettre de mettre à jour les dépendances SNAPSHOT avant la release.

### Maven Javadoc Plugin
Le [Maven Javadoc Plugin] C’est le plugin chargé de générer la JavaDoc, il est utilisé par le [Maven Release Plugin]. Comme aujourd’hui la Javadoc des composants n’est pas conforme, il est nécessaire de la désactiver.

## Dans nos projets

Dans les poms de nos projets il est nécessaire d’avoir correctement configuré l’accès Git, sans quoi les tags ne pourront pas être posé correctement.
``` xml
<scm>
    <connection>scm:git:git://github.com/Marthym/hello-osgi-world.git</connection>
    <developerConnection>scm:git:git@github.com:Marthym/hello-osgi-world.git</developerConnection>
    <url>https://github.com/Marthym/hello-osgi-world</url>
</scm>
```

Pensez aussi à déclarer les plugins dans la partie `<build>`.

## Renseignement des versions
Pour pouvoir fonctionner en mode silencieux, l’étape de préparation de la release à besoin d’un fichier de configuration, à placer à la racine du projet, contenant les numéros de versions des artefacts du projet, pour la release et pour la prochaine SNAPSHOT.

Le fichier a cette forme :
``` properties
scm.tag=1.5.0
project.rel.fr.ght1pc9kc\:hello-osgi-world=1.5.0
project.dev.fr.ght1pc9kc\:hello-osgi-world=1.6.0-SNAPSHOT
scm.commentPrefix=rel(main):
```

On peut aussi lui préciser le préfixe de commit, par défaut `[maven-release-plugin]`, selon nos conventions on choisira plutôt `rel(main):`.

## Les commandes
Suppression des snapshots dans les dépendances:
``` bash
mvn versions:use-releases -DprocessParent=true -DfailIfNotReplaced=true
```

Le principe du plugin consiste en la suppression des chaînes `-SNAPSHOT` dans le fichier mais le plugin vérifie quand même que la version à mettre existe bien, ait bien été releasé. Si ce n’est pas le cas, il plante.

Deux paramètres :
* `processParent`: Précise qu’il faut traiter aussi le bloc `parent`
* `failIfNotReplaced`: Demande au plugin de sortir en erreur si une version d’une dépendance n’existe pas

Phase de release:
``` bash
mvn release:prepare -DtagNameFormat="@{version}" release:perform
```
En fait le plugin agit en deux étapes qui peuvent être exécuté en une ligne.

* `prepare`:
  - Rassemble les informations
  - Joue les test
  - Pose les tags
  - Modifie les poms avec les bonnes versions
* `perform`: 
  - Compile le code sous le tag
  - Pousse le jar sur le Nexus

Attention, il est nécessaire de push les modif
``` bash
git push && git push --tags
```

[Maven Release Plugin]: http://maven.apache.org/maven-release/maven-release-plugin/
[Versions Maven Plugin]: https://www.mojohaus.org/versions-maven-plugin/
[Maven Javadoc Plugin]: https://maven.apache.org/plugins/maven-javadoc-plugin/