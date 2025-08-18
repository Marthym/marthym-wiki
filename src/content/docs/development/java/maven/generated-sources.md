---
title: "Generated Sources"
category: Développement
subcategory: Java
tags: [development, java, maven]
---

Les `generated-sources` sont les sources générées par la compilation de votre projet. Cela peut être généré par des annotations processeurs ou des plugins maven par exemple. Pour éviter la confusion, on les place, par convention, dans `target/generated-sources`. Par défaut, Maven ne tient pas compte de ce répertoire, mais les plugins récents (pas trop vieux) s'occupent de rajouter leur répertoire d'output dans les listes des sources.

Si on prend comme exemple les annotations processeurs, lombok par exemple :

```diff lang="xml"
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>${maven-compiler-plugin.version}</version>
    <configuration>
        <release>${java.version}</release>
        <parameters>true</parameters>
-       <generatedSourcesDirectory>target/generated-sources</generatedSourcesDirectory>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

Ici le `maven-compiler-plugin` ajoute automatiquement `target/generated-sources` dans les sources. Et donc les classes générées par lombok seront prises en compte dans la compilation.

:::caution
Néanmoins, c'est un exemple à ne pas suivre. Il n'est pas bon de mettre les classes générées directement à la racine de `generated-sources`, car si plusieurs plugins sont utilisés, il est probable que certains supprimer le répertoire et le recrée au moment de générer les classes. Ce qui rend les plugins qui ont précédé inexistant.

Dans le cas de `maven-compiler-plugin` la doc explique que la valeur par défaut de `generatedSourcesDirectory` est `target/generated-sources/annotations`. Le mieux sera donc de **laisser la valeur par défaut**.
:::


## Multiples générateurs

Dans le cas où plusieurs sources génèrent du code dans `generated-sources` il est donc important de s'assurer que toutes génèrent dans des sous-répertoires dédiés. Si on ajoute au cas précédent un plugin `jooq-codegen-maven` qui génère des classes en fonction de la base de données :

```xml {8,51}
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>${maven-compiler-plugin.version}</version>
    <configuration>
        <release>${java.version}</release>
        <parameters>true</parameters>
        <!--<generatedSourcesDirectory>target/generated-sources/annotations</generatedSourcesDirectory> optionel -->
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
<plugin>
    <groupId>org.jooq</groupId>
    <artifactId>jooq-codegen-maven</artifactId>
    <executions>
        <execution>
            <id>jooq-codegen-projects</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <logging>WARN</logging>
                <jdbc>
                    <driver>${db.driver}</driver>
                    <url>${db.url}</url>
                    <user>${db.username}</user>
                    <password>${db.password}</password>
                </jdbc>
                <generator>
                    <database>
                        <name>org.jooq.meta.h2.H2Database</name>
                        <includes>.*</includes>
                        <excludes>flyway_schema_history</excludes>
                        <outputSchemaToDefault>false</outputSchemaToDefault>
                        <inputSchema>public</inputSchema>
                    </database>
                    <generate>
                        <generatedAnnotation>true</generatedAnnotation>
                        <records>true</records>
                        <fluentSetters>true</fluentSetters>
                    </generate>
                    <target>
                        <packageName>com.hardcoded.project.infra.dsl</packageName>
                        <directory>${project.build.directory}/generated-sources/jooq</directory>
                    </target>
                </generator>
            </configuration>
        </execution>
    </executions>
</plugin>
```

Chacun des deux plugins à ainsi le loisir de gérer le cycle de ses fichiers sans interférer avec les autres plugins. Maven est mis au courant par chacun des plugins qu'il doit tenir compte de leurs sources respectives et **IntelliJ gère ça très bien aussi**.
