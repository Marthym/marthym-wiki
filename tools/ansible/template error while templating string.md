<!-- title: Ansible / template error while templating string: Missing end of comment tag -->

C'est une erreur qui se produit lorsque l'on essaye de templatizer un script bash contenant un calcul de taille de table genre `${#modules[@]}`. Jinja le prend pour un commentaire non terminé `{# comment #}` et ça marche pas. 

Pour corriger : `{{ '${#modules[@]}' }}`.

<!-- tag: ansible, jinja -->