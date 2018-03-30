Pour ceux que le savent pas, un hack CSS consiste à exploiter un bug ou plutôt un manque fonctionnel afin d'écrire un 
seul et unique fichier CSS compatible avec un maximum de navigateur. Par exemple, un hack très répandu mais qui ne 
fonctionne plus maintenant était la directive `!IMPORTANT` dans les propriétés CSS.

## Comment effacer le texte d'un bouton

``` css
.button {
   background-image: url('my-picture-with-text.jpg');
   text-indent: -9999px;
}
``` 
Sauf que ça ne fonctionne pas sur IE. Une solution est :
``` css
.button {
   background-image: url('my-picture-with-text.jpg');
   line-height: 999px; /* Set it higher than your image height */
   overflow: hidden; /* Hide the text */
   font-size: 0; /* FF2 doesn’t like the above */
}
``` 

## Internet Explorer VS Firefox 3
Voici un exemple d'un hack qui différentie IE de FF 3.0 et de FF 3.5 :

``` css
.close {
	margin-top: -5px;
}

.close, #ie8#fix {
	margin-top: -32px;
}

body:nth-of-type(1) .close {
	margin-top: -22px;
}
``` 

Ces trois déclaration de margin porte toutes sur la même classe mais sont interprété différemment selon les navigateurs.

``` css
.close {
	margin-top: -5px;
}
``` 
Celle ci est interprété par tout les navigateurs, c'est en quelque sorte la valeur par défaut.

``` css
.close, #ie8#fix {
	margin-top: -32px;
}
``` 

IE, quelque soit la version n'interprètera pas cette écriture, il ne sait lire `#ie8#fix` du coup il ignore l'instruction 
complète, les autres navigateurs lisent cette déclaration correctement et en tiennent compte.

``` css
body:nth-of-type(1) .close {
	margin-top: -22px;
}
``` 

Cette déclaration elle n'est lut que par Firefox 3.5. En effet le moteur Gecko ayant changé, on constate des différences 
entre FF 3.0 et 3.5, cette écriture permet de rattraper le coup.<br/>
On utilise là une des nouvelles fonctionnalité de FF qui permet l'utilisation de pseudo-classe via la notation `nth-`.

## IE7 VS IE8

``` css
.close {
   margin-top: -5px; /* Lu par IE7 et IE8 */
   *margin-top: 0px; /* Lu uniquement par IE7 */
}
``` 

Cette écriture permet de différencier IE7 et IE8. La première ligne sera lu par tout les navigateurs, la seconde n'est 
lu que par IE7.

## Autres Astuce
Il est possible de jouer sur les commentaires. En effet, les navigateurs récents interprète le commentaire `//` ce qui 
n'est pas le cas des navigateurs plus anciens qui n'interprètent que les commentaires `/* */`.

``` css
.close {
   margin-top: -5px;
   //margin-top: 0px;
}
``` 

Du coup, la deuxième ligne sera interprété normalement par les vieux navigateurs mais sera interprété comme un 
commentaire par les navigateurs récent.

<!-- --- tags: css -->