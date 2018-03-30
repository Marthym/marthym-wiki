---
title: "Crash d’Eclipse"
category: Outils
subcategory: Eclipse
tags: [eclipse, crash]
---

J'ai eu a faire face à un problème avec Eclipse qui, suite à une mise à jour Debian (je pense que c'est ça mais sans 
certitude) s'est mis à planter assez facilement et notamment à l'affichage des infos-bulles. Après pas mal de recherche 
il semble que la solution soit de rajouter :

~~~
-Dorg.eclipse.swt.browser.DefaultType=mozilla
~~~

Dans le fichier `eclipse.ini`.
