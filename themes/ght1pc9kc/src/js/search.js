(function () {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');

        if (results.length) { // Are there any results?
            var appendString = '';

            for (var i = 0; i < results.length; i++) {  // Iterate over the results
                var item = store[results[i].ref];
                var contentPreview = getPreview(searchTerm, item.content, 170);
                var titlePreview = item.title;


                appendString += '<a href="' + item.uri + '" class="list-group-item"><h4 class="list-group-item-heading">' + titlePreview + '</h4>';
                appendString += '<p class="list-group-item-text"><em>' + contentPreview + '</em></p></a>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<p class="list-group-item-text">Aucun résultat</p>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
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
            preview = preview.replace(new RegExp("(" + parts.join("|") + ")", "gi"), '<span class="search-term">$1</span>');
        } else {
            // Use start of content if no match found
            preview = content.substring(0, previewLength).trim() + (content.length > previewLength ? "..." : "");
        }

        return preview;
    }


    function handleIndexesLoaded(jsonIndex) {
        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        var idx = lunr(function () {
            this.field('id');
            this.field('title', {boost: 10});
            this.field('tags');
            this.field('category');
            this.field('content');

            for (var key in jsonIndex) { // Add the data to lunr
                if (jsonIndex.hasOwnProperty(key)) {
                    this.add({
                        'id': key,
                        'title': jsonIndex[key].title,
                        'category': jsonIndex[key].category,
                        'tags': jsonIndex[key].tags,
                        'content': jsonIndex[key].content
                    });
                }
            }

        });

        var results = idx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, jsonIndex); // We'll write this in the next section
    }

    function handleLunrLoaded() {
        $.ajax({
            url: '/index.json',
            type: 'get',
            dataType: 'json',
            cache: true,
            success: handleIndexesLoaded,
            async: true
        });
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);
        $.getScript("/js/lunr.js", handleLunrLoaded);
    }
})();
