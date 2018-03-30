---
title: "Erreur Cannot connect to VM lors dun debug"
category: Outils
subcategory: Eclipse
tags: [eclipse, debug]
---
Lors d'un lancement en mode débug, Eclipse se connect à la JVM. Pour cela il utilise localhost comme nom de machine sur la VM. Si dans le fichier `/etc/hosts, localhost` ne pointe pas sur 127.0.0.1 l'erreur Connexion à la VM impossible est levée.
Il suffit donc de corriger le fichier hosts.

