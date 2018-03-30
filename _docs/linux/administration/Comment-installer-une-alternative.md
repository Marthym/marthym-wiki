Sous Debian il y a un outil pas mal qui permet de switcher entre plusieurs versions 
d'un même exécutable, c'est `update-alternatives`. Pour installer une nouvelle alternative, 
de java par exemple :

~~~ bash
sudo update-alternatives --install /usr/bin/javac javac /opt/java/jdk1.7.0_51/bin/javac 100
~~~

Pour lister les alternatives de java :

~~~ bash
update-alternatives --list java
~~~

Pour configurer une alternative à java :

~~~ bash
sudo update-alternatives --config java
~~~

<!-- --- tags: linux -->
