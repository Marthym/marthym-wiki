Un exemple de configuration qui marche avec Metrics

~~~
input {
  file {
    path => "/var/log/lo_docker/*/monitoring.log"
    sincedb_path => "/"
  }
}

filter {
  grok {
    patterns_dir => "/data/techno/logstash/resources/patterns/"
    match => ["message","%{NOTSPACE:date}%{SPACE}%{GREEDYDATA:data}"]
    remove_field => [ "message" ]
  }
  grok {
    patterns_dir => "/data/techno/logstash/resources/patterns/"
    match => ["path","/var/log/lo_docker/%{DATA:module}/monitoring.log"]
    remove_field => [ "path" ]
  }
  kv {
    source => "data"
    field_split => ", "
    remove_field => [ "data" ]
  }
  date {
    match => [ "date", "YYYY-MM-dd'T'HH:mm:ss,SSS" ]
    remove_field => [ "date" ]
  }
  mutate {
    convert => { "count" => "integer" }
    convert => { "min" => "float" }
    convert => { "max" => "float" }
    convert => { "mean" => "float" }
    convert => { "stddev" => "float" }
    convert => { "median" => "float" }
    convert => { "p75" => "float" }
    convert => { "p95" => "float" }
    convert => { "p98" => "float" }
    convert => { "p99" => "float" }
    convert => { "p999" => "float" }
    convert => { "mean_rate" => "float" }
    convert => { "m1" => "float" }
    convert => { "m5" => "float" }
    convert => { "m15" => "float" }
  }
}

output {
  elasticsearch_http {
    codec => json_lines
    host => "elasticdb"
    index => "pmin-%{+YYYY.MM.dd}"
  }
}
~~~

Attention cependant, metrics fait déjà des agrégations temporelles comme Kibana ce qui fait que les informations 
exploitable par Kibana ne sont pas forcément pertinentes.

Le mieux étant, plutôt que d'utiliser des Metrics, faire plutôt ses propres log avec les temps d'exécution at tout ce 
qui sera bien exploité par Kibana par la suite.

<!-- --- tags: tools, logstash -->