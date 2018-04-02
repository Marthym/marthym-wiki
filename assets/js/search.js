(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];

        appendString += '<a href="' + item.url + '" class="list-group-item"><h4 class="list-group-item-heading">' + item.title + '</h4>';
        appendString += '<p class="list-group-item-text"><em>' + item.content.substring(0, 200) + ' ...</em></p></a>';
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

  function handleIndexesLoaded(jsonIndex) {
	// Initalize lunr with the fields it will be searching on. I've given title
	// a boost of 10 to indicate matches on this field are more important.
	var idx = lunr(function () {
	  this.field('id');
	  this.field('title', { boost: 10 });
	  this.field('category');
	  this.field('content');

		for (var key in jsonIndex) { // Add the data to lunr
			this.add({
				'id': key,
				'title': jsonIndex[key].title,
				'category': jsonIndex[key].category,
				'content': jsonIndex[key].content
			});
		}

	});

	var results = idx.search(searchTerm); // Get lunr to perform a search
	displaySearchResults(results, jsonIndex); // We'll write this in the next section
  }

  function handleLunrLoaded() {
  	$.ajax({
	    url: '/assets/js/search.json',
	    type: 'get',
	    dataType: 'json',
	    cache: true,
	    success: handleIndexesLoaded,
	    async:true,
	});
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);
	$.getScript( "/assets/js/lunr.js", handleLunrLoaded);
  }
})();
