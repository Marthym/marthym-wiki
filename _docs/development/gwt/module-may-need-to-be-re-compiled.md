<!-- --- title: GWT / Module may need to be (re)compiled -->
Au lancement de l'appli on prend ce message `GWT module may need to be (re)compiled`. 

En fait c'est parce que j'avais lancer auparavant l'appli en DevMod. depuis le répertoire src/main/webapp, GWT y a 
généré un fichier `*.nocache.js` qui lors du packaging du WAR vient systématiquement écraser celui généré par la 
compilation GWT précédente.

Ce fichier `*.nocache.js` de DevMod ne contient que le strict minimum pour s'exécuter. Il faut donc le supprimer de 
src/main/webapp et relancer la compil.

<!-- --- tags: gwt -->