---
title: "Meilleures options de JVM pour IntelliJ"
category: Outils
subcategory: IntelliJ
tags: [outils, intellij]
---

Ajouter le fichier `~/.IntelliJIdea<version>/idea64.vmoptions`

```config
-server
-Xms2g
-Xmx2g
-XX:NewRatio=3
-Xss16m
-XX:ReservedCodeCacheSize=240m
-XX:+UseConcMarkSweepGC
-XX:+CMSParallelRemarkEnabled
-XX:ConcGCThreads=4
-XX:ReservedCodeCacheSize=240m
-XX:+AlwaysPreTouch
-XX:+TieredCompilation
-XX:+UseCompressedOops
-XX:SoftRefLRUPolicyMSPerMB=50
-XX:-OmitStackTraceInFastThrow
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-Djsse.enableSNIExtension=false
-Dawt.useSystemAAFontSettings=lcd
-Dsun.java2d.renderer=sun.java2d.marlin.MarlinRenderingEngine
-ea
```
