// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----
let noResultsOnSearch = document.getElementById('noResultsOnSearch');
noResultsOnSearch.style.display = "none";

// Hide, hr, trending text, grid and see more button while inactive
hideSearchInactive();

function searchResults() {
  hideAndShowElements();
  
  let inputText = document.getElementById("searchInput").value;
  let urlSearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;

  // Fetch searched term and draw results
  fetchSearchGifs(urlSearchEndpoint).then((gifs) => {
    if (gifs.length > 0) {
      console.log(gifs);
      gifsLoop(gifs);
    } else if (gifs.length === 0) {
      console.log(gifs);
      // Show search without results page
      trendingTitle.style.display = "block";
      trendingText.style.display = "block";
      noResultsOnSearch.style.display = "block";
      searchResultsGifs.style.display = "none";
      btnSeeMore.style.display = "none";
    }
  });
}

// ---- ---- ---- ---- ---- FETCH API SEARCH GIFS ---- ---- ---- ---- ----

async function fetchSearchGifs(url) {
  let response = await fetch(url);
  let content = await response.json();
  let gifs = content.data;

  return gifs;
}

// ---- ---- ---- ---- ---- DRAW SEARCH RESULTS GIFS ---- ---- ---- ---- ----

function gifsLoop(gifs) {
  for (let i = 0; i < gifs.length; i++) {
    let div = document.createElement("div");
    let img = document.createElement("img");

    img.src = gifs[i].images.downsized.url;
    img.alt = gifs[i].title;

    div.classList.add("gif-container");

    // Hover on gifs event listeners
    div.addEventListener("mouseenter", () => drawHoverGif(gifs, i, div));
    div.addEventListener("mouseleave", () => removeHoverGif(div));

    div.appendChild(img);
    searchResultsGifs.appendChild(div);
  }
}

// ---- ---- ---- ---- ---- HIDE AND SHOW ITEMS ---- ---- ---- ---- ----

function hideAndShowElements() {
  // Hide in desktop and show in mobile trending topics
  hideTrendingText();

  // Clean grid search results
  searchResultsGifs.innerHTML = "";

  // Show grid
  showSearchActive();
}

// Hide in desktop and show in mobile trending title and topics
function hideTrendingText() {
  if (window.matchMedia("(min-width: 960px)").matches) {
    /* The screen has at least 960px of width */
    trendingTitle.style.display = "none";
    trendingText.style.display = "none";
  } else {
    /* The screen has less than 960px of width */
    trendingTitle.style.display = "block";
    trendingText.style.display = "block";
  }
}

// Hide items while search is inactive
function hideSearchInactive() {
  divider.style.display = "none";
  titleSearchResult.style.display = "none";
  searchResultsGifs.style.display = "none";
  btnSeeMore.style.display = "none";
}

// Show items while search is active
function showSearchActive() {
  divider.style.display = "block";
  titleSearchResult.style.display = "block";
  searchResultsGifs.style.display = "grid";
  btnSeeMore.style.display = "flex";
}

// ---- ---- ---- ---- ---- SEARCH TITLE ON GRID ---- ---- ---- ---- ----

function changeTitleSearchResults(inputText) {
  titleSearchResult.innerHTML = inputText;
}

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -
// ---- ---- ---- ---- ---- TRENDING TEXT IN SEARCH BAR SECTION ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -

// Fetch trending topics
async function endPointTrendingGifsText() {
  let response = await fetch(
    `https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`
  );
  let trendings = await response.json();

  // Return first five elements of the array
  return trendings.data.slice(0, 5);
}

// Draw trending topics after fetched
endPointTrendingGifsText().then((trendings) => drawTrendingText(trendings));

// Draw trending topics
function drawTrendingText(trendings) {
  // Loop through trendings array
  trendings.forEach((trending, i) => {
    // Create a span for each trendig topic
    let span = document.createElement("span");
    let text = trending;

    // Add a coma after first four elements
    if (i < trendings.length - 1) text += ", ";

    span.classList.add('trending-topic');
    span.textContent = text;
    trendingText.appendChild(span);

    // When click on a topic fetch item and show results
    span.addEventListener("click", () => {
      let urlTrending = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${trending}`;
      fetchSearchGifs(urlTrending).then(gifs => {
        hideAndShowElements();

        // Draw gifs on grid
        gifsLoop(gifs);

        // Show title from search on top of grid
        changeTitleSearchResults(trending);

        //See more button: when clicked show 12 more gifs
        eventSeeMoreButton(trending);
      });
    });
  }); 
}
