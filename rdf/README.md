# rdf

An RDF view of the dots graph, served over SPARQL by
[Apache Jena Fuseki](https://jena.apache.org/documentation/fuseki2/) in Docker.

```
rdf/
├── README.md
├── jena/
│   ├── Dockerfile           # Fuseki 6.2.0 on Java 21, from the Apache binary release
│   ├── docker-compose.yml   # one service, port 3030 on localhost
│   ├── config.ttl           # the "dots" dataset: in memory, loaded from turtle/
│   └── shiro.ini            # access control: open, for local use
└── turtle/
    └── dots.ttl             # the graph
```

## Run

Run these from `rdf/jena/`. You need Docker Desktop running.

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

The first build downloads Fuseki (about 50 MB). In the logs, wait for `Start Fuseki`.

| What | URL |
|---|---|
| Web UI | http://localhost:3030/ |
| SPARQL query | http://localhost:3030/dots/sparql (also `/dots/query`) |
| SPARQL update | http://localhost:3030/dots/update |
| Graph Store, read/write | http://localhost:3030/dots/data |
| Graph Store, read only | http://localhost:3030/dots/get |

**The dataset is in memory.** It is reloaded from `turtle/dots.ttl` each time the
container starts. Edit the file, then run `docker compose restart`. SPARQL updates
work, but they are lost on restart. The Turtle file is the source of truth.

## Mapping from the vault

`turtle/dots.ttl` is a hand-written slice of `dots/dot/`. It covers the food
chain, the matter chain, and one link dot.

| Frontmatter | RDF |
|---|---|
| file `dots/dot/{Name}.md` | IRI `dot:{Name}`, spaces become `_` (`http://dots.local/dot/`) |
| `class: "[[B]]"` | `rdfs:subClassOf dot:B` (transitive) |
| `type: "[[B]]"` | `rdf:type dot:B` (not transitive) |
| `wikidata__cd: Q81` | `dots:wikidata wd:Q81` |
| `description:` | `rdfs:comment` |
| `name__fr:` | `rdfs:label "…"@fr` |
| link dot (`class: "[[in]]"`, `in`, `out`) | node typed `dots:In`, with `dots:in`, `dots:out`, `dots:order`, `dots:multiplier` |

`Dot` is the root, as in the vault. Every `rdfs:subClassOf` chain ends at `dot:Dot`.

## Query

The dataset has no inference. Use property paths (`+`, `*`) to follow transitive
`class` chains.

All ancestors of Carrot, equivalent to the `class__1…8` columns in `dots.base`:

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dot:  <http://dots.local/dot/>

SELECT ?ancestor WHERE { dot:Carrot rdfs:subClassOf+ ?ancestor }
```

Every instance (`type:`), with the top-level class it belongs to:

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dot:  <http://dots.local/dot/>

SELECT ?instance ?top WHERE {
  ?instance a ?type .
  ?type rdfs:subClassOf* ?top .
  ?top  rdfs:subClassOf dot:Dot .
}
```

To run a query from the shell:

```bash
curl -s http://localhost:3030/dots/sparql \
  -H 'Accept: text/csv' \
  --data-urlencode 'query=SELECT * WHERE { ?s ?p ?o } LIMIT 10'
```

## Upgrading Fuseki

In `jena/Dockerfile`, set `JENA_VERSION` and `JENA_SHA512` together. Take the
checksum from
`https://archive.apache.org/dist/jena/binaries/apache-jena-fuseki-<version>.tar.gz.sha512`.
Maven Central's own `.sha512` file is not published for this artifact.
Then run `docker compose up -d --build`.

## Security

`shiro.ini` opens everything, including the admin API under `/$/`. This is safe
only because `docker-compose.yml` publishes the port on `127.0.0.1`. If you expose
the port more widely, first restrict `/$/**` in `shiro.ini`. The commented default
in the Fuseki distribution shows how.
