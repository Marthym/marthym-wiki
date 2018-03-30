Il y a une feature intéressante sur les serveurs Nexus qui semble pas forcément très utilisé. Il est possible de créer une Repository de type `site`. Ca donne un repo qui héberge des fichiers statique et c'est pratique pour stocker par exemeple des applications ou des fichiers que l'on recupère souvent mais que l'on veut pas télécharger chaque fois depuis internet.

Pour uploader un fichier on peut utiliser la commande suivante :

```bash
curl -v -u admin:admin123 --upload-file jprofiler_linux_8_1_4.tar.gz http://<nexus_ip>/nexus/content/sites/<site_repo>/jprofiler_linux_8_1_4.tar.gz
```

<!-- - tags: nexus, java, curl, proxy, download, upload -->
