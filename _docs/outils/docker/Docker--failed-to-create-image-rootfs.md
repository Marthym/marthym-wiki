En voulant puller une image docker depuis le registry j'ai cette erreur quand je suis en device-mapper :

~~~
82f4a6e0947d: Error pulling image (jre7u67) from my-docker-hub/java, Driver devicemapper failed to create image rootfs 511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158: Can't set task name /
dev/mapper/docker-8:2-5637992-pool name /dev/mapper/docker-8:2-5637992-pool 
2014/11/25 15:05:47 Error pulling image (jre7u67) from my-docker-hub/java, Driver devicemapper failed to create image rootfs 511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158: Can't set task 
name /dev/mapper/docker-8:2-5637992-pool
~~~

Pour corriger :

``` sh
sudo service docker stop
sudo rm -Rf /var/lib/docker
sudo service docker start
``` 

<!-- --- tags: docker -->