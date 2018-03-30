Comme Linux c'est trop bien, ya un petite commande très simple qui permet de formater proprement un XML.
C'est pratique par exemple pour pouvoir l'ouvrir dans Eclipse car si le XML est formaté sur une seule ligne
Eclipse pète une durite quand on veut l'ouvrir ...

``` sh
xmllint -format -recover nonformater.xml > formater.xml
```
<!-- --- tags: linux -->