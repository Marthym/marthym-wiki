<!-- --- title: JS / Utiliser Firebug (Lite) avec IE -->
Autant avec Firefox le débogage de CSS ne fait pas vraiment peur, autant dés qu'on parle de problèmes IE et d'autant 
plus de problème IE6 ou 7, là c'est un peu plus flippant.

Alors il va exister exister une solution : https://getfirebug.com/firebuglite

C'est pas trop compliqué à utiliser, il suffit d'inclure le JS présent dans l'archive
 https://getfirebug.com/releases/lite/latest/firebug-lite.tar.tgz à l'intérieur de vos composants puis de créer un 
 marque page avec le code suivant à l'intérieur :

``` js
javascript:(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E=new%20Image;E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','firebug-lite-debug.js','releases/lite/debug/skin/xp/sprite.png','https://getfirebug.com/','#startOpened');
``` 

Après, sous IE vous chargez le composant, puis quand vous voulez ouvrir Firebug, vous clickez sur le marque page. 
Et hop firefox apparaît.

Bon, c'est une version "Lite" donc faut pas s'attendre à des trucs magiques mais bon ... c'est quand même pratique.

<!-- --- tags: javascript -->