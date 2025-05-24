---
title: "Division par 2 rapide"
category: Développement
subcategory: Java
tags: [development, java, tips, code]
lastUpdated: 2025-05-23
---

Multiplier par 2 est équivalent à shifter les bits vers la gauche, diviser, à les shifter vers la droite. Ce triks est 1000x plus rapide qu’une division, encore aujourd’hui sur les processeurs récent.

```java
n = n << 1; // Multiply n with 2 

n = n >> 1; // Divide n by 2 
```
