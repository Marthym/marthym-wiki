Un truc très sympa, Gnome-Shell intégre un outils de screencast. En effet, il suffit de faire `Ctrl + Shift + Alt + R`
pour démarrer et arréter l'enregistrement. A la fin de l'enregistrement, le fichier résultat est déposé dans le répertoire
Vidéos de l'utilisateur. Le format d'enregistrement est WebM.

Par défaut, la durée maximum d'enregistrement est de 30s, au dela l'enregistrement s'arrête de lui même. Pour changer
cette durée max, il est possible de mettre à jour les settings :

``` sh
gsettings set org.gnome.settings-daemon.plugins.media-keys max-screencast-length 120
```
La nouvelle durée sera donc de 2mn. Pour vérifier la durée max :
``` sh
gsettings get org.gnome.settings-daemon.plugins.media-keys max-screencast-length
```

<!-- --- tags: linux, gnomeshell -->