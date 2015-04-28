<!-- --- title: Java / Lancer Neo4j Impermanent Database + REST Server sur un port aléatoire -->
Pour des tests par exemple, vu que la licence Neo4j ne permet que l'utilisation des API REST, on peut avoir besoin
lors de test de lancer un server éphémaire sur lequel brancher les jeux de test. Cela se fait en deux étapes :
 * Lancement du serveur neo4j
 * Lancement de la surcouche REST


```java
db = new TestGraphDatabaseFactory().newImpermanentDatabase();

boolean available = db.isAvailable(5000);
assert available;

int start = -1;
Random random = new Random();
while (start != 0) {
    port = RANDOM_PORTS_LOWER_BOUND + random.nextInt(RANDOM_PORTS_COUNT);
    try {
        GraphDatabaseAPI api = (GraphDatabaseAPI) db;
        ServerConfigurator config = new ServerConfigurator(api);
        config.configuration().addProperty(Configurator.WEBSERVER_ADDRESS_PROPERTY_KEY, NEO4J_EMBEDDED_HOST);
        config.configuration().addProperty(Configurator.WEBSERVER_PORT_PROPERTY_KEY, port);
        config.configuration().addProperty("dbms.security.auth_enabled", false);
        neoServerBootstrapper = new WrappingNeoServerBootstrapper(api, config);
        start = neoServerBootstrapper.start();
    } catch (Exception e) {
        fail("Unable to start neo4j test server !", e);
    }
}

this.graphFile = graphFile;
this.client = new Neo4jRestClient(NEO4J_EMBEDDED_HOST, port, NEO4J_EMBEDDED_PROTOCOL);
```
Il est a noter que les classes utilisées pour lancer le serveur REST sont dépréciés et sont sencés disparaitres 
prochainement. Cela dit dans la derbière version testé (2.0.0) les classes sont toujours là et aucune solution 
alternative n'existe...

<!-- --- tags: java, neo4j -->