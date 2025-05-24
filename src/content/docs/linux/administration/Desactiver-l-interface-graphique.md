---
title: "Desactiver l’interface graphique"
category: Linux
subcategory: Administration
tags: [linux, sysadmin, graphic]
---
Pour qu'une machine Linux démarre plus vite et avec moins de RAM, si vous vous le sentez, il est possible de ne 
pas lancer l'interface graphique. Pour cela il faut modifier le fichier `/etc/default/grub`.

Remplacer la valeur de **GRUB_CMDLINE_LINUX** par **text**

```
GRUB_CMDLINE_LINUX="text"
```

Puis dans une ligne de commande root :

``` sh
update-grub
```

Redémarrer
