---
title: "Pas de son et sortie fictive"
category: Linux
subcategory: Administration
tags: [linux, sysadmin, sound, dell]
---

Depuis le Kernel 5, les drivers son subissent de profonds remaniements avec [SoC](https://www.kernel.org/doc/html/latest/sound/soc/overview.html) qui va venir remplacer les drivers hda existant. Sauf que c’est pas toujours bien fonctionnel avec tous les matériels et notamment sur les Dell, le son ne fonctionne pas. Pour régler le souci ajouter un fichier `/etc/modprobe.d/alsa.conf` avec les lignes suivantes :

```
options snd-intel-dspcfg dsp_driver=1
options snd-hda-intel dmic_detect=0
```

Attention, il est nécessaire de redémarrer la machine après