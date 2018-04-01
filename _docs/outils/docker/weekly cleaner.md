
A placer dans `/etc/cron.weekly/clean-docker` + `chmod +x ...`

```bash
docker rm -v $(docker ps -a -q)
docker rmi $(docker images | grep '^<none>' | awk '{print $3}')
docker rmi $(docker images | grep 'months ago' | awk '{print $3}')
```

Ca ve supprimer les images vieilles de plusieurs mois et celle non tagés ainsi que les conteneur associés.

<!-- - tags: docker, clean, bash -->