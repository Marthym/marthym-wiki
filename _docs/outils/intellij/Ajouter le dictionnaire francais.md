---
title: "Ajouter le dictionnaire français"
category: Outils
subcategory: IntelliJ
tags: [outils, intellij]
---

Oui les commentaires dans le code ça devrait toujours être en anglais... Mais
parfois, on fait aussi de la documentation ou des choses du genre qui peuvent
être traduite et dans ce cas on aimerait bien ne pas avoir tout les mots
souligné et pourquoi pas un peu de correction.<br/>
Donc voilà comment ajouter un dictionnaire à IntelliJ en utilisant **Aspell** :

```sh
aspell --lang fr dump master | aspell --lang fr expand | tr ' ' '\n' > french.dic
```
Et ça fonctionne pareil pour les autres langues.

Ensuite dans IntelliJ, on va dans `File -> Settings... -> Editor -> Spelling`
et on ajoute le répertoire de dictionnaire custom dans lequel on a mis le fichier
dictionnaire.
