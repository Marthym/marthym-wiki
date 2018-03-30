
Problème de `$` en LaTeX, le caractère ne prend pas la police qu'on lui donne.

Apparement en LaTeX le dollar est codé en dur dans le code de Latex et du coup ne ressort pas toujours correctement.

https://tug.org/pipermail/xetex/2007-October/007560.html
```
You'll at least need to load the xunicode package for this to work.
Hopefully that's the only problem with your example, although you seen
to be using a slightly older version of fontspec.

The reason is that \$ is somewhat hard-coded in LaTeX (shock, I know)
and xunicode fixes it up (and many many other symbols) to use the
proper unicode code points.

Hope this helps,
Will
```