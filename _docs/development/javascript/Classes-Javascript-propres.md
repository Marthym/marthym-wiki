<!-- --- title: JS / Classes Javascript propres -->
Il existe de nombreuses façons de coder en Javascript. La plus fréquente est malheureusement la plus crade : lister ses 
fonctions les une après les autres...

Voici une méthode pour faire ça moins crados, il en existe peut être de meilleures mais celle-ci a le mérite d'être 
très propre et très lisible.

``` js
var monProjet = {}; // On crée une variable globale du nom du projet  
// Ce tableau permettra de stocker et récupérer facilement les objets créés.  
//Je lui donne le nom de la classe avec un 's' marquant le pluriel :  
monProjet.maClasses = new Array();  
/** 
 * Classe maClasse : fait des choses. 
 */  
monProjet.maClasse = function(attr)  
{  
    // Variable  
    this.variable1 = attr;  
      
    monProjet.maClasses.push(this);  
    this.init();  
};  
// Méthodes publiques de maClasse  
monProjet.maClasse.prototype =  
{  
    /** 
     * Initialisation, méthode apellée à l'instanciation de l'objet 
     */  
    init: function()  
    {  
        this.variable2 = this.variable1 + 10;  
    },  
    /** 
     * Autre méthode qui va afficher variable2 dans une alerte 
     */  
    autreMethode: function()  
    {  
        alert(this.variable2);  
    },  
    /** 
     * Retourne une valeur de l'objet sous forme de chaine 
     */  
    toString: function()  
    {  
        return "maClasse Object";  
    }  
};  
// Méthodes Statiques  
/** 
 * Une methode statique qui retourne 'yo' 
 */  
monProjet.maClasse.uneMethodeStatique = function()  
{  
    return "yo";  
};  
/** 
 * Le genre de méthode statique où on se rends compte de l'utilité du tableau d'objets vu plus haut 
 */  
monProjet.maClasse.getByVar1 = function(var1)  
{  
    for (var i = 0; monProjet.maClasses[i]; i++)  
    {  
        if (monProjet.maClasses[i].variable1 == var1)  
        {  
            return monProjet.maClasses[i];  
        }  
    }  
    return false;  
};  
  
//On peut ensuite créer un objet maClasse et apeller ses méthodes publiques et statiques :  
  
var unObjet = new monProjet.maClasse("youpi");  
unObjet.toString(); // retourne "maClasse Object"  
monProjet.maClasse.getByVar1("youpi"); // retourne l'objet "unObjet"  
monProjet.maClasse.getByVar1("youpi").autreMethode(); // Crée une alerte  
``` 
<!-- --- tags: javascript -->