---
title: "Stopper une VM sur le serveur en ligne de commande"
category: Outils
subcategory: VMWare
tags: [outils, vmware]
---
En tant que root :
``` sh
vmrun -T server -h https://localhost:8333/sdk -u root -p <passroot> stop "[standard] Win2003Srv/CameleonEdge.vmx"
```
Note : `vmrun` permet de faire pas mal de truc sur les VMs d'un serveur, `vmrun -?` donne des exemples.
