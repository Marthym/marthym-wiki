---
title: "Install Crowdsec sous Debian avec Docker"
category: Outils
tags: [outils, crowdsec, security]
---

```shell
curl -s https://packagecloud.io/install/repositories/crowdsec/crowdsec/script.deb.sh | sudo bash

sudo apt update
sudo apt install crowdsec crowdsec-firewall-bouncer-iptables
```

Dans `/etc/crowdsec/bouncers/crowdsec-firewall-bouncer.yaml`

```shell
iptables_chains:
- INPUT
#  - FORWARD
- DOCKER-USER
```

```shell
sudo systemctl reload crowdsec
sudo cscli collections list
sudo cscli alerts list
sudo cscli bouncers list
cscli decisions delete --ip X.X.X.X
cscli decisions add --ip X.X.X.X
cscli decisions add --ip X.X.X.X --duration 24h
sudo cscli dashboard setup --listen 0.0.0.0
```

## Liens
  * https://www.it-connect.fr/comment-proteger-son-serveur-linux-des-attaques-avec-crowdsec/
  * https://discourse.crowdsec.net/t/iptables-bouncer-and-other-rule-precedence/798
