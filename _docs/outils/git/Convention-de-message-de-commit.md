>The contens of this page are partly based on the [angular commit messages document](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit?pli=1).


## Objectif

Le message de commit est ce qui décrit votre contribution.
C'est pourquoi le but est de décrire ce que le commit apporte au projet;

L'entête __doit__ être aussi explicite que possible car elle est toujours lu avec les autres message de commit.

Le corps __doit__ fournir les informations nécessaires pour ceux qui souhaitent comprendre le commit.

Le pied __peut__ contenir des références à des documents externes (incidents résolut, ...) aussi bien que des notes sur les changements structurels.

Cela s'applique __à tout les type de projet__.


## Format

### Forme courte (uniquement la ligne de sujet)

~~~
<type>(<scope>): <subject>
~~~

### Forme longue (avec le corps)

~~~
<type>(<scope>): <subject>

<BLANK LINE>

<body>

<BLANK LINE>

<footer>
~~~

La première ligne de doit pas dépasser les __70 caractères__. La ligne suivante est toujours une ligne blanche et les 
lignes suivante doivent se limiter à __80 caractères__! Cela rend le message plus facile à lire sur github comme sur la 
plus part des autres outils git.

## Ligne de sujet

Le sujet contient une description succincte des changements.

### `<type>` autorisé

 * feat (fonctionnalité)
 * fix (correction de bug)
 * docs (documentation)
 * style (formatage, oublie divers, ...)
 * refactor
 * test (lors d'ajout de test manquant)
 * chore (maintenance)
 * improve (amélioration)

### `<scope>` autorisé

Le scope peut spécifier l'emplacement des changements du commit. Par exemple dans 
le [camunda-modeler project](https://github.com/camunda/camunda-modeler) cela peut être "import", "export", "label", ...

### Texte du `<subject>`

 * Utiliser l'impératif présent: _change_ et pas _changed_ ou _changes_ ou _changing_
 * Ne pas mettre la première lettre en majuscule
 * ne pas mettre de '.' à la fin

## Corps du message

* Comme pour le sujet, utiliser l'impératif présent
* Ajoutez les motivations du changement et comparez avec la version précédente

## Pied du message

### Changements "cassant"

Tous les changement cassants doivent être mentionné dans le pied avec la description du changement, la justification et 
la procédure de migration.

>BREAKING CHANGE: Id editing feature temporarily removed
>
>As a work around, change the id in XML using replace all or friends

### Incidents référencés

Bug fermé / feature requests / problèmes doivent être listé sur une ligne séparé dans le pied préfixé du mot clé 
"Closes" comme :

>   Closes #234

or in case of multiple issues:

>  Closes #123, #245, #992

## Plus sur les bonnes pratiques de commit

 * http://365git.tumblr.com/post/3308646748/writing-git-commit-messages 
 * http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

## FAQ pour les Geeks
**Pourquoi utiliser l'impératif présent dans les messages ?**<br/>
Faire de log de commit plus lisible. Voyez le travail que vous faite pendant le commit comme un travail sur le un 
problème dont le commit en est la solution. Maintenant comment le commit est une solution au problème.

_Exemple:_ Vous écrivez un test pour la fonction #foo. Vous commitez le test. Vous utilisez le message de commit _add 
test for #foo_. Pourquoi ? Car c'est ce que le commit résout.

**Comment caractériser les commit qui résultent directement d'un merge ?**<br/>
Utilisez `chore(merge): <what>`.

**Je veux commiter un micro-changement, que dois je faire ?**<br/>
Demandez vous pourquoi c'est un micro-changement. Utilisez feat = _docs_, _style_ or _chore_ selon le changement. SVP 
regarder la prochaine question si vous commiter un travail en cours.

**Je veux committer un travail en cours. Que dois je faire?**<br/>
Ne le faite pas ou faite le sur une branche non publique (pas sur develop ni sur master).

Quand vous avez finir le travail committer avec un message cohérent et poussez sur la branche publique.

<!-- --- tags: git -->