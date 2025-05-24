---
title: "SSH expecting SSH2_MSG_KEX_ECDH_REPLY"
category: Linux
subcategory: Réseau
tags: [linux, network, ssh, git]
---

Je suis pas arrivé a savoir si c’était un bug ou pas. Une fois connecté en VPN (WireGuard) si je tente d’accéder à une des machines de mon réseau, j’ai le problème suivant:

```
...
debug2: compression ctos: none,zlib@openssh.com                                                          
debug2: compression stoc: none,zlib@openssh.com                                                          
debug2: languages ctos:                                                                                  
debug2: languages stoc:                                                                                  
debug2: first_kex_follows 0                                                                              
debug2: reserved 0                                                                                       
debug1: kex: algorithm: curve25519-sha256                                                                
debug1: kex: host key algorithm: ecdsa-sha2-nistp256                                                    
debug1: kex: server->client cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none      
debug1: kex: client->server cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none      
debug3: send packet: type 30                                                                             
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
```

Deux solutions sont données sur internet :

Déclarer le Ciphers explicitement dans le `.ssh/config`

```
Host server.reseau.com
    Ciphers aes256-ctr
    MACs hmac-md5,hmac-sha1
    SendEnv LANG LC_*
    HashKnownHosts yes
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials no
    HostKeyAlgorithms ssh-rsa,ssh-dss
```

Cette solution fonctionne bien pour les connexions SSH et pour le git pull. Par contre, les git push ne se terminent pas. Ils restent a attendre.

La deuxième solution est de descendre le MTU de l’interface VPN:

```shell
sudo ip li set mtu 1200 dev wg0
```

Cette solution fonctionne.