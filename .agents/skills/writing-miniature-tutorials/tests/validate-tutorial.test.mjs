import assert from 'node:assert/strict';
import test from 'node:test';

import { parsePaintingSet, validateTutorial } from '../scripts/validate-tutorial.mjs';

const paintingSet = `
| Ref.   | Nom          |
| ------ | ------------ |
| 72.051 | Black        |
| 72.155 | Carbon Grey  |
| 72.651 | Metal Medium |
`;

const validTutorial = `---
title: Armure noire
---

# Armure noire

- **Style recherché :** jeu contrasté
- **Couleurs dominantes :** noir et gris
- **Couleurs d'accent :** aucune
- **Niveau de difficulté :** intermédiaire
- **Temps estimé :** 2 heures

## 1. Bases

Poser deux couches fines de **72.051 Black**.

## 2. Ombrage

Conserver **72.051 Black** dans les creux.

## 3. Éclaircissements

Mélanger :

- 2 parts de **72.051 Black**
- 1 part de **72.155 Carbon Grey**

## 4. Finitions

Corriger les débordements avec **72.051 Black**.

## 5. Socle

Peindre la tranche avec **72.051 Black**.
`;

test('accepte un tutoriel conforme', () => {
    const paints = parsePaintingSet(paintingSet);

    assert.deepEqual(validateTutorial(validTutorial, paints), []);
});

test('refuse une référence inconnue ou un nom inexact', () => {
    const paints = parsePaintingSet(paintingSet);
    const tutorial = validTutorial.replace('**72.155 Carbon Grey**', '**72.999 Carbon Gray**');

    assert.match(validateTutorial(tutorial, paints).join('\n'), /72\.999/);
});

test('refuse une peinture connue écrite sans sa référence', () => {
    const paints = parsePaintingSet(paintingSet);
    const tutorial = validTutorial.replace('**72.155 Carbon Grey**', 'Carbon Grey');

    assert.match(validateTutorial(tutorial, paints).join('\n'), /Carbon Grey/);
});

test('refuse une structure de chapitres différente', () => {
    const paints = parsePaintingSet(paintingSet);
    const tutorial = validTutorial.replace('## 4. Finitions', '## 4. Détails');

    assert.match(validateTutorial(tutorial, paints).join('\n'), /chapitres/);
});
