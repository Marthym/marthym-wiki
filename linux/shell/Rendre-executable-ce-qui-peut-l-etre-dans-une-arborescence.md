Dans le cas où par exemple on décompresse un fichier .zip qui contient une appli (sqldevelopper, soapUI, ...) on se
retrouve avec un répertoire en mode 700. Du coup, seul le user qui a décompressé le zip peut lancer l'appli. Il faut donc
passer les répertoire et les fichiers exécutable en 644 et 744 avec chmod. Le plus rapide pour ça est la commande suivante :

``` sh
chmod a+rX -R repertoire_appli
```

Le `X` permet de dire que tout les répertoire passe en exécutable et que les fichiers qui sont déjà exécutable le reste les autres ne changent pas.

<!-- --- tags: linux -->