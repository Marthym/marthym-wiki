---
title: "DNS Securise"
category: Linux
subcategory: Réseau
tags: [linux, network, dns, security]
---
L'objectif est de sécuriser les requêtes DNS en les cryptant. Sachant que Tor par défaut ne le fait pas. 
Il est possible de le configurer de façon a ce que les requêtes DNS passent, elles aussi, par Tor mais cela 
demande à changer le `resolv.conf` et à paramétrer Tor correctement. Ce n'est pas forcément pratique même si c'est plus 
anonymisant que le cryptage du DNS vu que le serveur DNS ne sait pas qui lui a fait la requête.
