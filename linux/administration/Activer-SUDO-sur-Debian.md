Pour des raisons pratique et de sécurité, il peut être intéressant d'activer SUDO. 
Sur les Ubuntu c'est le cas par défaut, pas sur les Debian. Voilà la marche à suivre pour le faire.

## Activation de SUDO

### Se connecter en administrateur

```bash
$ su -
```

### Installer le paquet
```bash
# apt-get install sudo
```

### Ajouter l'utilisateur administrateur aux sudoers
Sudo autorise des utilisateurs normaux, comme celui qui est créé lors de l'installation, 
à se connecter en tant que super utilisateur. Pour avoir ce privilège, un utilisateur 
standard doit être placé dans le group sudo.

```bash
# adduser administrateur sudo
Ajout de l'utilisateur « administrateur » au groupe « sudo »...
Ajout de l'utilisateur administrateur au groupe sudo
Fait.
```

Il faut se déconnecter de l'utilisateur administrateur pour que la modification soit effective. 
A la reconnexion testé avec la commande :

```bash
$ sudo -i
```

Il vous est alors demandé de saisir un mot de passe. C'est votre mot de passe, 
celui de administrateur et pas celui de root qu'il faut saisir !

### Désactiver l'utilisateur root
Il n'est pas possible de supprimer l'utilisateur root mais il est possible de le désactiver :

```bash
# passwd -l root
```
Il est maintenant impossible de se connecter en root autrement que via sudo.

## Éviter la saisie du mot de passe
Maintenant, quand vous faites un sudo il vous est demandé le mot de passe. Il est possible d'éviter 
d'avoir à saisir le mot de passe en procédant comme suis. C'est pas très sécurisé mais sur des 
machines qui ne risque pas grand chose, comme les VMs client, ça permet de gagner du temps.

En tant que root :
```bash
# visudo
```
Puis à la fin du fichier, ajouter la ligne :
```
username ALL=(ALL) NOPASSWD: ALL
```
en remplaçant username par le nom de l'utilisateur qui n'aura plus à renseigner le password lors 
de la commande sudo (exemple: administrateur).

<!-- --- tags: linux -->
