<!-- --- title: Java / Ajouter un certificat pour les connexions SSL Java -->
## Symptôme
Dans le cas par exemple d'une connexion en LDAPS (LDAP via SSL) on a de bonne chance de se prendre ce genre d'erreur :

~~~
javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
    at com.sun.net.ssl.internal.ssl.Alerts.getSSLException(Alerts.java:150)
    at com.sun.net.ssl.internal.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1584)
    at com.sun.net.ssl.internal.ssl.Handshaker.fatalSE(Handshaker.java:174)
    at com.sun.net.ssl.internal.ssl.Handshaker.fatalSE(Handshaker.java:168)
    at com.sun.net.ssl.internal.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:848)
    at com.sun.net.ssl.internal.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:106)
    at com.sun.net.ssl.internal.ssl.Handshaker.processLoop(Handshaker.java:495)
    at com.sun.net.ssl.internal.ssl.Handshaker.process_record(Handshaker.java:433)
    ...
~~~

_Note que c'est la même pour les accès à des Web-Service en HTTPS via Axis_

## Explication
Cette erreur vient du fait que le client n'accepte pas le certificat du serveur. Les histoires des certificats sont 
manifestement un poil compliqué mais bon, grosso modo, il faut ajouter le certif du serveur à la politique sécurité 
du client.

Sachant qu'on parle du JRE utilisé par le serveur JBoss !

## Solution 1
Solution "manuelle", testé chez La Poste et GMC. Les exemples donner sont sous Linux mais ça fonctionne de la même façon 
sous Windows (j'ai testé). La commande keytool est dans les binaire de java. Sous Windows elle est peut-être pas dans 
le classpath.

En tant que ''root'', exécuter la commande :

``` sh
keytool -importcert -keystore "/usr/lib/jvm/java-6-sun/jre/lib/security/jssecacerts" -trustcacerts -alias "nom.dusitequipublielecertif.fr" -file mon-certificat.cer
``` 

_Attention le chemin de le JRE est pas toujours le même ! Sous linux pour le connaître facilement taper:_

``` sh
update-alternatives --list java</code>
``` 

C'est évident mais on sait jamais, s'il y a plusieurs JRE sur le serveur, il faut exécuter sur celle qu'utilise JBoss !!

La commande keytool devrait donner un truc du genre, le mot de passe est **changeit**

~~~
Tapez le mot de passe du Keystore :  
Ressaisissez le nouveau mot de passe : 
Propriétaire : CN=A10.blabla.test, L=PARIS, C=FR
Émetteur : CN=A10.blabla.test, L=PARIS, C=FR
Numéro de série : 9397247ec5cf9e4f
Valide du : Tue Jul 27 01:23:59 CEST 2010 au : Thu Jul 26 01:23:59 CEST 2012
Empreintes du certificat :
	 MD5 :  27:73:2E:FF:8F:AB:3A:2D:1F:47:42:A5:97:49:CF:74
	 SHA1 : 31:83:A1:FB:AE:69:91:F3:14:BF:5C:A8:67:2A:FD:CA:83:A6:5B:9A
	 Nom de l'algorithme de signature : MD5withRSA
	 Version : 4
Faire confiance à ce certificat ? [non] :  oui
Certificat ajouté au Keystore
~~~

Après les appels https sur le serveur dont vous venez d'enregistrer le certificat devrait passer tout seul :p

## Solution 2
Donc le truc à faire c'est d'aller récupérer la classe `InstallCert.java` de la compiler puis de l'exécuter avec en 
paramètre le serveur que vous voulez accéder en SSL :

``` sh
javac -g InstallCert.java
java InstallCert your-ldap-server.somewhere.edu:636
cp jssecacerts $JAVA_HOME/lib/security
``` 

En gros, on compile et on execute. Ca va créer un ~KeyStore dans "jssecacerts" et y placer le certificat de votre 
serveur. Après, pour que le client appelé depuis Cameleon soit capable de retrouver ce certificat, il faut le placer 
dans le ~KeyStore par défaut de la JRE utilisé par le serveur Cameleon.

Je vous invite vivement à vérifier le ~JAVA_HOME dans le .bat ou .sh de lancement de JBoss. Une fois que vous êtes sur 
du JAVA_HOME, le ~KeyStore par défaut est dans ~JAVA_HOME/lib/security. Vous y recopiez le contenu de "jssecacerts".

On redémarre le JBoss et hop ça fonctionne normalement !

## Liens
Par ordre d'intérêt :

  * http://blogs.sun.com/andreas/entry/no_more_unable_to_find
  * http://www.google.com/support/forum/p/Google%20Apps/thread?tid=0b9d3f130628f63b&hl=en
  * http://www.forumeasy.com/forums/archive/ldappro/200707/p118350434574.html

<!-- --- tags: crypto, java, security -->