---
title: "Mute et CEC sur OpenELEC"
category: Divers
tags: [misc, openelec, cec, hdmi, kodi]
---
## Symptômes
 * Déjà au démarrage de Kodi, en haut à droit à coté de l'heure on voit l'icône `MUTE`.
 * Ensuite la télécommande de la TV qui commende Kodi via CEC ne fonctionne pas. Pourtant le périphérique CEC d'OpenELEC s'affiche bien comme démarré.
 * Enfin, à la place de `Kodi` dans la liste des sources de la TV il y a `Recorder`

## Solutions

La solution dans ce cas c'est de débrancher la TV pendant au moins 10 minutes pour faire un cold reboot. Ensuite on débranche tout ce qui est branché sur la TV on branche le Raspberry et on allume la TV.

Normalement là la télécommande refonctionne mais il y a toujours l'icône `MUTE`. Pour l'enlever, on va sur l'interface web de Kodi, onglet `Remote` et on clique sur monter le son. Et pouf tout refonctionne correctement.
