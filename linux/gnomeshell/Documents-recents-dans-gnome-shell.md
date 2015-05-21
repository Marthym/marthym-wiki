Pour les dernières versions de gnome, on peut retrouver le fichier d'historique à l'emplacement 
suivant: `~/.local/share/recently-used.xbel`, pour les versions antérieures il se trouve à `~/.recently-used.xbel`.

## Effacer l'intégralité du fichier 
Dans un terminal, taper :

``` sh
cat /dev/null > ~/.local/share/recently-used.xbel
```
Puis relancer gnome-shell (`Alt+F2`, puis r)

## Passer en mode "privé"

Pour désactiver l'enregistrement des documents récents:
Dans un terminal, taper :

``` sh
sudo chattr +i ~/.local/share/recently-used.xbel
```

Pour réactiver l'enregistrement des documents récents:
Dans un terminal, taper : 

``` sh
sudo chattr -i ~/.local/share/recently-used.xbel
```

Le script suivant vous permettra de basculer dans un mode ou dans l'autre:

``` sh
#!/bin/bash
# Bloquer les écritures dans .recently-used.xbel (documents récents du gnome-shell)
# Attention au répertoire : version ancienne de gnome : ~/.recently-used.xbel
# A adapter selon le chemin au fichier
fichier="/<chemin>/<d'accès>/<au>/.local/share/recently-used.xbel"

if [ $USER = root ]
    then echo "Vous êtes root"
else
    echo "Vous n'êtes pas root, execution du script en sudo"
    gksu $0
    exit
fi

attribut=` sudo lsattr "$fichier"| cut -d'-' -f5 ` &&

if [ "$attribut" == "i" ] ; then
zenity --question --text="Gnome est en mode  confidentiel, voulez-vous quitter ce mode ?" && sudo chattr -i "$fichier" && zenity --info --text=" <b><span color=\"red\"> Gnome n'est plus en mode confidentiel </span></b> " || exit

else
zenity --question --text="<b><span color=\"red\"> Gnome n'est pas en mode confidentiel </span></b>, voulez-vous l'activer ?" && sudo chattr +i "$fichier" && zenity --info --text="Gnome est maintenant en mode <b><span color=\"red\"> confidentiel </span></b>" || exit
fi

exit
```

<!-- --- tags: linux, gnome -->