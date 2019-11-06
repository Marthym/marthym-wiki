---
title: "Optimizer les performances réseau"
category: Outils
subcategory: Docker
tags: [development, docker, network]
---

## Tester les performances réseaux de ses conteneurs docker

L’idée est de comparer les performances réseau de docker.

Au final, le mode proxy est le plus couteux avec une perte de perf d’environ 50%, le mode `iptable` semble le plus avantageux car garde a souplesse de port de docker. Le mode `host` a un léger gain avec 10% d’amélioration.

### avec docker-proxy

```bash
docker run -it --rm --name=iperf3-server -p 10000:5201 networkstatic/iperf3 -s
docker inspect --format "{{ .NetworkSettings.IPAddress }}" iperf3-server
iperf3 -c 172.17.0.2 ⇒ 37gbs
iperf3 -c localhost -p 10000 
```

### désactiver docker-proxy

```bash
vi /etc/docker/daemon.json
```

```json
{
    "userland-proxy": false,
    "iptables": true
}
```

```bash
service docker restart
docker run -it --rm --name=iperf3-server -p 10000:5201 networkstatic/iperf3 -s
iperf3 -c 172.17.0.2
iperf3 -c localhost -p 10000
```

### Host networking

```bash
docker run  -it --rm --name=iperf3-server --network host  networkstatic/iperf3 -s
iperf3 -c localhost -p 5201
```