<!-- --- title: Java / Connexion LDAP Exchange -->
L'idée est d'expliquer comment, depuis Java, se connecter à un serveur LDAP. Mais pas n'importe lequel, un serveur
LDAP Exchange. Ben oui, Microsoft à beau se standardisé un minimum, de là à faire tout comme les autres, faudrait pas
pousser !

## Implémentation via JNDI
Plusieurs type d'implémentation existent pour se connecter à un serveur LDAP. La plus utilisé et la plus "standard" est
de se connecter en utilisant les interfaces JNDI. C'est donc là dessus qu'on va se pencher.

## Création du tableau de paramètres
La première chose à faire c'est donc, comme pour un accès JNDI normal, de créer le table de paramètres. Mais dans notre
cas, on va avoir quelques nouveau paramètres concernant le LDAP.

``` java
Hashtable<String, String> env = new Hashtable<String, String>();
env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL, "ldap://centrale.springfield.com:389");

// Authenticate as user@ldapDomain and password password
env.put(Context.SECURITY_AUTHENTICATION, "simple");
env.put(Context.SECURITY_PRINCIPAL, "hsimpson@springfield");
env.put(Context.SECURITY_CREDENTIALS, password);
```

**SECURITY_AUTHENTICATION** : Il s'agit de spécifier le mécanisme d'authentification. Trois sont possible (none, simple,
sasl_mech). None est pour une authentification anonyme et sasl est pour une authentification par certificat (si j'ai
bien compris). Dans notre cas, c'est simple qui nous intéresse puisqu'il s'agit de s'authentifier par utilisateur et
mot de passe.

**SECURITY_PRINCIPAL** : C'est ici que l'on spécifie l'utilisateur à connecter. Et c'est là aussi que ça va varier
entre Microsoft et le reste du monde.<br/>
Pour un LDAP classique (type [[https://www.opends.org/]]) le user ressemble un peu à ça : "uid=hsimpson, ou=people, o=springfield".<br/>
Mais chez Microsoft, le user DOIT être écrit sous la forme : "hsimpson@springfield" et pas autrement.

**SECURITY_CREDENTIALS** : C'est le mot de passe de l'utilisateur, rien de compliqué ici.

## Création du contexte initial
Donc une fois les paramètres renseigné, on va créer le contexte initial; C'est cette création qui va permettre de
déterminer si les le couple utilisateur/mot de passe est valide ou non.

``` java
// Create the initial context
try {
   ctx = new InitialDirContext(env);
   LOGGER.debug("User "+user+" logged in LDAP ...");

} catch (AuthenticationException e) {
   LOGGER.debug("User and password for "+user+" invalid !");
}
```

Si on passe cette étape, l'utilisateur et le mot de passe sont valide. En cas d'authentification incorrecte, une erreur
AuthenticationException est levée.

## Récupération des informations du compte
Voilà, maintenant qu'on sait que l'utilisateur est valable, on pourrait avoir envie de récupérer des informations sur
cet utilisateur afin de pouvoir le créer dans l'application que l'on intègre (CCS pour ne pas la citer) ou pour
synchroniser les données de cet utilisateur.

Pour cela, on va utiliser la fonction find :

``` java
SearchControls constraints = new SearchControls();
constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);
String[] attrIDs = {
      "distinguishedName",
      "sn",
      "givenname",
      "mail",
      "telephonenumber"
};
constraints.setReturningAttributes(attrIDs);

NamingEnumeration<SearchResult> answer = ctx.search(ldapRootContext, "sAMAccountName="+ user, constraints);

if (!answer.hasMore()) {
   LOGGER.warn("No user informations found in LDAP for "+user);
   if (!userExist)
      throw new LdapLoginException("Cannot create user in CCS whitout LDAP informations !");
   }

   Attributes attrs = ((SearchResult) answer.next()).getAttributes();
   if (LOGGER.isDebugEnabled()) {
      LOGGER.debug(attrs.get("distinguishedName"));
      LOGGER.debug(attrs.get("givenname"));
      LOGGER.debug(attrs.get("sn"));
      LOGGER.debug(attrs.get("mail"));
      LOGGER.debug(attrs.get("telephonenumber"));
   }
}
```

C'est encore une particularité de Microsoft, sur un serveur LDAP normal, la recherche ne se fait pas avec ces paramètres
là. sAMAccountName représente l'uid chez Microsoft en fait.

Après, de ce que j'ai peu lire, chaque LDAP est différent et on peut y mettre un peu tout et n'importe quoi !
Donc faut toujours plus ou moins s'adapter au LDAP que l'on utilise. Voici un liste non exhaustive des attributs
standard que l'on retrouve en général dans un LDAP :
<table>
<tr><th>o</th><td>Organization (Société)</td></tr>
<tr><th>ou</th><td>Organizational unit (Service)</td></tr>
<tr><th>cn</th><td>Common name (Nom courant genre "John Smith)</td></tr>
<tr><th>sn</th><td>Surname (Nom de famille)</td></tr>
<tr><th>givenname</th><td>First name (Prénom)</td></tr>
<tr><th>uid</th><td>Userid (Chez Microsoft c'est un numéro)</td></tr>
<tr><th>dn</th><td>Distinguished name (Nom LDAP avec tout les groupes)</td></tr>
<tr><th>mail</th><td>Email address (Adresse mail)</td></tr>
</table>

### Conclusion
Voilà, arrivé ici, c'est plus trop compliqué, à partir de ces infos on peut créer ou mettre à jour un utilisateur de
notre appli.

Gardez quand même en tête que le code ci-dessus permet de se connecter au serveur Exchange de Cameleon Software mais
qu'il peut y avoir besoin de quelques ré-ajustement pour un autre serveur LDAP.

## Liens
Quelques liens qui m'ont bien aidé, surtout le premier qui se trouve être le seul bout de code que j'ai trouvé qui
fonctionne sur un serveur Exchange !

  * [[http://www.myhomepageindia.com/index.php/2009/09/24/retrieve-basic-user-attributes-from-active-directory-using-ldap-in-java.html]]
  * [[http://download.oracle.com/javase/tutorial/jndi/ldap/index.html]]
  * [[http://www.javaworld.com/javaworld/jw-03-2000/jw-0324-ldap.html]]

<!-- --- tags: java -->
