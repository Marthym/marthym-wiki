Il est possible de pousser (push) des modifs de repo git dans plusieurs repo origin à la fois. Dans le cas où on veut
un repo backup ou je sais pas quoi du genre. Pour cela il suffit d'ajouter une pushurl avec la commande suivante :

```sh
git remote set-url --add --push origin git://original/repo.git
git remote set-url --add --push origin git://another/repo.git
```

Attention, il faut vraiment ajouter les deux url de repos, celle par défaut et l'autre. La pushurl surcharge l'url du
depot par défaut dans si on ne met que la nouvelle URL on ne poussera plus vers le repo d'origine.

On voit le résultat avec

```sh
git remote -v
origin  git@git.original.com:original/myproject.git (fetch)
origin  git@another.org:another/myproject.git (push)
origin  git@git.original.com:original/myproject.git (push)
```

## Liens
* https://stackoverflow.com/questions/14290113/git-pushing-code-to-two-remotes

<!-- --- tags: git -->
