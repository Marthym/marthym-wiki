---
title: "Comment savoir si un serveur est utilisé"
category: Linux
subcategory: Administration
tags: [linux, tcpdump]
---

```shell
tcpdump -n -t -i eth1 port 53 and dst host 10.135.0.7
```
