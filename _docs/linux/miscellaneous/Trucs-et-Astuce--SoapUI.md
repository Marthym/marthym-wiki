## SoapUI à 100% de CPU
Sous Linux il peut arriver (souvent) que SoapUI monte à 100% de CPU et y reste ...

En fouillant un peu sur internet, on trouve que ça vient de de JxBrowser et par chance il est possible de le désactiver 
en modifiant le fichier de lancement .sh :

``` sh
#uncomment to disable browser component
   JAVA_OPTS="$JAVA_OPTS -Dsoapui.jxbrowser.disable=true"
``` 

<!-- --- tags: linux, tools -->