---
title: "Concepts intéressants en Java"
category: Développement
subcategory: Java
tags: [development, java, jigsaw, concepts, fork, join, string, try]
---
## Java 9
### Jigsaw


## Java 8
### Dépendence des packages
L'outil `jdeps` permet de visualiser les dépendances inter-package d'un jar.
L'option `-jdkinternal` permet de mettre en évidence l'utilisation d'API interne à Java.

### Concaténation de chaine
L'utilisation d'un StringBuilder n'est utile que dans le cas d'une boucle. En dehors de ça, le `+` aura plus de chance d'être optimisé correctement par le JIT.

### ArrayList vs LinkedList
Avec les CPU ressant, les ArrayList ont des perf meilleure que les LinkedList. C'est du au fait que les ArrayList ont des données contigue en mémoire qui
sont chargé plus facilement dans la mémoire L1 du CPU. Cela évite les allez-retour nécessaire pour parcourir une liste chainée.

De manière général, le parcours de pointeur a un cout.

### TemporalAdjuster
Depuis Java 8 pour les dates il est posssible d'utiliser un TemporalAdjuster qui va permettre de récupérer par exemple le premier jour du mois ou de la semaine.

### Clock
Cette class dispo depuis Java 8 permet de surcharger l'heure système et peut donc être utilisé pour les tests. Elle permet de fixer l'heure.

## Java 7
En fouinant sur la toile et en assistant a des conférences j'ai vu quelques concepts Java 7 intéressant que je ne
voudrais pas oublier :

### Le patern Fork/Join
C'est un truc incorpéré en Java 7 qui permet de dispatcher une tache sécable sur les différents thread (ou coeur) du
processeur. Java 7 fourni des classes pré-implémenté pour faire ça :

`RecursiveAction`, classe permettant de découper une tâche ne renvoyant aucune valeur particulière.
Elle hérite de `ForkJoinTask<Void>`.

`RecursiveTask<V>` identique à la classe précédente mais retourne une valeur, de type `<V>`, en fin de traitement.

Les objets qui permettent le découpage en sous-tâches fournissent trois méthodes qui permettent cette gestion :

 * compute() : méthode abstraite à redéfinir dans l'objet héritant afin de définir le traitement à effectuer ;
 * fork() : méthode qui crée un nouveau thread dans le pool de thread (`ForkJoinPool`) ;
 * join() : méthode qui permet de récupérer le résultat de la méthode compute().

En gros on crée un pool de tache géré par ''~ForkJoinPool'' qui s'occupe de dispatcher le tout sur les différents coeur.
Puis on lance les différentes taches et sous-taches avec fork() et on récupère la valeur avec join().

### Le try-With-resource
Encore un truc spécial J7, c'est une syntaxe qui permettre d'éviter le finally quand on joue avec les streams.

``` java
try(DirectoryStream<Path> listing = Files.newDirectoryStream(path)){			
	for(Path nom : listing){
		//S'il s'agit d'un dossier, on le scanne grâce à notre objet
		if(Files.isDirectory(nom.toAbsolutePath())){
			FolderScanner f = new FolderScanner(nom.toAbsolutePath(), this.filter);
			result += f.sequentialScan();
		}
	}
} catch (IOException e) { e.printStackTrace();}
```

Ce qui se trouve dans le bloc `()` entre `try` et `{` est automatiquement fermé. A condition que la classe en question
implémente `AutoClosable`.

<!-- --- tags: java -->
