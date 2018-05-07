---
title: "Git rerere"
category: Outils
subcategory: Git
tags: [outils, git]
---
Avec git, un des truc simpa c'est le `rebase`, seulement voilà, avec des rebases
on se retrouve souvent avec des conflits et on en vient vite à passer plus de temps
à résoudre les conflits qu'a coder.

Mais il se trouve que Git propose une commande au nom improblable pour préserver
notre fragile état mental, la commande `rerere`.

Pour activer rerere, la seule chose à faire est de l’indiquer en configuration :
``` sh
git config --global rerere.enabled true
```

Une fois activé, Git va se souvenir de la façon dont vous résolvez les conflits, sans votre intervention. Par exemple, avec un fichier nommé bonjour contenant sur master :
```
hello ninjas
```
Une branche french est créée pour la version française :
```
bonjour ninjas
```
Alors que sur master, une modification est appliquée
```
hello ninjas!
```
Si la branche french est mergée, alors un conflit survient :

```
Auto-merging bonjour
CONFLICT (content): Merge conflict in bonjour
Recorded preimage for 'bonjour'
Automatic merge failed; fix conflicts and then commit the result.
```

Si l’on édite le fichier, on a bien un conflit :

``` diff
<<<<<<< HEAD
hello ninjas!
=======
bonjour ninjas
>>>>>>> french
```
Vous pouvez voir les fichiers en conflit surveillés par rerere :
```sh
$ git rerere status
bonjour
```
Vous corrigez le conflit, pour conserver :
```
bonjour ninjas!
```
Vous pouvez voir ce que rerere retient de votre résolution avec :

```sh
$ git rerere diff
```

``` diff
--- a/bonjour
+++ b/bonjour
@@ -1,5 +1 @@
-<<<<<<<
-bonjour ninjas
-=======
-hello ninjas!
->>>>>>>
+bonjour ninjas!
```
Une fois terminée la résolution du conflit (add et commit), vous pouvez voir la
présence d’un nouveau répertoire dans le dossier .git, nommé rr-cache, qui contient
maintenant un dossier correspondant à notre résolution dans lequel un fichier
conserve le conflit (preimage) et la résolution (postimage).

Maintenant, vous vous rendez compte que vous vous préféreriez un rebase plutôt
qu’un merge. Pas de problème, on reset le dernier merge :

```sh
$ git reset --hard HEAD~1
```
On se place sur la branche french et on rebase.

```sh
$ git checkout french
$ git rebase master
...
Falling back to patching base and 3-way merge...
Auto-merging bonjour
CONFLICT (content): Merge conflict in bonjour
Resolved 'bonjour' using previous resolution.
Failed to merge in the changes.
Patch failed at 0001 bonjour ninjas!
```
Nous avons le même conflit que précédemment, mais cette fois on peut voir
« Resolved bonjour using previous resolution. ». Et si nous ouvrons le fichier
bonjour, le conflit a été résolu automatiquement!

Par défaut, rerere n’ajoute pas le fichier à l’index, vous laissant le soin de
vérifier la résolution et de continuer le rebase. Il est possible avec l’option
‘rerere.autoupdate’ de faire cet ajout automatiquement à l’index (je préfère
  personnellement laisser cette option à ‘false’ et vérifier moi-même)!

A noter qu’il serait possible de remettre le fichier avec son conflit (si la
  résolution automatique ne vous convenait pas) :

```sh
$ git checkout --conflict=merge bonjour
```
Le fichier est alors à nouveau en conflit :

``` diff
<<<<<<< HEAD
hello ninjas!
=======
bonjour ninjas
>>>>>>> french
```
Vous pouvez re-résoudre automatiquement le conflit avec :
```sh
$ git rerere
```

## Liens
* <https://hypedrivendev.wordpress.com/2013/08/30/git-rerere-ma-commande-preferee/>
