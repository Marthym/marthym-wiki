---
title: "Accéder un membre classe private"
category: Développement
subcategory: Java
tags: [development, java, reflection]
---
Pour des raisons de test, on peut avoir besoin d'accéder des membres de classe privé pour tester leur contenu. 
Il est possible de faire ça sans forcément ajouter des accesseurs "juste pour les tests" sur le classe testé.

<!-- more -->

``` java
public static <T> Object getPrivateMember(T testObject, String fieldName) {
	try {
		Field field = testObject.getClass().getDeclaredField(fieldName);
		field.setAccessible(true);
		return field.get(testObject);
	} catch (Exception e) {
		throw new RuntimeException(e);
	}
}
```

Et à l’usage :

``` java
List<TableDaoBuffer> bufferDAO = (List<TableDaoBuffer>) getPrivateMember(vpnResponseTimePacketPush, "bufferDAO");
```

Où `bufferDAO` est le nom de la variable private.

Remarque : Il est aussi possible de les setter.
