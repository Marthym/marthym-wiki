Il y a un truc vraiment pénible avec GnomeShell et le Dock, c'est quand une application apparaît plusieurs fois. Pour
une raison X ou Y, le raccourcis d'une application n'est plus regroupé avec ses instances dans le dock ce qui fait
que l'on a rapidement tendance à ouvrir de nouvelle applications a chaque fois qu'on veut accédé à l'application.

C'est du à la `WM_CLASS` de l'application qui n'est pas configuré correctement dans le raccourcis bureau. Prennons
comme exemple chromium.

## Récupérer le WM_CLASS de l'application

Pour ça:

```bash
xprop  | grep WM_CLASS
```

Et pointer avec la croix la fenêtre de l'application ce qui devrait donner :

```
WM_CLASS(STRING) = "chromium-browser", "chromium-browser"
```

## Editer le raccourcis

Editer le fichier `~/.local/share/applications/chromium.desktop` ou/et `/usr/share/applications/chromium.desktop` puis
ajouter/remplace la ligne:

```
StartupWMClass=chromium-browser
```

Et voilà
