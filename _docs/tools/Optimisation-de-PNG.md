Dans un site web, ça peut être utile d'optimiser ces images PNG pour les réduire. Le PNG étant un format sans perte, 
cela permet d'avoir une bonne qualité à moindre coût.

Pour cela il y a deux commandes que je ne détaillerais pas :
``` sh
pngnq -vf -s1 schedulers.png
optipng -o7 schedulers-nq8.png
``` 

 * `pngnq` est un quantizer, il calcule la palette de couleur la plus restreinte pour l'image.
 * `optpng` lui optimise les images suivant tout un tas de règles. Attention, il peut arriver que les images soient plus 
 grosse à la sorti.
 
<!-- --- tags: tools, images -->