---
title: "Recuperer le chemin d’un script bash"
category: Linux
subcategory: Shell
tags: [linux, shell, script]
---
``` sh
getScriptPath () {
	echo ${0%/*}/
}
currentPath=$(getScriptPath)
cd $currentPath
```
