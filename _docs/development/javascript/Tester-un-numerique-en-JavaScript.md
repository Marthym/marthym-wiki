<!-- --- title: JS / Tester un numérique en JavaScript -->
Après des tas et des tas de tests, voici le façon de tester un numérique en [[JavaScript|javascript]] que passe le plus de cas :

``` js
/**
 * Check if value is numerical or not
 * @param strString	Value to check
 * @returns			True if value is numerical, False otherwise
 */
mgpRemainsDependant.isNumeric = function (strString) {
    return !isNaN(parseFloat(strString)) && isFinite(strString);
};
``` 

Attention tout de même, les nombres en hexa du type 0xFF passent ...

## Liens
 * http://dl.dropbox.com/u/35146/js/tests/isNumber.html

<!-- --- tags: javascript -->