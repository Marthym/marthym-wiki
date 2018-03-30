Il s'agit des imprimantes IP comme par exemple la Canon IR6570. Par défaut,
dans l'interface d'ajout cette possibilité n'est pas offerte (pour l'instant).
Il faudra donc passer par l'interface web de CUPS.

Normalement CUPS est installé par défaut sur les distrib Linux.

## Ajouter l'imprimante
  * Via le navigateur, se rendre à l'adresse http://localhost:631/
  * Allez dans l'onglet administration. Si il vous est demandé un login/password, ajoutez votre utilisateur au groupe lpadmin :

``` sh
usermod -a -G lpadmin monuser
```

  * Cliquez sur "Ajouter une imprimante"
  * Dans la liste choisir "Internet Printing Protocol (ipp)"
  * Pour Connexion, renseignez

``` sh
socket://ip-imprimante
```

 * puis Continuer
 * Renseignez les information sur l'imprimante
   * Sélectionnez le driver de l'imprimante, dans le cas de l'IR6570, la marque est "Canon" et le driver "Canon imageRunner 6570 Foomatic/pxlmono (recommended) (en)"
   * Afin cliquez sur "Ajouter une imprimante"

<!-- --- tags: linux -->