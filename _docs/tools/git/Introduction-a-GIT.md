Je retranscrit ici un article très intéressant trouvé sur internet à propos de [[GIT|git]].

----

Migrer de Subversion (ou CVS) vers Git ne se suffit pas en soit pour profiter de ce qui fait de Git… Git.

Git connait un succès grandissant pour de nombreuses raisons, dont :

* La possibilité de travailler hors ligne
* La possibilité de définir plusieurs dépôts distants
* Github
* L’extrême facilité et rapidité avec laquelle il est possible de gérer des branches
* L’extrême facilité et rapidité avec laquelle il est possible de gérer des branches
* Les deux derniers points
* Surtout les trois derniers points

Après quelques rappels indispensables, nous allons nous concentrer sur le système de branches et proposer un modèle 
« prêt à l’emploi », largement inspiré 
de [[A successul Git branch model|http://nvie.com/posts/a-successful-git-branching-model/]].

## Quelques rappels
### Récupérer un dépôt Git (équivalent de svn checkout)

Git est un système décentralisé, c’est à dire que plusieurs dépôts peuvent co-exister.

Lorsque nous souhaitons récupérer les sources d’un dépôt pour les placer sur notre disque dur, nous allons cloner le 
dépôt dans son ensemble : avec l’historique de toutes les révisions, toutes les branches, tous les tags, ...

Exemple de clone du dépôt du projet « hello-world »

``` sh
git clone git://github.com/geraldcroes/hello-world.git
#Nous pouvons maintenant consulter, hors ligne,
# l'intégralité de l'historique et des branches du dépôt
``` 

### Modfication, Ajout puis Commit

Dans un schéma SVN classique, un fichier peut avoir 3 états :

* Non versionné
* Modifié
* A jour

Dans un schéma GIT, un fichier dispose d’un quatrième état :

* En zone de transit (staging area)

Ce nouvel état indique que le fichier a été sélectionné pour le prochain décollage (commit), ajouté à l’index, mais pour 
autant encore non validé.

Ce petit détail fondamental permet au développeur de se concentrer à chaque commit sur ce qu’il souhaite envoyer vers le dépôt : 
Terminée la sélection laborieuse de tous les fichiers à envoyer, terminé les commits successifs pour une même fonctionnalité.

Voyons en détail comment cela se passe 

``` sh
#modification du fichier1.php, pour fonction 1
#modification de fichier2.php, changement de couleur du titre
#création de fichier3.php, pour fonction 1
#modification de fichier4.php, pour fonction 1
 
#La fonction 1 est terminée, on veut la valider :
git add fichier1.php
git add fichier3.php
git add fichier4.php
 
#on commit la fonctionnalité 1
git commit -m "Fonction 1 terminée"
 
#on en profite pour envoyer la micro modification sur le titre
git add fichier2.php
git commit -m "Changement de couleur du titre"
``` 

Note : L’envoi des fichiers (commit) à ce stade est local => Aucun envois vers le dépôt d’origine n’est effectué. Le 
commit est donc une opération instantanée.

Git encourage à commiter souvent. Plus vous commiterez souvent, plus vous profiterez de la puissance de git.

### Envoyer les fichiers vers le dépôt d’origine

Tant que vous ne le demandez pas, vos modifications (ajouts ou commits) ne sont pas envoyées vers le dépôt d’origine et 
ne sont donc visibles que par vous (raison de plus pour commiter souvent).

Pour envoyer vos modifications locales vers le dépôt d’origine, il vous faut effectuer un « push ».

``` sh
git push
# les commits sont maintenant envoyés
# vers le dépôt d'origine
``` 

### Récupérer les modifications effectuées par d’autres depuis le dépôt d’origine

Ici, aucune surprise, on retrouve un équivalent au « update » de Subversion : le pull.

``` sh
git pull
# les modifications présentes sur le dépôt distant
# sont récupérées 
``` 

<!-- --- tags: git -->