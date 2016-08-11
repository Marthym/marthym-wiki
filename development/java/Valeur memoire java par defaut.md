<!-- --- title: Java / Xmx & Xms par defaut -->

## Linux 
```bash
java -XX:+PrintFlagsFinal -version 2>&1 | grep -i -E 'heapsize|permsize|version'
```

## Windows
```bash
java -XX:+PrintFlagsFinal -version 2>&1 | findstr /I "heapsize permsize version"
```

Selon le système, les valeurs par défaut peuvent être différente avec les options `-client` et `-server`. Pour connaitre les valeurs par defaut il faut dans ce cas ajouter l'option pour avoir les valeurs correspondante.