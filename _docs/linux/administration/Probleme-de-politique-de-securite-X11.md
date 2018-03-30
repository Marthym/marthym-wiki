## Symptome
Au lancement du vmware-toolbox en tant que root, on prend l'erreur :

~~~
PuTTY X11 proxy: wrong authorisation protocol attempted
~~~

## Solution
Créer un fichier `/root/.Xauthority`

``` sh
administrateur@ubuntu:~$ xauth list
ubuntu/unix:10  MIT-MAGIC-COOKIE-1  c76ff33554b56b2a749019c13a1b71c5
administrateur@ubuntu:~$ sudo -i
root@ubuntu:~# xauth add ubuntu/unix:10  MIT-MAGIC-COOKIE-1  c76ff33554b56b2a749019c13a1b71c5
xauth:  file /root/.Xauthority does not exist
```

## Truc & Astuuuuuce
Pour automatiser :

``` sh
xauth list | while read x ; do sudo xauth add $x ; done
```

<!-- --- tags: linux, security -->