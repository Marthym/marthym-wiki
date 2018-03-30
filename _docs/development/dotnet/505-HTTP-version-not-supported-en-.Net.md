<!-- --- title: .Net / (505) HTTP version not supported en .Net -->
Lors de l'appel d'un WS Cameleon depuis .Net on peut tomber sur ce genre de message super explicite ! Pour résoudre 
le soucis, il faut ajouter les lignes suivante dans le fichier de configuration du WS client :

``` xml
<system.net>
   <settings>
      <servicePointManager expect100Continue="false"/>
   </settings>
</system.net>
``` 

<!-- --- tags: dotnet -->