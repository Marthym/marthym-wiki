<!-- --- title: GWT / Problème de sérialisation -->
Voilà plusieurs fois que je me fais avoir !

## Symptômes
Lors d'un appel RPC dans [[GWT]] on se prend un erreur de sérialisation :

~~~
com.google.gwt.user.client.rpc.SerializationException: Type 'xxx' was not included in the set of types which can be 
serialized by this SerializationPolicy or its Class object could not be loaded. For security purposes, this type will 
not be serialized.: instance = xxx@5f39ee05
~~~

Alors que la classe en question dérive bin de `Serializable` ?

## Explication
Pour qu'une classe soit considérée comme sérialisable par [[GWT]] il faut qu'elle remplisse les conditions suivantes :

* La classe doit être assignable à `IsSerializable` ou `java.io.Serializable`, directement ou indirectement en dérivant 
d'une classe qui implément une de ces interfaces..
* Tous les membres non finaux et non transitoires de la classe doivent être sérialisable.
* ''La classe possède une constructeur public par défaut (sans argument)''.

Et c'est très souvent la dernière raison qui explique le problème ...

## Liens
* http://developerlife.com/tutorials/?p=131
* http://stackoverflow.com/questions/4202964/serializationpolicy-error-when-performing-rpc-from-within-gwt-application

<!-- --- tags: gwt -->