Avec les nouvelles version du noyau, le DISPLAY est plus verrouillé qu'avant et des problèmes de DISPLAY interviennent
lorsque l'on veut accéder à une appli graphique à l'intérieur d'un docker. Pour résoudre ce problème il faut autoriser
le DISPLAY pour le container, pour cela :
``` sh
xhost +local:`docker inspect --format='{{ .Config.Hostname }}' $containerId`
```

L'idéal serait de la mettre ensuite dans le démarrage du système ...

<!-- --- tags: docker, linux, network -->