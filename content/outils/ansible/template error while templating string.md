---
title: "Template error while templating string: Missing end of comment tag"
category: Outils
subcategory: Ansible
tags: [ansible, jinja]
---

C'est une erreur qui se produit lorsque l'on essaye de templatizer un script bash contenant un calcul de taille de table genre `${#modules[@]}`. Jinja le prend pour un commentaire non terminé `{# comment #}` et ça marche pas. 

Pour corriger : `{% raw %}{{ '${#modules[@]}' }}{% endraw %}`.
