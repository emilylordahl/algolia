$(function () {
  console.log('Loaded baked potato.');
  init();
});

function init(){
  var APPLICATION_ID = "NDZ5QKFC98";
  var SEARCH_ONLY_API_KEY = "8c2d9b98bdaf5198f785847fefc2684e";
  var INDEX_ONE = "restaurants";
  var INDEX_TWO = "csv_restaurants";
  var PARAMS = {
    hitsPerPage: 3,
    maxValuesPerFacet: 8,
    index: INDEX_ONE
  };

  var algolia = algoliasearch(APPLICATION_ID, SEARCH_ONLY_API_KEY);
  var algoliaHelper = algoliasearchHelper(algolia, INDEX_ONE, PARAMS);

  // DOM Bindings
  $searchInput = $("#search-input");
  $searchInputIcon = $('#search-input-icon');
  $container = $(".container");
  $facets = $(".facet-nav");
  $stats = $(".stats");
  $hits = $(".hits");
  $pagination = $("#pagination");

  // Handlebar Template Bindings
  var $hitSource = $("#hit-template").html();
  var hitTmplte = Handlebars.compile($hitSource);
  var $statsSource = $("#stats-template").html();
  var statsTmplte = Handlebars.compile($statsSource);
  var $paginationSource = $("#pagination-template").html();
  var paginationTmplte = Handlebars.compile($paginationSource);

  // Input Event Bindings
  $searchInput.on("keyup", function(){
    var query = $(this).val();
    toggleIconEmptyInput(query);
    toggleHitsStats(query);
    algoliaHelper.setQuery(query).search();
  }).focus();

  $searchInputIcon.on("click", function(event){
    event.preventDefault();
    $searchInput.val("").keyup().focus();
  });

  function toggleIconEmptyInput(query) {
    $searchInputIcon.toggleClass("empty", query.trim() !== "");
  }

  function toggleHitsStats(query) {
    if ($searchInput.val() === "") {
      $hits.hide();
      $stats.hide();
    } else {
      $hits.show();
      $stats.show();
    }
  }

  // Results
  algoliaHelper.on("result", function(content, state) {
    renderStats(content);
    renderHits(content);
    for (var i = 0; i < content.hits.length; i++) {
      var objectID = content.hits[i].objectID;
      console.log(objectID);
    }
  });

  function renderHits(content) {
    var hitHtml = hitTmplte(content);
    $hits.html(hitHtml);
  }

  function renderStats(content) {
    var stats = {
      nbHits: content.nbHits,
      nbHits_plural: false,
      processingTimeMS: content.processingTimeMS
    };

    if ((content.nbHits !== 1)) {
      stats.nbHits_plural = true;
    }

    var statsHtml = statsTmplte(content);
    $stats.html(statsHtml);
  }

  // function renderMore(content) {
  //   console.log(content.page);
  //   var pages = [];
  //   if (content.page > 3) {
  //     pages.push({current: false, number: 1});
  //     pages.push({current: false, number: '...', disabled: true});
  //   }
  //   for (var p = content.page - 3; p < content.page + 3; ++p) {
  //     if (p < 0 || p >= content.nbPages) continue;
  //     pages.push({current: content.page === p, number: p + 1});
  //   }
  //   if (content.page + 3 < content.nbPages) {
  //     pages.push({current: false, number: '...', disabled: true});
  //     pages.push({current: false, number: content.nbPages});
  //   }
  //   var pagination = {
  //     pages: pages,
  //     prev_page: content.page > 0 ? content.page : false,
  //     next_page: content.page + 1 < content.nbPages ? content.page + 2 : false
  //   };
  //   var paginationHtml = paginationTmplte(content);
  //   $pagination.html(paginationHtml);
  // }
}
