## Symptômes

J'ai rencontré l'erreur suivante :

    java.io.IOException: java.sql.SQLException: Could not retrieve transation read-only status server
    Caused by: java.sql.SQLException: Could not retrieve transation read-only status server
    Caused by: java.sql.SQLException: REPLACE INTO `db`.`test_table` (`timestamp`,`database`,`table`,`columns`,`lines`,`before`,`write`,`wait`) VALUES (?,?,?,?,?,?,?,?)
            ... 4 common frames omitted
    Caused by: java.sql.SQLException: Could not retrieve transation read-only status server
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:1086) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:989) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:975) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:920) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:951) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:941) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.isReadOnly(ConnectionImpl.java:3955) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.isReadOnly(ConnectionImpl.java:3926) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.PreparedStatement.executeBatch(PreparedStatement.java:1430) ~[mysql-connector-java-5.1.28.jar:na]
            at com.zaxxer.hikari.proxy.StatementProxy.executeBatch(StatementProxy.java:116) ~[HikariCP-java6-2.3.2.jar:na]
            at com.zaxxer.hikari.proxy.PreparedStatementJavassistProxy.executeBatch(PreparedStatementJavassistProxy.java) ~[HikariCP-java6-2.3.2.jar:na]
            ... 3 common frames omitted
    Caused by: com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: Could not create connection to database server. Attempted reconnect 3 times. Giving up.
            at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method) ~[na:1.8.0_51]
            at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62) ~[na:1.8.0_51]
            at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45) ~[na:1.8.0_51]
            at java.lang.reflect.Constructor.newInstance(Constructor.java:422) ~[na:1.8.0_51]
            at com.mysql.jdbc.Util.handleNewInstance(Util.java:411) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.Util.getInstance(Util.java:386) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:1015) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:989) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:975) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:920) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.connectWithRetries(ConnectionImpl.java:2395) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.createNewIO(ConnectionImpl.java:2316) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2807) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2768) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.StatementImpl.executeQuery(StatementImpl.java:1651) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.isReadOnly(ConnectionImpl.java:3949) ~[mysql-connector-java-5.1.28.jar:na]
            ... 8 common frames omitted
    Caused by: java.sql.SQLException: No database selected
            at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:1086) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:4237) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:4169) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2617) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2778) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2819) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.setCatalog(ConnectionImpl.java:5443) ~[mysql-connector-java-5.1.28.jar:na]
            at com.mysql.jdbc.ConnectionImpl.connectWithRetries(ConnectionImpl.java:2368) ~[mysql-connector-java-5.1.28.jar:na]
            ... 13 common frames omitted

Au fil de la stacktrace on voit tout un tas de root cause la dernière étant `No database selected`. Mais toute ces
ne sont que la conséquence de quelque chose de plus grave. Il m'est aussi arrivé d'avoir :

    Caused by: java.sql.SQLException: Streaming result set com.mysql.jdbc.RowDataDynamic@62f3413a is still active.
                No statements may be issued when any streaming result sets are open and in use on a given connection.
                Ensure that you have called .close() on any active streaming result sets before attempting more queries.

Alors que toutes les connections sont systématiquement rendu au pool !

## Solution

Plusieurs solutions m'ont été proposées mais seulement des solutions pour les problèmes visibles dans les stacktraces.
Le résultat c'est qu'il n'y a plus d'erreurs visible mais l'exécution est bloqué en attente d'on ne sait quoi.

La source réelle du problème est une option de performance dans le driver JDBC :

```java
config.addDataSourceProperty("cachePrepStmts", "true");
config.addDataSourceProperty("prepStmtCacheSize", "250");
config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
config.addDataSourceProperty("useServerPrepStmts", "true");
```

J'utilise HikariCP mais c'est valable pour tout les gestionnaires de pool. L'option `useServerPrepStmts` est sencé
améliorer les performance en cachant les PrepareStatement coté serveur. Mais MySQL 5.6 réagit mal a cette option . Les
statement se ferment mal. Du coup supprimer cette option résoud le problème.

<!-- --- tags: mysql, jdbc, java -->
