---
title: "non fast forward updates were rejected"
category: Outils
subcategory: Git
tags: [outils, git, eclipse]
---
C’est qu’il y a un problème de synchro, s’il est réglé immédiatement c’est pas compliqué. En général c’est provoqué par 
le plugin EGit qui a du mal à gérer les modification de commit.

``` sh
git pull origin develop
git push
```
