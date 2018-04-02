---
title: "Visualisation instantané de modifications Latex"
category: Outils
subcategory: LaTeX
tags: [outils, latex, pdf, ghostview, tmux]
---
Jusque là j'utilisais Gummy comme éditeur LaTeX. Il me permet de voir en direct les modifications que je fais sur le(s) fichier(s). Mais ça rame un peu et surtout quand j'utilise XelateX ça fonctionne pas bien, il me faut faire plusieurs modification pour qu'il se mette à jour. En plus sur des PDF avec un peu plus d'une page c'est pas pratique, son éditeur n'est pas configurable, ... bref.

Voilà une solution qui fonctionne bien. Dans un onglet `tmux` j'ouvre 3 panels :

* Commandes Git
* `latexmk --pvc` qui compile et génère le PDF en boucle tant qu'il n'y a pas d'erreur
* `gv --watch build/mon-pdf.pdf` qui affiche et rafraichis mon PDf
