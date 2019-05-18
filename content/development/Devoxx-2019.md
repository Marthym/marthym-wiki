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