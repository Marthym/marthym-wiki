---
title: "Division par 2 rapide"
category: Développement
subcategory: Java
tags: [development, java, tips, code]
---

Multiplier par 2 est équivalent à shifter les bits vers la gauche, diviser, à les shifter vers la droite.

```java
n = n << 1; // Multiply n with 2 

n = n >> 1; // Divide n by 2 
```
