---
title: "Extraire une branche dans un autre répertoire"
category: Outils
subcategory: Git
tags: [outils, git, worktree, branch]
---

Il est possible de "checkout" une branche d’un dépôt git dans un autre arborescence que celle du dépôt d’origine. La commande est la suivant :

```shell
# git worktree add <repertoire> <branche>
#
# exemple:

git worktree add ../core-improve-cicd feature/improve-ci-cd
```

Attention, cette branch ne pourra plus être checkout dans l’arborescence du dépôt et toutes les manipulations devront se faire depuis le nouveau `worktree` de la branche.

Pour supprimer l’extraction :

```shell
rm -rf ../core-improve-cicd
git worktree prune
```
