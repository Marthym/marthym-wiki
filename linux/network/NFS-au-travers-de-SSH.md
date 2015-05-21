Faire passer du NFS au travers du SSH n'est pas si simple que ça. Il faut :

## Pré-requis
Vérifier que le server SSH autorise l'IP Forwarding

## Configuration du client SSH
Il faut faire une redirection de port. Pour ça, soit la ligne de commande :
``` sh
ssh login@server-ssh -p 2222 -L 3049:server-nfs:2049 -L 3045:server-nfs:627 -N -f
```
Le **-N** permet de ne pas proposer l'invite de commande, le **-f** lance le process SSH en background.

soit on le fait par ssh_config :
```
Host SSH-SERVER-MAISON
        HostName server-ssh
        User login
        Port 2222
        LocalForward 3049 server-nfs:2049
        LocalForward 3045 server-nfs:627
```

## Configuration server SSH
Coté du SSH, il faut vérifier que les ports soient correctement ouvert. Pour ouvrir un port coté SSH :
``` sh
iptables -A OUTPUT -p tcp --dport 627 -j ACCEPT
iptables -A INPUT -p tcp --dport 627 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 2049 -j ACCEPT
iptables -A INPUT -p tcp --dport 2049 -j ACCEPT
```

## Ouverture du partage
Une fois que tout est fait, il suffit d'ouvrir la connexion SSH. Puis de monter le partage NFS avec la commande suivante:
``` sh
mount -t nfs -o tcp,mountport=3045,port=3049 localhost:/mnt/videos /mnt/nfs-videos
```

Et normalement un `ll /mnt/nfs-videos` vous donne le contenu de votre partage.

## Les problèmes
### channel 5: open failed: connect failed: Connection refused
Par ce qu'il y en a toujours ... Le cas que j'ai eu c'est un message d'erreur dans la console SSH :
```
channel 5: open failed: connect failed: Connection refused
```
Le tout se répétant à l'infinie. Ce message vient très probalement d'un port qui n'est pas ouvert sur le firewall. Le ports nécessaire pour le NFS sont
2049 et 627. Mais ça dépend du serveur NFS parfois c'est le 802 à la place du 627, ... bref ! Pour connaître le bon port il faut faire un `rcpinfo -d` 
mais dans mon cas (sur un serveur FreeNAS, j'ai pas trouvé la commande. Du coup un solution est d'aller sur le serveur SSH et de faire le montage avec
l'option `-vvv` en plus. On voit dessuite le port qui ne parviens pas a franchir firewall :
```
root@server-ssh:/mnt# mount -t nfs -vvv -o nolock,tcp server-nfs:/mnt/videos videos/
mount.nfs: timeout set for Sat Apr  4 22:29:55 2015
mount.nfs: trying text-based options 'nolock,tcp,vers=4,addr=server-nfs,clientaddr=server-ssh'
mount.nfs: mount(2): Protocol not supported
mount.nfs: trying text-based options 'nolock,tcp,addr=server-nfs'
mount.nfs: prog 100003, trying vers=3, prot=6
mount.nfs: trying server-nfs prog 100003 vers 3 prot TCP port 2049
mount.nfs: prog 100005, trying vers=3, prot=6
mount.nfs: trying server-nfs prog 100005 vers 3 prot TCP port 627
```
Une fois le bon port identifié, il suffit de faire les ajustement sur la redirection et sur le firewall.

### rpc.statd is not running
Ici on a le message suivant :
```
mount.nfs: rpc.statd is not running but is required for remote locking.
mount.nfs: Either use '-o nolock' to keep locks local, or start statd.
mount.nfs: an incorrect mount option was specified
```
Plus facile tout est dans le message il suffit de rajouter l'option `nolock`

<!-- --- tags: linux, network -->
