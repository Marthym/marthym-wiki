
Voici les Paramètres concernant la gestion des profils :

* **-CreateProfile nomduprofil** - Vous permet de créer un nouveau profil, mais cela ne le lance pas.
* **-CreateProfile "nomduprofil dossier"** - Même chose, mais cette fois vous spécifiez l'emplacement du profil.
* **-ProfileManager, ou -P** - Lance Firefox en affichant le gestionnaire de profil.
* **-P "nomduprofil"** - Démarre Firefox directement avec le profil indiqué.
* **-no-remote** - Couplé au paramètre -P, celui-ci permet de lancer plusieurs instances du même navigateur avec des profils différents.

Maintenant voici les paramètres qui vont modifier le comportement du navigateur :

* **-headless** - Permet de démarrer Firefox en mode headless. C'est un mode spécial qui permet de lancer Firefox sans ouvrir aucune fenêtre. Il est très utilisé pour réaliser des tests unitaires automatisés. Ce mode est dispo uniquement dans Firefox >= 55 sous Linux, Firefox >= 56 sous Windows et macOS
* **-new-tab URL** - Lance Firefox avec l'URL de votre choix.
* **-new-window URL** - Lance Firefox avec l'URL de votre choix affiché dans une nouvelle fenêtre.
* **-private** - Lance Firefox en mode navigation privée (alias le mode "Portail magique vers le Pornivers")
* **-private-window** - Lance Firefox et ouvre en plus une fenêtre navigation privée.
* **-private-window URL** - Lance Firefox et ouvre en plus une fenêtre navigation privée vers le site de votre choix.
* **-search motsclés** - Lance Firefox avec une recherche vers les mots clés voulus
* **-url URL1, URL2, URL3** - Lance Firefox et ouvre un ou plusieurs sites web de votre choix. Vous pouvez séparer les URL par des virgules.

Et sinon, il y a aussi ces paramètres :

* **-safe-mode** - Lance Firefox en mode "Safe", c'est-à-dire avec toutes les extensions désactivées. Vous pouvez aussi maintenir la touche "Shift" lorsque vous cliquez sur votre raccourci.
* **-devtools** - Lance Firefox avec les outils de développement web activés.
* **-inspector URL** - Active l'inspecteur DOM sur l'URL de votre choix.
* **-jsconsole** - Lance Firefox avec la console active.
* **-tray** - Lance Firefox réduit dans la barre des tâches.
