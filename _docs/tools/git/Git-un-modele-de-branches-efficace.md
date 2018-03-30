La gestion des branches dans Subversion ou CVS n’est pas suffisamment simple et rapide pour encourager les développeurs 
à s’y frotter, voire les en dissuade

Partant de ce constat, tous les développeurs restent dans « le trunk », avec tous les inconvénients que cela peut avoir :

* Mr X commit en deux parties son code, rendant l’espace de quelques instants l’intégralité du projet instable
* Mr X commit une fonctionnalité en cours de développement, rendant le projet impossible à livrer tant qu’il n’aura pas terminé sa fonctionnalité
* Mr Y commit lui aussi une fonctionnalité en cours de développement, rendant le projet encore moins possible à livrer 
tant qu’il n’aura pas terminé sa fonctionnalité.

Et nous nous retrouvons avec un trunk complètement instable ou un « hotfix » devient impossible à réaliser.

C’est là que Git intervient en proposant une gestion des branches simple et rapide.

## Git, peux-tu faire quelque chose pour nous ?

Oui, il le peut, en nous permettant de respecter ce schéma facilement:
[[.img/brancheGit01.png|align=center]]

## Le master
[[.img/brancheGit02.png|align=center]]

Le master correspond à la version de production : Personne ne travaille directement sur la production mais il est 
possible, en permanence, de créer une branche à partir du master (pour des corrections de bug urgents par exemple).

## La branche develop

La branche develop correspond à la dernière version de développement stable. Develop est la branche d’intégration, 
c’est à partir de cette dernière que la prochaine version de production sera créée.

Aucune fonctionnalité en cours de développement n’est envoyée directement à develop, seules les fonctionnalités 
terminées y sont envoyées.

Tout le monde devrait pouvoir, à moindre risque, se reposer sur la branche develop.

## Branche de nouvelle fonctionnalité (feature)

_Branche réalisée à partir de : develop
La branche sera réintroduite dans : develop_

Lorsque nous voulons créer une nouvelle fonctionnalité dans notre projet, nous allons créer une branche portant le nom 
de cette fonctionnalité en partant de la branche develop (qui est la branche la plus récente).

Cette branche restera ouverte tant que la fonctionnalité ne sera pas terminée.
### Création de la branche

``` sh
git checkout -b nom_fonctionnalite develop
Switched to a new branch "nom_fonctionnalite"
``` 

Si l’on souhaite que la branche soit connue de tous (qu’elle soit présente sur le dépôt d’origine), il est possible de le faire.

### Envoi de la branche sur l’origine

``` sh
git push origin nom_fonctionnalite
``` 

Lorsque la fonctionnalité est terminée, nous pouvons l’inclure dans la branche develop.

### Incorporation de la branche dans develop

``` sh
#on va sur la branche develop pour y effectuer l'opération de merge
git checkout develop
 
#On demande le merge de la fonctionnalite dans develop
git merge nom_fonctionnalite
 
#On peut supprimer la branche nom_fonctionnalite devenue inutile
git branch -d nom_fonctionnalite
 
#On demande l'envois des modifications sur le dépôt d'origine
git push origin develop
``` 

## Créer une nouvelle version (release)

_Branche réalisée à partir de : develop
La branche sera réintroduite dans : master et develop_

Lorsqu’un ensemble de fonctionnalité est terminé il est temps de livrer en production. La plus part du temps nous 
devons passer par une phase de recette (utilisateurs ou technique) : Cette recette sera réalisée sur cette branche.

Nous pourrons lors de cette recette corriger des bugs mineurs, peaufiner quelques détails d’interface ou simplement 
mettre à jour les informations de version (fichiers README, numéro de version, ...).

Pendant cette recette, il sera possible aux autres développeurs de continuer de travailler sur les fonctionnalités pour 
les versions suivantes (dans les branches de fonctionnalités).

### Créer la branche de nouvelle version

``` sh
#creation avec la convention release-numversion
git checkout -b release-x.y develop
 
#mettez à jour votre README avec le numéro de version
git add README
git commit -m "Version x.y"
``` 

Une fois la recette validée par les utilisateurs et tous les correctifs mineurs intégrés, réintégrez la branche dans le master

### Intégration de la version dans le master

``` sh
#on se positionne sur le master pour y intégrer la branche
git checkout master
 
#Intégration de la branche avec l'option --no-ff pour tracer la fusion
git merge --no-ff release-x.y
 
#On tag la version
git tag -a x.y
 
# On envoie le contenu du master sur le dépôt d'origine
# L'option --tags indique à git que l'on souhaite
# envoyer l'information de tag
git push --tags
``` 

Bien sûr, il ne faut pas oublier de réintégrer dans la version develop les changements intervenus lors de la recette.

### Intégration de la version dans la branche develop

``` sh
git checkout develop
git merge --no-ff release-x.y
``` 

La branche de version n’a plus lieu d’être

### Supression de la branche de version
``` sh
git branch -d release-x.y
``` 

## Corrections de bugs en production

[[.img/brancheGit03.png|align=center]]

_Branche réalisée à partir de : master
La branche sera réintroduite dans : master et develop_

Lorsqu’un bug critique est détecté en production et que sa correction est urgente nous aurons recours à la branche de 
correction à chaud.

Cette branche est réalisée à partir du master, qui rappelons le est la copie conforme de la production.

Cette branche permet d’isoler le correctif de production du cycle de développement normal du produit (réalisé dans la 
branche develop).

Une fois le correctif appliqué, il sera intégré au master et à la branche develop.

## Création de la branche correctif (hotfix)

``` sh
#création de la branche hotfix à partir du master
git checkout -b hotfix-x.y.z master
 
#Mise à jour du numéro de version
# ... édition du readme & autres
# ... (processus identique à celui de la release)
 
# Validation de la mise à jour de version
git commit -a -m "Correctif x.y.z"
``` 

Le travail de correction est effectué…
### Envois des modifications

``` sh
git commit -m "Correctif du problème blabla signalé par Bob"
``` 

Et le travail d’introduction classique aux branches commence :
### Intégration du Hotfix en production

``` sh
git checkout master
git merge --no-ff hotfix-x.y.z
git tag -a x.y.z
git push --tags
``` 

### Intégration du Hotfix dans la branche develop

``` sh
git checkout develop
git merge --no-ff hotfix-x.y.z
``` 

### Supression de la branche hotfix devenue inutile

``` sh
git branch -d hotfix-1.2.1
``` 

## Conclusions

La puissance de [[Git|git]] réside dans les nouvelles possibilités qui nous sont offertes.
Migrer vers Git implique de changer ses méthodes de travail pour en bénéficier.

### Git Flow
[[Git flow|https://danielkummer.github.io/git-flow-cheatsheet/]] est un outil qui permet de simplifier les commandes 
git pour utiliser ce modèle de branches.

## Liens
 * http://www.croes.org/gerald/blog/git-modele-de-branche-efficace/649/
 * http://nvie.com/posts/a-successful-git-branching-model/
 
<!-- --- tags: git -->