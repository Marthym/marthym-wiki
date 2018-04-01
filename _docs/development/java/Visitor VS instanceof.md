---
title: "Visitor vs. InstanceOf"
category: Développement
subcategory: Java
tags: [development, java, code, visitor]
---

```java
public abstract class PartialKPIResolution {

    public final String aggregation;

    public PartialKPIResolution(String aggregation) {
        this.aggregation = aggregation;
    }

    public static PartialFlatKPIResolution flat(String aggregation, ImmutableMap<RealmAttribute, PartialFlatRealmKPIResolution> byRealm) {
        return new PartialFlatKPIResolution(aggregation, byRealm);
    }

    public static PartialSyntheticKPIResolution synthetic(Formula syntheticFormula, ApplicationPhase applicationPhase,
            String aggregation, ImmutableMap<String, String> columnAggregations,
            ImmutableMap<String, PartialFlatRealmKPIResolution> columns) {
        return new PartialSyntheticKPIResolution(syntheticFormula, applicationPhase, aggregation, columnAggregations,
                columns);
    }

    public abstract <R> R visit(Visitor<R> visitor);

    public interface Visitor<R> {
        R visitFlat(PartialFlatKPIResolution resolution);
        R visitSynthetic(PartialSyntheticKPIResolution resolution);
    }
}
```

```java
public class PartialFlatKPIResolution extends PartialKPIResolution {

    public final ImmutableMap<RealmAttribute, PartialFlatRealmKPIResolution> byRealm;

    public PartialFlatKPIResolution(String aggregation, ImmutableMap<RealmAttribute, PartialFlatRealmKPIResolution> byRealm) {
        super(aggregation);
        this.byRealm = byRealm;
    }

    @Override
    public <R> R visit(Visitor<R> visitor) {
        return visitor.visitFlat(this);
    }

}
```

```java
public final class PartialSyntheticKPIResolution extends PartialKPIResolution {

    public final Formula syntheticFormula;
    public final ApplicationPhase applicationPhase;
    public final ImmutableMap<String, String> columnAggregations;
    public final ImmutableMap<String, PartialFlatRealmKPIResolution> columns;

    public PartialSyntheticKPIResolution(Formula syntheticFormula, ApplicationPhase applicationPhase,
            String aggregation, ImmutableMap<String, String> columnAggregations,
            ImmutableMap<String, PartialFlatRealmKPIResolution> columns) {
        super(aggregation);
        this.syntheticFormula = syntheticFormula;
        this.applicationPhase = applicationPhase;
        this.columnAggregations = columnAggregations;
        this.columns = columns;
    }


    @Override
    public <R> R visit(Visitor<R> visitor) {
        return visitor.visitSynthetic(this);
    }


}
```


A la place de faire

```java

if (partialKPIResolution instanceof PartialFlatRealmKPIResolution) {
  PartialFlatKPIResolution resolution = (PartialFlatRealmKPIResolution)partialKPIResolution;
  return resolution.byRealm.get(realmAttribute);
} else {
  LOGGER.warn("Currently unsupported operation: TODO");
  throw new UnsupportedOperationException("synthetic in realm child!");
}
```
on peut faire :

```java
PartialFlatRealmKPIResolution partialFlatRealmKPIResolution = partialKPIResolution
    .visit(new Visitor<PartialFlatRealmKPIResolution>() {

        @Override
        public PartialFlatRealmKPIResolution visitFlat(PartialFlatKPIResolution resolution) {
            return resolution.byRealm.get(realmAttribute);
        }

        @Override
        public PartialFlatRealmKPIResolution visitSynthetic(
                PartialSyntheticKPIResolution resolution) {
            LOGGER.warn("Currently unsupported operation: TODO");
            throw new UnsupportedOperationException("synthetic in realm child!");
        }

    });
```

```java
PartialFlatRealmKPIResolution partialFlatRealmKPIResolution = partialKPIResolution
    .visit(new Visitor<PartialFlatRealmKPIResolution>() {

        @Override
        public PartialFlatRealmKPIResolution visitFlat(PartialFlatKPIResolution resolution) {
            return resolution.byRealm.get(realmAttribute);
        }

        @Override
        public PartialFlatRealmKPIResolution visitSynthetic(
                PartialSyntheticKPIResolution resolution) {
            LOGGER.warn("Currently unsupported operation: TODO");
            throw new UnsupportedOperationException("synthetic in realm child!");
        }

    });
```
