---
title: "pkg: repository meta has wrong version 2"
category: Linux
subcategory: FreeNAS
tags: [linux, freenas, jail, bsd, pkg]
---

Quand une jail prend de l'age, lors d’un upgrade du FreeNAS hôte par exemple, il peut arrivé que l’on se retrouve face à l’erreur suivante :

```shell
# pkg update
pkg: repository meta has wrong version 2                                                                 
pkg: Repository FreeBSD load error: meta cannot be loaded No error: 0                                    
Unable to open created repository FreeBSD                                                                
Unable to update repository FreeBSD                                                                      
Error updating repositories!                                                                             
```

Pour régler ça, déjà vérifier que la Jail est à jour et [faire un upgrade]({{% relref "upgrade-jail.md" %}}) si nécessaire. Ensuite :

```shell
pkg remove -f pkg  # forcefully remove pkg
pkg bootstrap -f  # reinstall pkg

# `-f` is a MUST, otherwise next `pkg install` will fail due to `package not found`
pkg update -f 
```
