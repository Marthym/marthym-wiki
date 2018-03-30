A placer dans `~/.m2/settings.xml`
 
``` xml
<settings>
    <mirrors> <!-- Ajout du repos Nexus local -->
        <mirror>
            <!--This sends everything else to /public -->
            <id>nexus</id>
            <mirrorOf>*</mirrorOf>
            <url>http://nexus.mydomain.org/nexus/content/groups/public/</url>
        </mirror>
    </mirrors>
    <profiles>
        <profile>
            <id>nexus</id>
            <repositories>
                <repository>
                    <id>nexus</id>
                    <url>http://nexus.mydomain.org/nexus/content/groups/public/</url>
                    <releases> <enabled>true</enabled> </releases>
                    <snapshots> <enabled>true</enabled> </snapshots>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>nexus</id>
                    <url>http://nexus.mydomain.org/nexus/content/groups/public/</url>
                    <releases> <enabled>true</enabled> </releases>
                    <snapshots> <enabled>true</enabled> </snapshots>
                </pluginRepository>
            </pluginRepositories>
        </profile>
        <profile><!-- Ajout des infos pour sonar -->
            <id>sonar</id>
            <properties>
                <!-- SONAR-->
                <sonar.jdbc.url>jdbc:mysql://mysql.mydomain.org:3306/_sonar?useUnicode=true&amp;characterEncoding=utf8</sonar.jdbc.url>
                <sonar.jdbc.username>sonar</sonar.jdbc.username>
                <sonar.jdbc.password>sonar</sonar.jdbc.password>
                <sonar.host.url>http://mysql.mydomain.org:9090</sonar.host.url>
            </properties>
        </profile>
    </profiles>
    <servers>
        <server>
            <id>nexus</id>
            <username>deployment</username>
            <password>deploy</password>
        </server>
    </servers>
    <activeProfiles>
        <!--make the profile active all the time -->
        <activeProfile>nexus</activeProfile>
    </activeProfiles>
</settings>
```

<!-- --- tags: maven, java, dev -->