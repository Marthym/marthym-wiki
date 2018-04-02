---
title: "Mettre à jour un package LaTeX"
category: Outils
subcategory: LaTeX
tags: [outils, latex, textlive]
---

J’avais un problème avec un package latex apparemment trop vieux (tcolorbox) :

```
! Package pgfkeys Error: I do not know the key '/tcb/before skip' and I am goin
g to ignore it. Perhaps you misspelled it.
```

Malgrés une install correcte sous Debian (`apt install textlive-full`). Mais il est possible de mettre à jour les packages textlive unitairement avec `tlmgr`. 

Cependant j'ai quand même pris pas mal d'erreur avant de parvenir à la faire fonctionner :

 * Déjà il faut commancer par initialiser l'arbre des packages.
 * Changer l'url du dépôt qui semble't'il n'était pas bonne.
 * Enfin, faire l'install du package désiré.
 
```bash
tlmgr init-usertree
tlmgr option repository ftp://tug.org/historic/systems/texlive/2015/tlnet-final
tlmgr install tcolorbox
```

Après tout ça et un peu de retry en sudo et tout mon document compile.
