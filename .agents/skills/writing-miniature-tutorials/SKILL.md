---
name: writing-miniature-tutorials
description: Use when the user asks to create or update a miniature or figurine painting tutorial in this wiki, including paint recipes, project color schemes, basing, or an illustration of the expected result.
---

# Writing Miniature Painting Tutorials

Créer une page Markdown exploitable avec le matériel réel de l'utilisateur. Traiter `src/content/docs/figurines/painting-set.md` comme l'unique source d'inventaire.

## Workflow

1. Se placer à la racine qui contient `src/content/docs/figurines/painting-set.md`. Arrêter si ce fichier manque.
2. Obtenir le nom du projet et celui de la figurine. Ce sont les seules informations bloquantes. Déduire le style, la difficulté et le socle de la demande; annoncer les hypothèses utiles.
3. Lire le painting set au moment de la demande. Relever chaque couple référence/nom exact sans recopier cette liste dans le skill.
4. Lire les pages `.md` du projet dans `src/content/docs/figurines/<projet>/`. Conserver ses métaux, cuirs, socles et techniques lorsqu'ils existent. Introduire de petites variations de teinte entre figurines sans casser l'harmonie du projet.
5. Concevoir une palette fondée sur les valeurs, la température, la saturation et la relation dominante/accent. Favoriser des contrastes lisibles à distance de jeu et un rendu plus saturé que réaliste, sauf demande contraire.
6. Créer `src/content/docs/figurines/<projet>/<figurine-en-kebab-case>.md`. Employer des minuscules ASCII et des tirets pour le projet et le fichier.
7. Valider la page, corriger les erreurs, puis lancer le build.

## Produits et mélanges

- Utiliser exclusivement les peintures, encres, washes, pigments, médiums, vernis et produits de soclage présents dans le painting set.
- Autoriser l'eau et les outils usuels comme le pinceau ou la palette; ne pas les traiter comme des produits de l'inventaire.
- Écrire chaque produit, à chaque occurrence, sous la forme `**72.031 Camouflage Green**`. Ne jamais abréger le nom ni omettre la référence.
- Créer une teinte absente uniquement par un mélange de produits disponibles. Dire clairement lorsqu'aucun mélange satisfaisant n'est possible.
- Détailler chaque mélange avec des proportions en parts, une ligne par composant. Préciser la dilution, le nombre de couches et le séchage lorsqu'ils influencent le résultat.

Format d'un mélange :

```markdown
**Mélange (2:1)**

- 2 parts de **72.031 Camouflage Green**
- 1 part de **72.029 Sick Green**

Diluer avec 1 part d'eau et appliquer deux couches fines, en laissant sécher chaque couche.
```

## Format de la page

Commencer par un frontmatter avec `title` et `description`, puis ce résumé avant le premier chapitre :

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
- traiter les grandes zones avant les détails;
- éviter de revenir plusieurs fois sur une même zone;
- ajouter au bon endroit les conseils de geste, charge du pinceau, dilution, séchage et correction des erreurs;
- couvrir toutes les zones visibles de la figurine et terminer les finitions avant le socle.

## Illustration finale

Générer une illustration seulement si l'utilisateur fournit des photos de référence de la figurine. Sans photo, ne créer ni image ni emplacement vide et signaler l'omission dans la réponse finale.

Avec des photos, **REQUIRED SUB-SKILL:** utiliser `imagegen` et :

- employer les photos comme références de la sculpture et de l'équipement;
- produire une seule image montrant la même figurine en pied, de face et de dos, côte à côte;
- reproduire le schéma, les matériaux et le socle décrits dans la page;
- utiliser un éclairage neutre, un fond gris clair, sans texte ni filigrane;
- enregistrer l'image dans `src/assets/figurines/<projet>/<slug>-reference.png` sans écraser un fichier existant;
- ajouter l'image à la fin du chapitre `5. Socle` avec un chemin Markdown relatif.

## Vérification

Depuis la racine du dépôt, exécuter :

```bash
node .agents/skills/writing-miniature-tutorials/scripts/validate-tutorial.mjs \
  src/content/docs/figurines/<projet>/<slug>.md
npm run build
```

Avant de terminer, vérifier aussi que tous les mélanges ont des proportions, que la théorie des couleurs soutient le contraste recherché et que le tutoriel reste cohérent avec les autres pages du projet. Corriger la page jusqu'à réussite des deux commandes. Ne créer ni branche ni commit.
