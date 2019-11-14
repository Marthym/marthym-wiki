---
title: "Supprimer le dock Ubuntu"
category: Linux
subcategory: Gnomeshell
tags: [linux, gnome, shell, ubuntu, dock]
---

Sur ubuntu, le dock d’application est fourni par une extension Gnome-Shell custom `Ubuntu Dock`. Cette dernière ne se supprime pas comme les autres. Il n’est pas possible de la supprimer via l’application `gnome-tweak-tool` ni par l’extension du navigateur.

Pour la supprimer :

```bash
cd /usr/share/gnome-shell/extensions/
sudo mv ubuntu-dock@ubuntu.com{,.bak}
```

Puis avec les touches `ALT + F2` puis `r` dans la fenêtre qui s’affiche, on relance l’interface et le dock disparait. 

On peut ensuite mettre l’extension `Dash to Dock` qui est nettement plus configurable.


A noter qu’il faut installer `chrome-gnome-shell` pour installer des extensions depuis le navigateur.

```bash
sudo apt install chrome-gnome-shell
```
