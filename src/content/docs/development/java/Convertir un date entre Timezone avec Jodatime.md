---
title: "Convertir un date entre Timezone avec Jodatime"
category: Développement
subcategory: Java
tags: [development, java, date, timezone]
---

:::caution[Obsolète]
:::

``` java
DateTime initialTime = new DateTime(timestamp.getTime())
        .withZoneRetainFields(vpnNeType.getTimeZone().get())
        .withZone(targetTimeZone);
dataDate = initialTime.toLocalDateTime().toDate();
```

Le `new Datetime()` crée un object Datetime à partir d'un timestamp mais en partant du principe que la TZ est la default.
`withZoneRetainFields` change la TZ sans changer la date, `withZone` change la TZ et converti la date.
`.toLocalDateTime().toDate()` re-converti en date en tenant compte de la TZ.
