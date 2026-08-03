# AGENTS.md

## Périmètre

Ce dépôt contient un wiki personnel construit avec Astro et Starlight. Les pages se trouvent dans `src/content/docs/`.

Pour une demande de rédaction ou de modification de contenu :

- modifier uniquement les pages concernées dans `src/content/docs/` ;
- ne pas modifier la configuration Astro, les composants, les dépendances ou la CI sans demande explicite ;
- ne pas réorganiser ou moderniser les anciennes pages hors du périmètre demandé.

## Rédaction

- Écrire en français, sauf pour les termes techniques, commandes et citations qui doivent rester dans leur langue d’origine.
- Conserver le ton de notes personnelles du wiki. Corriger les fautes gênantes sans transformer le texte en documentation institutionnelle.
- Ne pas inventer de faits, de commandes, de résultats ou de sources. Signaler les informations incertaines plutôt que de les présenter comme certaines.
- Respecter la structure et le niveau de détail des pages voisines.
- Garder les changements ciblés. Ne pas reformater toute une page pour une correction locale.

## Pages Markdown et MDX

- Utiliser `.md` pour le contenu Markdown ordinaire.
- Utiliser `.mdx` uniquement lorsqu’une page a besoin d’un composant Astro ou Starlight déjà présent dans le dépôt.
- Ajouter un frontmatter YAML délimité par `---` avec au minimum un champ `title`.
- Reprendre les champs supplémentaires d’une page voisine lorsqu’ils sont utiles. Ne pas ajouter de métadonnées spéculatives.
- Placer une nouvelle page dans la catégorie existante qui correspond à son sujet. La route publique découle de son chemin dans `src/content/docs/`.
- Employer des liens relatifs pour les autres pages du wiki. Vérifier les ancres et les chemins modifiés.
- Conserver tels quels les commandes, extraits de configuration et messages d’erreur dans des blocs de code avec une langue lorsque celle-ci est connue.
- Placer les images importées par Astro dans `src/assets/`. Utiliser `public/` seulement lorsqu’une URL statique absolue est nécessaire.

## Vérification

- Relire le rendu Markdown : titres, listes, tableaux, liens, images et blocs de code.
- Lancer `npm run build` depuis la racine du dépôt après toute modification de contenu.
- Si le build ne peut pas être exécuté, indiquer clairement pourquoi et ce qui reste à vérifier.

## Git

- Ne créer ni branche ni commit.
- Ne pas annuler ou modifier les changements existants qui ne concernent pas la demande.
