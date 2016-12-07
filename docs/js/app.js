$(function () {
  console.log('Loaded baked potato.');
  init();
});

function init(){
  var APPLICATION_ID = "NDZ5QKFC98";
  var SEARCH_ONLY_API_KEY = "8c2d9b98bdaf5198f785847fefc2684e";
  var INDEX_ONE = "restaurant_data";
  var PARAMS = {
    hitsPerPage: 9,
    maxValuesPerFacet: 5,
    facets: ['food_type', 'stars_count', 'payment_options'],
    aroundLatLngViaIP: true,
    index: INDEX_ONE
  };
  var FACETS_ORDER_OF_DISPLAY = ["food_type", "stars_count", "payment_options"]
  var FACETS_LABELS = {
    food_type: "Cuisine/Food Type",
    stars_count: "Rating",
    payment_options: "Payment Options"
  }

  var algolia = algoliasearch(APPLICATION_ID, SEARCH_ONLY_API_KEY);
  var algoliaHelper = algoliasearchHelper(algolia, INDEX_ONE, PARAMS);

  // DOM Bindings
  $searchInput = $("#search-input");
  $searchInputIcon = $('#search-input-icon');
  $container = $(".container");
  $facets = $("#facets");
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
  var $facetsSource = $("#facets-template").html();
  var facetsTmplte = Handlebars.compile($facetsSource);

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
    renderStarsCount(content);
    renderFacets(content, state);
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


  function renderStarsCount(content){
    var $starsCount = $(".stars-count");
    for (var i = 0; i < content.hits.length; i++) {
      var starsCount = parseInt(content.hits[i].stars_count);
      if (starsCount === 0) {
        $starsCount.removeClass().addClass("zero-stars").addClass("stars-count");
      } else if (starsCount === 1) {
        $starsCount.removeClass().addClass("one-star").addClass("stars-count");
      } else if (starsCount === 2) {
        $starsCount.removeClass().addClass("two-stars").addClass("stars-count");
      } else if (starsCount === 3) {
        $starsCount.removeClass().addClass("three-stars").addClass("stars-count");
      } else if (starsCount === 4) {
        $starsCount.removeClass().addClass("four-stars").addClass("stars-count");
      } else if (starsCount === 5) {
        $starsCount.removeClass().addClass("five-stars").addClass("stars-count");
      }
    }
  }

  function renderFacets(content, state) {
    var facetsHtml = "";
    var facetsArr = ["food_type", "stars_count", "payment_options"];
    for (var i = 0; i < facetsArr.length; i++) {
      var facetName = facetsArr[i];
      var facetResult = content.getFacetByName(facetName);
      var facetContent = {};
      if (facetResult) {
        facetContent = {
          facet: facetName,
          title: FACETS_LABELS[facetName],
          values: content.getFacetValues(facetName, {sortBy: ["isRefined:desc", "count:desc"]})
        };
        facetsHtml += facetsTmplte(facetContent);
      }
      $facets.html(facetsHtml);
    }
  }

  // Not working...
  $(document).on("click", ".toggle-refine", function(e) {
    e.preventDefault();
    algoliaHelper.toggleRefine($(this).data('facet'), $(this).data('value')).search();
  });
}
