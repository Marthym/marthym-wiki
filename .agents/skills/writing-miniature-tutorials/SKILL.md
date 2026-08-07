---
name: writing-miniature-tutorials
description: Use when the user asks to create or update a miniature or figurine painting tutorial in this wiki, including paint recipes, project color schemes, basing, or an illustration of the expected result.
---

# Writing Miniature Painting Tutorials

Créer une page Markdown exploitable avec le matériel réel de l'utilisateur. Traiter `src/content/docs/figurines/painting-set.md` comme l'unique source d'inventaire.

## Workflow

1. Se placer à la racine qui contient `src/content/docs/figurines/painting-set.md`. Arrêter si ce fichier manque.
2. Obtenir le nom du projet, déduire le nom du tuto selon la demande, si aucun information n'est donnée sur le style, le déduire des autres tuto du projet.
3. Lire le painting set au moment de la demande. Relever chaque couple référence/nom exact sans recopier cette liste dans le skill.
4. Lire les pages `.md` du projet dans `src/content/docs/figurines/<projet>/`, puis choisir le degré de cohérence adapté.
5. Concevoir exactement trois schémas avec les règles de théorie des couleurs ci-dessous.
6. Afficher leur aperçu ANSI, recommander un schéma et attendre le choix de l'utilisateur. Si l'utilisateur délègue explicitement le choix, retenir la recommandation.
7. Dès le schéma choisi, générer son illustration de rendu avant toute rédaction, la présenter à l'utilisateur et attendre sa revalidation explicite. Si l'utilisateur change d'avis, ajuster le schéma, régénérer l'illustration et la faire revalider.
8. Après validation du rendu seulement, créer `src/content/docs/figurines/<projet>/<figurine-en-kebab-case>.md`. Employer des minuscules ASCII et des tirets pour le projet et le fichier.
9. Valider la page, corriger les erreurs, puis lancer le build.

## Théorie des couleurs

- Définir une couleur dominante, une couleur secondaire et une ou deux couleurs d'accent.
- Construire d'abord le contraste de valeur : les ombres, tons moyens et éclaircissements doivent rester distincts à distance de jeu.
- Utiliser la température et la saturation pour séparer les zones proches. Réserver les couleurs les plus saturées aux points focaux.
- Choisir une harmonie adaptée au sujet : analogue pour l'unité, complémentaire pour un accent fort, ou chaude/froide pour séparer les matériaux. Ne pas imposer une formule si le schéma demandé fonctionne autrement.
- Vérifier les mélanges réels avec le painting set. Éviter les mélanges complémentaires excessifs qui produisent une teinte terne, sauf pour neutraliser volontairement une ombre.
- Expliquer brièvement les choix utiles dans le tutoriel par leur effet visuel, sans ajouter un cours théorique séparé.

## Choix du schéma

Avant de créer la page ou l'illustration, proposer trois schémas distincts et réalisables avec le painting set. Pour chacun, fournir :

- un nom court;
- une couleur dominante;
- une couleur secondaire;
- une couleur d'accent;
- une phrase décrivant l'ambiance et le contraste.

Écrire les produits avec leur nomenclature complète. Si une couleur repose sur un mélange, donner ses proportions dès cette étape.

Estimer une valeur RGB `#RRGGBB` pour la dominante, la secondaire et l'accent de chaque schéma. Ces valeurs servent uniquement à l'aperçu écran et ne remplacent pas les références de peinture. Exécuter le renderer avec trois groupes de quatre arguments :

```bash
node .agents/skills/writing-miniature-tutorials/scripts/render-color-schemes.mjs \
  "Nom 1" "#dominante" "#secondaire" "#accent" \
  "Nom 2" "#dominante" "#secondaire" "#accent" \
  "Nom 3" "#dominante" "#secondaire" "#accent"
```

Le cercle ANSI marque la dominante (`D`), la secondaire (`S`) et l'accent (`A`). Après chaque aperçu, afficher aussi les trois produits en texte pour les terminaux qui ne restituent pas les couleurs. Préciser que le rendu RGB reste approximatif.

Terminer par `### Recommandation`, choisir un seul schéma et justifier ce choix par la théorie des couleurs, la lisibilité et la cohérence du projet. Attendre ensuite le choix de l'utilisateur. Ne créer aucun fichier de tutoriel et aucune illustration avant ce choix. Une fois le choix reçu, appliquer immédiatement le workflow d'illustration et de revalidation ci-dessous; ne pas commencer à rédiger la page entre-temps.

## Cohérence du projet

Donner priorité au schéma demandé par l'utilisateur, puis choisir l'un de ces modes d'après les pages existantes :

- **Schéma commun :** conserver la même palette et introduire de légères variations de mélanges, d'usure ou d'accents.
- **Palettes variées :** autoriser des schémas différents tout en conservant quelques marqueurs communs, comme les métaux, les cuirs, le traitement des ombres ou les socles.
- **Thème commun :** laisser chaque figurine avoir son propre schéma tout en partageant une ambiance, une température, un niveau de saturation ou une histoire visuelle.

Ne pas figer un projet à partir d'une seule page. Conserver seulement les marqueurs pertinents pour la nouvelle figurine et laisser varier le reste. En l'absence d'indication claire, adopter le mode le moins contraignant compatible avec les tutoriels existants.

## Produits et mélanges

- Utiliser exclusivement les peintures, encres, washes, pigments, médiums, vernis et produits de soclage présents dans le painting set.
- Autoriser l'eau et les outils usuels comme le pinceau ou la palette; ne pas les traiter comme des produits de l'inventaire.
- Écrire chaque produit, à chaque occurrence, sous la forme `**72.031 Camouflage Green**`. Ne jamais abréger le nom ni omettre la référence.
- Créer une teinte absente uniquement par un mélange de produits disponibles. Dire clairement lorsqu'aucun mélange satisfaisant n'est possible.
- Pour chaque mélange, écrire les proportions en parts directement dans la liste placée sous le titre de niveau 3, une ligne par composant. Ne pas répéter ensuite les composants ni leurs proportions dans les détails. Préciser seulement la dilution, le nombre de couches et le séchage lorsqu'ils influencent le résultat.

Format d'une étape avec mélange :

```markdown
### Vêtement vert

- 2 parts de **72.031 Camouflage Green**
- 1 part de **72.029 Sick Green**

Mélange les deux peintures, dilue avec 1 part d'eau et applique deux couches fines en laissant sécher chaque couche.
```

## Format de la page

Commencer par ce frontmatter, avec des valeurs non vides entre guillemets doubles :

```markdown
---
title: "Nom de la figurine"
description: "Résumé du schéma de peinture et du résultat recherché."
tags: [leasure, painting, figurines, tuto]
---
```

Ne pas ajouter de titre Markdown de niveau 1 : Starlight affiche déjà le `title`. Placer ensuite ce résumé avant le premier chapitre :

```markdown
- **Style recherché :** ...
- **Couleurs dominantes :** ...
- **Couleurs d'accent :** ...
- **Niveau de difficulté :** ...
- **Temps estimé :** ...
```

Utiliser exactement ces titres de niveau 2, dans cet ordre :

```markdown
## 1. Bases
## 2. Ombrage
## 3. Éclaircissements
## 4. Finitions
## 5. Socle
```

Dans chaque chapitre :

- regrouper les étapes par couleur avec des titres de niveau 3;
- commencer chaque étape, immédiatement après son titre de niveau 3, par la liste des produits employés, sans titre ni texte d'introduction comme `Pots utilisés`; placer ensuite seulement les détails de l'étape;
- faire apparaître chaque produit une seule fois dans cette liste avec sa nomenclature complète; pour un mélange, préfixer chaque composant par sa quantité en parts directement dans la liste; ne pas répéter plus bas la recette du mélange
- immediatement après la liste indiquer la dilution si elle n'est pas standard
- traiter les grandes zones avant les détails;
- éviter de revenir plusieurs fois sur une même zone;
- ajouter au bon endroit les conseils de geste, charge du pinceau, dilution, séchage et correction des erreurs;
- couvrir toutes les zones visibles de la figurine et terminer les finitions avant le socle.

## Compatibilité Astro et Starlight

- Créer une page `.md`, pas `.mdx`.
- Employer du Markdown standard. Ne placer aucun `import`, `export`, composant Astro ou composant JSX dans la page.
- Fermer le frontmatter avec `---` avant le contenu et conserver les champs `title`, `description` et `tags` du modèle ci-dessus.
- Utiliser des chemins relatifs valides pour les liens et les images. Enregistrer les images du tutoriel sous `src/assets/figurines/<projet>/`.
- Ne pas considérer la page comme terminée tant que le validateur Node et `npm run build` n'ont pas réussi. Le build Astro constitue la validation définitive du rendu CMS.

## Illustration de validation

L'illustration est la première production après le choix du schéma. Elle sert à faire valider le résultat visuel avant d'investir du temps dans la rédaction du tutoriel.

Des photos de référence de la figurine sont indispensables. Sans photo, ne créer ni image, ni page, ni emplacement vide : demander les photos et attendre avant de poursuivre.

Avec des photos, **REQUIRED SUB-SKILL:** utiliser `imagegen` et :

- employer les photos comme références de la sculpture et de l'équipement;
- produire une seule image montrant la même figurine en pied, de face et de dos, côte à côte;
- reproduire le schéma, les matériaux et le socle prévus;
- utiliser un éclairage neutre, un fond gris clair, sans texte ni filigrane;
- convertir la sortie du générateur avec `sharp` en JPEG progressif de qualité 88;
- enregistrer l'image dans `src/assets/figurines/<projet>/<slug>-reference.jpg` sans écraser un fichier existant;
- présenter l'image à l'utilisateur et lui demander de confirmer explicitement le schéma;
- si l'utilisateur demande un changement, mettre à jour le schéma, produire une nouvelle image sans écraser la précédente et recommencer cette validation;
- ne rédiger le tutoriel qu'après cette confirmation;
- ajouter ensuite l'image validée à la fin du chapitre `5. Socle` avec un chemin Markdown relatif.

## Vérification

Depuis la racine du dépôt, exécuter :

```bash
node .agents/skills/writing-miniature-tutorials/scripts/validate-tutorial.mjs \
  src/content/docs/figurines/<projet>/<slug>.md
npm run build
```

Avant de terminer, vérifier aussi que tous les mélanges ont des proportions, que la théorie des couleurs soutient le contraste recherché et que le tutoriel reste cohérent avec les autres pages du projet. Corriger la page jusqu'à réussite des deux commandes. Ne créer ni branche ni commit.
