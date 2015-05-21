``` sh
getScriptPath () {
	echo ${0%/*}/
}
currentPath=$(getScriptPath)
cd $currentPath
```

<!-- --- tags: linux -->
