---
title: "Possible missing firmware"
category: Linux
subcategory: Administration
tags: [linux, sysadmin, apt, firmware]
---

## Symptomes

A chaque mise à jour via a apt, on a un floppée de message 

```
W: Possible missing firmware /lib/firmware/i915/skl_dmc_ver1_27.bin for module i915                      
W: Possible missing firmware /lib/firmware/nvidia/gp104/sec2/sig.bin for module nouveau
....
```

## Solution

Il manque un package a installer

```
apt install firmware-misc-nonfree
```

Ca va supprimer la plus pars des messages. Mais il va possiblement rester les messages `i915`. C’est plus compliqué à gérer.

Il faut se rendre sur [git.kernel.org](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/i915), télécharger les fichiers qu’il manque et les copier dans le répertoire où ils sont sensé se trouver.

Après ça, plus de message !
