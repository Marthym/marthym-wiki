---
title: Devoxx 2023
category: Développement
date: 2023-04-15
tags: [development, java, devoxx]
---


## Des tuyaux sur les pipelines

* Ramener la qualimetrie vers le début du build
* Mettre en cache dans les builds une journée suffit généralement.
  **Penser à mettre une durée sur les caches pipeline**
* Test d’application mobile : Appium
* Outils de test de charge
    * [Gatling](https://gatling.io/)
    * [hey](https://github.com/rakyll/hey)
    * [ab](https://httpd.apache.org/docs/2.4/programs/ab.html)
* Scan de vulnérabilité, chercher DAST sur OWASP
  * [Vulnerability Scanning Tools](https://owasp.org/www-community/Vulnerability_Scanning_Tools)
* Établir les SBOM pour des raisons qualité et sécurité
  * [Syft](https://github.com/anchore/syft)
  * [OWASP Cyclone DX](https://cyclonedx.org/)
  * Format standard SPDX
* Déplacer des images d’un registry à l’autre
  * [Crane](https://michaelsauter.github.io/crane/index.html)
  * [Skopeo](https://github.com/containers/skopeo)
* Contruire une image depuis un container
  * [Kaniko](https://github.com/GoogleContainerTools/kaniko)
* Analyse des dépendances
  * [Dependabot](https://github.com/dependabot/dependabot-core)
  * [Renovate](https://docs.renovatebot.com/)
* Staging correspond lexicalement aux stages de testing
* GitOps = git est la source de vérité
* Modèle Expand / Contract pour gérer les rollback de données en prod
* SAST / DAST / Secrets / Dependency / Licenses
  * [Semgrep](https://github.com/returntocorp/semgrep)
  * [Gitleaks](https://github.com/gitleaks/gitleaks)
* Containers Scanning / Operational Scanning
  * [trivy](https://github.com/aquasecurity/trivy)
  * [Clair](https://github.com/quay/clair)
* Publier les tests dans gitlab

## NodeJS : patterns et outils pour partir en production sereinement

* 4 Go de ram par defaut, ajouter ’max_old_space_size’ pour changer
* On peut faire des pools de worker thread avec [piscina](https://github.com/piscinajs/piscina)
* Node [clinic.js](https://clinicjs.org/) pour analyser les problèmes de perfs
* Pour tester express : [supertest](https://github.com/ladjs/supertest)
* Pour gérer les problèmes de rejected unhandle error : [express-promise-router](https://github.com/express-promise-router/express-promise-router)
* [zod](https://zod.dev/) permet la validation de schéma json
* Il est bon de mettre des timeout sur les fetch
    ```js
    const url = "https://path_to_large_file.mp4";

    try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const result = await res.blob();
    // …
    } catch (err) {
    if (err.name === "TimeoutError") {
        console.error("Timeout: It took more than 5 seconds to get the result!");
    } else if (err.name === "AbortError") {
        console.error(
        "Fetch aborted by user action (browser stop button, closing tab, etc."
        );
    } else if (err.name === "TypeError") {
        console.error("AbortSignal.timeout() method is not supported");
    } else {
        // A network error, or some other problem.
        console.error(`Error: type: ${err.name}, message: ${err.message}`);
    }
    }
    ```
    https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
* [Cockatiel](https://github.com/connor4312/cockatiel) est une lib qui permet d’implémenter un circuit breaker ou un bulkhead facilement

## Playwright : l'outil qui va révolutionner les tests end-to-end

* [Playwright](https://playwright.dev/) by Microsoft
* Hérité de Puppeteer
* Un Codegen et un UI mode pratique et sympa
* Utiliser des locator getByRole (cf [Testing Library](https://testing-library.com/))
* Playwright dispose d'un système d'auto wait qui évite de configurer des timeout partout pour attendre le chargement de page.
* Il est possible d'utiliser des nested locator.
* Il est possible générer des traces visualisables dans l'UI mode.
* Intégré avec Cucumber
* La comunauté n'est pas immense et surtou en anglais

## Alice au pays d'OpenTelemetry

* [OpenTelemetry](https://opentelemetry.io/).
* Full compatible avec Prometheus pour import et export.
* Il faut utiliser la [distribution avec les addon](https://github.com/open-telemetry/opentelemetry-collector-contrib) pas juste la distrib core.
* Il faut penser à définir les resources correctement
* [Tempo](https://grafana.com/oss/tempo/) de Grafana Lab pour stocker les traces
* [Loki](https://grafana.com/oss/loki/) pour les logs. Manifestement compliqué à mettre en place le gars n'est pas arrivé à faire ce qu'il voulait
* Faire un mapping des status http vers le level des logs
  * warn: 5xx
  * error: 4xx
  * info: 3xx
  * debug: 2xx
