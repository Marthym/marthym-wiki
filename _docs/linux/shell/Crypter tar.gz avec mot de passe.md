Il est très simple de crypter un fichier tar.gz et de lui assigner un mot de passe pour par exemple
l'envoyer sur un cloud public :

``` sh
tar cz folder_to_encrypt | \
	openssl enc -aes-256-cbc -e > out.tar.gz.enc
```

Le mot de passe est alors demandé.

Pour decrypter/décompresser :
``` sh
openssl aes-256-cbc -d -in out.tar.gz.enc | tar xz
```

Et voilà