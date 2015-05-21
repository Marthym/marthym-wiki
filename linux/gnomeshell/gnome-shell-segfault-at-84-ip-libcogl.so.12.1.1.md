## Symptome
GnomeShell ne se lance pas, un message "Oh no! Something has gone wrong" à la place. Et dans les logs :

~~~
hp kernel: [34946.429046] gnome-shell[10202]: segfault at 84 ip 00007ffa2ae877b9 sp 00007fff2bc5c7d0 error 4 in libcogl.so.12.1.1[7ffa2ae3e000+97000]
~~~

## Remède

``` sh
sudo apt-get install --reinstall libgdk-pixbuf2.0-0 libgdk-pixbuf2.0-common
```

## Liens
* http://forums.debian.net/viewtopic.php?f=5&t=78716&p=523535&hilit=libcogl#p523535

<!-- --- tags: linux -->