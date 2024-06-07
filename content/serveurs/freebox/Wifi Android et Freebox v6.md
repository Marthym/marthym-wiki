---
title: "Wifi Android et Frrebox v6"
category: Freebox
tags: [freebox, free, wifi, android, google]
---

Cela m'a fait galérer pendant des mois. Impossible de comprendre pourquoi un Pixel 6 n'arrive pas a se connecter au wifi de la Freebox alors qu'il se connecte partout ailleurs. Surtout que tous les autres appareils de la maison se connectent très bien.

Le Pixel passe son temps de se connecter/déconnecter à l'infinie. Il se connecte mais la connexion ne tient pas plus de 5s. Coté Freebox, on voit le périphérique apparaitre et disparaitre.

Puis arrive le Chromecast dans la place. Et ... même comportement. C'est dingue que tous les appareils Google est le même problème !

Le pire dans tout ça c'est que les appareils accèdent bien à internet parce que si pendant les quelques secondes de connexion, j'essaye d'accéder à internet, j'y parvient le temps que la connexion saute...

J'ai tout tenté pour comprendre d'où ça vient:

 * Forcer les bande de fréquence
 * Changer pour un mot de passe plus simple
 * Rendre le SSID visible
 * Me rapprocher de la box
 * Redémarrer la box
 * Redémarrer la box
 * Redémarrer la box
 * Changer les canaux wifi
 * Changer les DNS
 * Configurer les appareils en IP fixe

Rien de tout cela n'a fonctionné.

Au final, le problème venait de l'IPv6 et du fait qu'une option par défaut de la Freebox force le DNS pour IPv6.

Une fois l'option désactivée, plus de problème de connexion.