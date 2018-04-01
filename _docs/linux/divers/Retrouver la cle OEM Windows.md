---
title: "Retrouver la cle OEM Windows"
category: Linux
subcategory: Divers
tags: [linux, misc, bash, windows, license, oem]
---
Les PC vendu avec Windows OEM ont un numéro de license associé au matériel dirrectement. La plus part du temps il est collé sur
le PC mais pas toujours. Du coup si on enlève Windows pour installer Linux sans prendre le temps de noter la clé, il peut être
compliqué de le retrouver plustard si on veut réinstaller Windows, pour revendre par exemple.

Mais la clé OEM est souvent inscrite directement dans la carte mère et est récupérable depuis Linux via la commande suivante :

``` bash
sudo tail -c+57 /sys/firmware/acpi/tables/MSDM
```
