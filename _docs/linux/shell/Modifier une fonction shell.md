
Dans le cas d'une fonction dont on ne possède pas la paternité, on veux pouvoir profiter des mises à jour de la fonction
mais sont état ne nous convient pas totalement. Par exemple la fonction suivante est pratique mais elle rejoue des tests
qui, pour mon cas à moi, sont vraiment long et que je veux pouvoir skiper.

```sh
mvnwatch () {
        if [ "$#" -eq 0 ]
        then
                WISDOM_DEV_SERVER=/home/lo/workspace/longback/wisdom-dev-server
                ASSDIR=${WISDOM_DEV_SERVER}/target/wisdom/application/${PWD##*/}
        else
                local ASSDIR=$1
        fi
        echo $ASSDIR
        wisdom-dev-update ${PWD##*/}
        ~/applications/maven/bin/mvn io.lambdacube.maven:watch-maven-plugin:1.2:watch -DrefreshURL='http://localhost:9100/osgi/refresh/?b=' -DdestDirectory="${ASSDIR}"
}
```

Pour continuer à bénéficier des modifications, je ne veux pas surcharger la fonction. Je vais donc seulement la modifier.
Je met donc la commande suivante qui va rechercher la ligne correspondant à `maven` et qui va ajouter à la fin l'option
`-DskipTests`.

```sh
eval $(declare -f mvnwatch | sed '/maven:/ s/$/ -DskipTests/' | sed 's/$/;/')
```

* `declare -f` affiche le contenu de la fonction en question
* `sed '/maven:/ s/$/ -DskipTests/'` Recherche la ligne contenant ***maven*** et ajoute ***-DskipTests*** à la fin
* `sed 's/$/;/'` Remplace les sauts de ligne par des '***;***', les CR n'étant pas interprété par `eval`.
