---
title: "Xmx & Xms par defaut"
category: Développement
subcategory: Java
tags: [development, java, configuration, memory]
---
## Linux 
```bash
java -XX:+PrintFlagsFinal -version 2>&1 | grep -i -E 'heapsize|permsize|version'
```

## Windows
```bash
java -XX:+PrintFlagsFinal -version 2>&1 | findstr /I "heapsize permsize version"
```

Selon le système, les valeurs par défaut peuvent être différente avec les options `-client` et `-server`. Pour connaitre les valeurs par défaut il faut dans ce cas ajouter l'option pour avoir les valeurs correspondante.