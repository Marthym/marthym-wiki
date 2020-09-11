---
title: "Signer tous les commits"
category: Outils
subcategory: Git
tags: [outils, git, gpg, pgp]
---

Il est possible de signer automatiquement tous les commits d’un dépôt git avec la configuration suivante :

```shell
git config commit.gpgsign true
```

On peut aussi l’appliquer à l’ensemble des dépôt présent pour un utilisateur avec l'option `--global` :

```shell
git config commit.gpgsign true
```

Enfin, si on veut reprendre tous les commits d’un dépôt pour les signer à postériori :

```shell
git rebase -i --root --exec 'git commit --amend --no-edit -S'
git push --force
```

Attention, comme tous les `rebase` + `push --force` c’est potentiellement destructeur si vous travaillez à plusieurs.