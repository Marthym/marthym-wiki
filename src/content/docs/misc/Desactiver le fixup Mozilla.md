---
title: "Désactiver le fixup Mozilla"
category: Divers
tags: [misc, firefox]
---

Un truc vraiment pénible dans Firefox, quand on saisie l'adresse localhost `http://localhost/` et que cette dernière ne répond pas il remplace par `http://www.localhost.com/` et chaque fois qu’on veut raffraichir on retape ...

Pour désactiver ça :

1. `about:config`
2. Chercher `fixup`
3. Pour `browser.fixup.alternate.enabled` mettre `false`

