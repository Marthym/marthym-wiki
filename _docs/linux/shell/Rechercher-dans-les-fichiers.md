``` sh
find . -iname '*.jsp' | xargs grep 'string' -sl
find . -iname '*.jsp' -mtime -1 | xargs grep 'string' -sl
```
La première recherche simplement dans les fichiers, la seconde recherche dans les fichiers récemment modifiés.

<!-- --- tags: linux -->