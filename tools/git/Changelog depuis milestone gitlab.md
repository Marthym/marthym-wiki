En utilisant les Milestones dans gitlab il est possible de générer des fichiers de change log pour une version donnée.

```bash
function changelog {
    if [ $# -lt 2 ]; then
        echo -e "USAGE: $0 <project> <milestone>"
        return
    fi
    local gitlab="http://framagit.org/api/v3/"
    local projectName=${1}
    local milestone=${2}

    local projectId=`curl -s -H "PRIVATE-TOKEN: ${GITLAB_PRIVATE_TOKEN}" ${gitlab}projects/search/cosmos | jq -r '.[0].id'`

    curl -s -H "PRIVATE-TOKEN: ${GITLAB_PRIVATE_TOKEN}" ${gitlab}projects/${projectId}/issues\?milestone\=${milestone}\&state\=closed\&order_by\=updated_at | \
        jq -r '.[] | "  * #\(.iid): \(.title)"'
}
```

`GITLAB_PRIVATE_TOKEN` contient le token privé d'accès a gitlab.

<!-- tags: git, gitlab -->