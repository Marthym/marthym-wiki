---
title: "Mockito, Mocker des classes finales"
category: Développement
subcategory: Java
tags: [development, java, test, mock]
---

Avec Mockito 2, il est possible de mocker des classes finale mais la feature est pas intuitive !

Ajouter un fichier `src/test/resources/mockito-extensions/org.mockito.plugins.MockMaker` contenant la ligne :

```
mock-maker-inline
```

Et hop on peut mocker des classes finales.