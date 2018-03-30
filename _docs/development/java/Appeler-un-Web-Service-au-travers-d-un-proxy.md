<!-- --- title: Java / Appeler un Web-Service au travers d'un proxy -->
Pour l'instant je n'ai pas eu le cas avec Axis 1 donc on verra comment ça marche pour Axis 1, là c'est une solution Axis 2.

Donc depuis le Stub généré par Axis 2, voilà le code :

``` java
Options options = service._getServiceClient().getOptions();
HttpTransportProperties.ProxyProperties pp = 
		new HttpTransportProperties.ProxyProperties();
pp.setProxyName("proxy.tl.internal");
pp.setProxyPort(3128);
options.setProperty(HTTPConstants.PROXY,pp);
``` 

`service` étant l'instance de la classe Stub.

<!-- --- tags: java -->