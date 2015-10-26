Après une mise à jour du système, au démarrage de mon container docker je prend l'erreur suivante :

`Error response from daemon: Cannot start container {id}:
[8] System error: open /sys/fs/cgroup/cpu,cpuacct/init.scope/system.slice/docker-{id}.scope/cpu.shares: no such file or directory
`

C'est apparement lié a un bug Debian : https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=798778

Il est possible de palier en ajoutant `--exec-opt native.cgroupdriver=cgroupfs` dans `/etc/default/docker`.

## Liens

 * https://stackoverflow.com/questions/32845917/system-error-on-docker-run
