Il est arrivé que l'outil de re-compilation automatique de VMPlayer ne fonctionne pas bien pour des raisons diverses.
Dans ce cas, la seule solution pour savoir ce qui ne fonctionne pas est de lancer la compilation à la main depuis une console root :

``` sh
sudo -i
cd /usr/bin
vmware-modconfig --console --install-all --icon=vmware-player --appname=VMware
```

<!-- --- tags: linux, vmware -->