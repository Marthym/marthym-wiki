(function () {
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1),
            vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");

            if (pair[0] === variable) {
                return pair[1];
            }
        }
    }

    function getPreview(query, content, previewLength) {
        previewLength = previewLength || (content.length * 2);

        var parts = query.split(" "),
            match = content.toLowerCase().indexOf(query.toLowerCase()),
            matchLength = query.length,
            preview;

        // Find a relevant location in content
        for (var i = 0; i < parts.length; i++) {
            if (match >= 0) {
                break;
            }

            match = content.toLowerCase().indexOf(parts[i].toLowerCase());
            matchLength = parts[i].length;
        }

        // Create preview
        if (match >= 0) {
            var start = match - (previewLength / 2),
                end = start > 0 ? match + matchLength + (previewLength / 2) : previewLength;

            preview = content.substring(start, end).trim();

            if (start > 0) {
                preview = "..." + preview;
            }

            if (end < content.length) {
                preview = preview + "...";
            }

            // Highlight query parts
            preview = preview.replace(new RegExp("(" + parts.join("|") + ")", "gi"), "<strong>$1</strong>");
        } else {
            // Use start of content if no match found
            preview = content.substring(0, previewLength).trim() + (content.length > previewLength ? "..." : "");
        }

        return preview;
    }

    function displaySearchResults(results, query) {
        console.log(results);

        var searchResultsEl = document.getElementById("search-results"),
            searchProcessEl = document.getElementById("search-process");

        if (results.length) {
            var resultsHTML = "";
            results.forEach(function (result) {
                var item = findPageFromRef(result.ref),
                    contentPreview = getPreview(query, item.content, 170),
                    titlePreview = getPreview(query, item.title);

                resultsHTML += "<li><h5><a href='" + item.uri.trim() + "'>" + titlePreview + "</a></h5><p class='result-breadcrumb'>"+ item.breadcrumb +"</p><p class='result-content'>" + contentPreview + "</p></li>";
            });

            searchResultsEl.innerHTML = resultsHTML;
            searchProcessEl.style.display = "none";
        } else {
            searchResultsEl.style.display = "none";
            searchProcessEl.innerText = "Aucun resultat";
        }
    }

    function loadPageData() {
        if (!endsWith(baseurl,"/")){
            baseurl = baseurl+'/'
        };

        // First retrieve the index file
        return $.getJSON(baseurl +"index.json")
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.error("Error getting Hugo index file:", err);
            });
    }

    function createLunrIndex(data) {
        
        // Set up lunrjs by declaring the fields we use
        // Also provide their boost level for the ranking
        var lunrIndex = new lunr.Index
        lunrIndex.ref("uri");
        lunrIndex.field('title', {
            boost: 15
        });
        lunrIndex.field('tags', {
            boost: 10
        });
        lunrIndex.field("content", {
            boost: 5
        });

        // Feed lunr with each file and let lunr actually index them
        data.forEach(function(page) {
            lunrIndex.add(page);
        });
        lunrIndex.pipeline.remove(lunrIndex.stemmer);

        return lunrIndex;
    }

    function findPageFromRef(ref) {
        return window.data.filter(function(page) {
            return page.uri === ref;
        })[0];
    }

    function init() {
        loadPageData()
        .done(function(data) {
            window.data = data; 
            window.index = createLunrIndex(data);

            $("h1").html("Recherche <span id='search-query'></span>");

            var query = decodeURIComponent((getQueryVariable("q") || "").replace(/\+/g, "%20")),
            searchQueryEl = document.getElementById("search-query"),
            searchInputEl = document.getElementById("search-by");

            searchInputEl.value = query;
            searchQueryEl.innerText = query;

            displaySearchResults(window.index.search(query), query); 
        });
    }
    init();
})();