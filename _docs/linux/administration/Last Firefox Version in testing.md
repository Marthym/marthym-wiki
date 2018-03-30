Depuis un moment iceweasel est remplacé par Firefox ESR sous Debian. Par contre, les depots Debian ont une dixaine de version de retard sur les versions release de Firefox. Du coup voici comment mettre à jour Firfox simplement et de façon fiable à la dernière version en cours :

## Récupération de la clé de dépôt

```bash
wget -q -O - http://mozilla.debian.net/archive.asc | \
  sudo apt-key add -
```

## Ajout de mozilla.debian.net dans les repos apt
Pour la version RELEASE. On peut choisir BETA aussi 
```bash
cat << EOF | sudo tee /etc/apt/sources.list.d/mozilla-firefox.list
deb http://mozilla.debian.net/ jessie-backports firefox-release
EOF
```

## Assigner une priorité supérieur à ce dépôt

```bash
cat << EOF | sudo tee /etc/apt/preferences.d/mozilla-firefox
Package: *
Pin: origin mozilla.debian.net
Pin-Priority: 501
EOF
```

## Mise à jour APT

```bash
sudo apt update
```

## Vérification

```bash
$ apt-cache policy firefox
firefox:
  Installed: (none)
  Candidate: 45.0.1-1~bpo80+1
  Version table:
     45.0.1-1~bpo80+1 0
        501 http://mozilla.debian.net/ jessie-backports/firefox-release amd64 Packages
```

## Installation de la dernière version

```bash
sudo apt install firefox
```

## Liens
 * https://blog.sleeplessbeastie.eu/2016/03/21/how-to-use-recent-version-of-firefox-in-debian-jessie/
