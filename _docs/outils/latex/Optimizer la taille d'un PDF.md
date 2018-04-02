---
title: "Optimizer la taille d’un PDF"
category: Outils
subcategory: LaTeX
tags: [outils, latex, pdf, gs]
---
La génération d'un PDF depuis LaTeX c'est super mais ça donne des PDF un peu volumineux parfois. Voilà une ligne de commande pour réduire drastiquement la taille des PDF:

```bash
/usr/bin/gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -dPDFSETTINGS=/ebook -sOutputFile=foo-compressed.pdf foo.pdf
```

Attention, `gs` dans Prezto c'est un alias vers git d'où l'utilisation du chemin complet.

On peut ajouter l'option `-dPDFSETTINGS` qui règle la qualité :

```
-dPDFSETTINGS=/screen   (screen-view-only quality, 72 dpi images)
-dPDFSETTINGS=/ebook    (low quality, 150 dpi images)
-dPDFSETTINGS=/printer  (high quality, 300 dpi images)
-dPDFSETTINGS=/prepress (high quality, color preserving, 300 dpi imgs)
-dPDFSETTINGS=/default  (almost identical to /screen)
```
