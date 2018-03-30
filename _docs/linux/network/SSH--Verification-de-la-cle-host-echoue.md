## Symptome

~~~
login@debian:~$ ssh server-ssh
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that the RSA host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
d7:16:94:8f:b9:e3:b0:16:3e:fc:e3:65:ba:d3:b4:1d.
Please contact your system administrator.
Add correct host key in /home/login/.ssh/known_hosts to get rid of this message.
Offending key in /home/login/.ssh/known_hosts:3
RSA host key for server-ssh has changed and you have requested strict checking.
Host key verification failed.
~~~

On peut prendre cette erreur quand on se connecte a une nouvelle VM qui a pris l'IP d'une ancienne VM à laquelle on
c'était connecté il y a longtemps. En gros, SSH dit que le serveur se présente plus avec la même clé et que c'est pas
normal.

## Résolution
La ligne intéressante c'est ça :

    Offending key in /home/login/.ssh/known_hosts:3

Il faut supprimer l'ancienne référence à l’hôte 3 dans le fichier .ssh/known_hosts

``` sh
sed -i "3 d" .ssh/known_hosts
```

<!-- --- tags: linux, security -->