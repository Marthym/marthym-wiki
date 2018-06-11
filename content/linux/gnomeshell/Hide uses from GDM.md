---
title: "Masquer des utilisateurs de la GDM"
category: Linux
subcategory: Gnomeshell
tags: [linux, gnome, shell, debian, gdm, admin]
---

Il est possible de faire en sorte que certains utilisateurs soient masqué de GDM, le gestionnaire de session par défaut de Gnome.

<!-- more -->

Pour cela, il faut créer un fichier du nom de l’utilisateur dans `/var/lib/AccountsService/users/`.

```bash
sudo vi /var/lib/AccountsService/users/www-devel
[User]
SystemAccount=true
```

