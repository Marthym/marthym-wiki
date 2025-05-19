---
title: "Autoriser l’acces au DISPLAY pour un container specifique"
category: Outils
subcategory: Docker
tags: [development, docker, network]
---
Avec les nouvelles version du noyau, le DISPLAY est plus verrouillé qu’avant et des problèmes de DISPLAY interviennent
lorsque l’on veut accéder à une appli graphique à l’intérieur d’un docker. Pour résoudre ce problème il faut autoriser
le DISPLAY pour le container, pour cela :

``` sh
{% raw %}xhost +local:`docker inspect --format='{{ .Config.Hostname }}' $containerId`{% endraw %}
```

L’idéal serait de la mettre ensuite dans le démarrage du système ...
