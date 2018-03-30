<!-- --- title: .Net / Web service erreur CS0029, CS0030 -->
Lors de la création de client ou de serveur WSCart en .Net, on rencontre l'erreur CS0029, CS0030. C'est du à un 
problème d'interprétation du WSDL par .Net qui gère mal est attributs "unbounded" sur les type complex. Pour corriger, 
il faut, dans le fichier .cs généré avec le wsdl.exe de Microsoft, rechercher la chaine `[][]` et remplacer par `[]`. 
On va normalement trouver 2 occurrences.

 * [[http://www.developpez.net/forums/d1101500/dotnet/langages/csharp/web-service-erreur-cs0029-cs0030/]]

<!-- --- tags: dotnet -->