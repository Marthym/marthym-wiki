---
title: "Accélérer le clonage d’un repo Git"
category: Outils
subcategory: Git
tags: [outils, git, script, gitlab]
---

``` shell
git clone --depth 1 git@gitlab.i-run.fr:irun/.git
cd irun-core
git fetch --depth 1 origin mabranch:mabranch
git diff --name-only master.. | awk -F / '{print $1}' | uniq 
```

