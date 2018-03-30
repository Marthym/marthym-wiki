<!-- --- title: RSync / Download fichier via SSH avec reprise -->

La plus part du temps on utilise SCP mais sur des fichiers de taille conséquente, il est pratique de pouvoir reprendre le téléchargement si la connexion a été rompue ou autres. RSync permet de faire ça.

```
rsync --partial --progress --rsh=ssh user@1.1.1.1:/home/user/database.tar.gz database.tar.gz
```
