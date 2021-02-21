// ---- ---- ---- ---- ---- DARK MODE ---- ---- ---- ---- ----

function changeText() {
    if (darkMode.innerHTML === "Modo Nocturno") {
        darkMode.innerHTML = "Modo Diurno";
    } else {
        darkMode.innerHTML = "Modo Nocturno";
    }
}

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 

// ---- ---- ---- ---- ---- HIDE AND SHOW ITEMS ---- ---- ---- ---- ----

function showTrendingText() {
    trendingTitle.style.display = "block";
    trendingText.style.display = "block";
};

function hideTrendingText() {
    trendingTitle.style.display = "none";
    trendingText.style.display = "none";
};

function hideSearchInactive() {
    divider.style.display = "none";
    titleSearchResult.style.display = "none";
    searchResultsGifs.style.display = "none"; 
    btnSeeMore.style.display = "none";
};

function showSearchActive() {
    divider.style.display = "block";
    titleSearchResult.style.display = "block";
    searchResultsGifs.style.display = "grid"; 
    btnSeeMore.style.display = "flex";
};

// ---- ---- ---- ---- ---- TRENDING TEXT ---- ---- ---- ---- ----

// Fetch a la trending api
function endPointTrendingGifsText() {
    fetch(`https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(json => {
        //console.log(json.data);
        trendingGifsText = json.data;
        console.log(trendingGifsText);
        changeTrendingText();
        // for (let i = 0; i < 5; i++) {
        //   console.log(trendingGifsText[i]);
        //};
    })
    .catch(error => console.error(error));
};

// Función que cambia el texto
function changeTrendingText() {
    trendingText.innerHTML = trendingGifsText[0] + ", " + trendingGifsText[1] + ", " + trendingGifsText[2] + ", " + trendingGifsText[3] + ", " + trendingGifsText[4];
  };

// ---- ---- ---- ---- ---- SEARCH TITLE ON GRID ---- ---- ---- ---- ----

function changeTitleSearchResults() {
    titleSearchResult.innerHTML = searchInput.value;
}; // no funciona el searchInput.value

