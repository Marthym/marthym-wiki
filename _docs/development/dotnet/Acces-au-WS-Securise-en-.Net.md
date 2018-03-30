<!-- --- title: .Net / Accès au WS Sécurisé en .Net -->
Depuis la version 8 (je sais plus quel fix), les services Cameleon sont sécurisé. La difficulté est donc maintenant de 
les accéder en .Net, c'est moins facile qu'en Java !

Avec chaque WS client .Net, il y a un fichier de configuration associé dans lequel on met par exemple le endpoint et ce 
genre de truc. C'est dans ce fichier qu'il faut configurer l'authentification du WS en ajoutant les lignes :

``` xml
<security mode="TransportCredentialOnly">
   <transport clientCredentialType="Basic" proxyCredentialType="None" realm="Cameleon Ws"/>
   <message clientCredentialType="UserName" algorithmSuite="Default"/>
</security>
``` 

Il faudra ensuite bien sur, dans le code qui consomme le WS, ajouter les lignes de code pour passer le user et le 
password :

``` csharp
cart.ClientCredentials.UserName.UserName = "cameleon";
cart.ClientCredentials.UserName.Password = "leon";
``` 

<!-- --- tags: dotnet -->