Un truc que je ne savais pas c'est qu'il est possible de faire du multi-thread avec `xargs`. C'est plutôt simple
et ça fonctionne très bien.

Par exemple dans un script qui met à jour tous les repositories git de ma machine je peux faire ça :

```bash
find -L ~ -maxdepth 5 -path "*.git" -not -path "*zprezto*" -type d 2> /dev/null | \
  xargs --max-proc=4 -n 1 -I {} bash -c "update_git_repo {}"
```
Et `xargs` me crée un pool de 4 thread pour paralléliser ma mise à jour.

Autre truc sympa avec `xargs` on peut nommer et ré-utiliser les arguments :

```bash
docker ps -aq | xargs -I_id -n1 sh -c 'docker stop _id && docker rm -v _id'
```