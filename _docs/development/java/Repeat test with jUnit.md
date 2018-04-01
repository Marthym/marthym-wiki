---
title: "Répéter un test x fois avec jUnit"
category: Développement
subcategory: Java
tags: [development, java, junit, test]
---

Ajouter la Rule `RepeatRule` :

```java
@Rule
public RepeatRule repeatRule = new RepeatRule();
```

Ajouter l'annotation `@Repeat` au test :

```java
@Repeat(times = 100)
```

Dans IntelliJ, les X exécutions n'apparaissent pas, il n'y a qu'une ligne mais qui a pris plus de temps.