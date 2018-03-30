Le serveur ESXi ne dispose pas d'accès HTML pour administrer les VMs, donc plus d'accès depuis un navigateur. L'utilisation des VMs se fait par un
client lourd ou en accès console via VMPlayer ou VMRC.

_**REMARQUE** Apparemment sous Windows ça ne fonctionne pas._


## Ouvrir une Remote Console
Là ya pas de feinte dans Firefox, dans tout les cas, il n'est pas possible d'ouvrir une console depuis le navigateur.
Par contre, il est possible de le faire depuis VMPlayer 3. C'est une option caché mais qui fonctionne (avec la version 3, pas avec les versions précédentes).

Si vous appelez la commande

``` sh
vmplayer -h
```

Cela ouvre VMPlayer avec une boite de connexion dans laquelle vous pouvez saisir l'adresse et le port du serveur de VM ainsi que les identifiants pour
s'y connecter.

Le mieux est de se faire un raccourcis comme suit :

``` sh
vmplayer -h atlantis.tl.internal -u <loggin> -p <password>
```

Cela vous ouvre directement la liste des VMs disponible sur le serveur.

Et en rajoutant l'option **-M** à la ligne de commande, vous pouvez faire un raccourcis directement sur une VM particulière :

``` sh
vmplayer -h atlantis.tl.internal -u <loggin> -p <password> -M <idVM>
```

Sous Linux, si vous prenez un message d'erreur de transfert de données, essayez de lancer la commande avec ''root''.

## Liens
  * http://planetvm.net/blog/?p=1316

<!-- --- tags: linux, vmware -->