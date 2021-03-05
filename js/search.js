// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 

// Hide, hr, trending text, grid and see more button while inactive
hideSearchInactive();

btnSearch.addEventListener("click", ev => {
    ev.preventDefault();
    searchResults();
});

function searchResults() {
    hideTrendingText();
    
    // Clean grid search results
    searchResultsGifs.innerHTML = '';

    showSearchActive();

    let inputText = document.getElementById("searchInput").value;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${inputText}`;

    fetchSearchGifs(url);

    changeTitleSearchResults(inputText);

    // Save input value in local storage and erase it from input
    localStorage.setItem('inputValue', JSON.stringify(inputText));
    document.querySelector("#searchInput").value = "";
}

// ---- ---- ---- ---- ---- FETCH API SEARCH GIFS ---- ---- ---- ---- ----

function fetchSearchGifs(url) {
    fetch(url)
      .then(response => response.json())
      .then(content => {
        let gifs = content.data;
        gifsLoop(gifs);
      })
      .catch(err => {
        console.error(err);
      });
}

// ---- ---- ---- ---- ---- SEARCH RESULTS GIFS FOR LOOP ---- ---- ---- ---- ----

function gifsLoop(gifs) {
    for (let i = 0; i < gifs.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");

        img.src = gifs[i].images.original.url;
        img.alt = gifs[i].title;

        div.classList.add('gif-container');

        div.addEventListener('mouseenter', () => drawHoverGif(gifs, i, div));
        div.addEventListener('mouseleave', () => removeHoverGif(div));
        
        div.appendChild(img);
        searchResultsGifs.appendChild(div);
    }
}

// ---- ---- ---- ---- ---- HIDE AND SHOW ITEMS ---- ---- ---- ---- ----

function showTrendingText() {
    trendingTitle.style.display = "block";
    trendingText.style.display = "block";
};

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
    btnSeeMore.addEventListener('click', changeOffset);
};

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -
// ---- ---- ---- ---- ---- TRENDING TEXT IN SEARCH BAR SECTION ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -

endPointTrendingGifsText();

// Fetch trending api
function endPointTrendingGifsText() {
    fetch(`https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(json => {
        trendingGifsText = json.data;
        changeTrendingText();
    })
    .catch(error => console.error(error));
};

// Change trending text 
function changeTrendingText() {
    trendingText.innerHTML = trendingGifsText[0] + ", " + trendingGifsText[1] + ", " + trendingGifsText[2] + ", " + trendingGifsText[3] + ", " + trendingGifsText[4];
  };

// ---- ---- ---- ---- ---- SEARCH TITLE ON GRID ---- ---- ---- ---- ----

function changeTitleSearchResults(inputText) {
    titleSearchResult.innerHTML = inputText;
};

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- SEE MORE BUTTON ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

/* BOTON VER MÁS:
Capturo el evento click en el botón
Creo funcion y se coloca dentro del evento
La funcion cambia el offset de la URL del fetch y va sumando de a 12
Reutilizo funciones fetchSearchGifs(url) para el fetch y dibujarlos */

function changeOffset() { 
    offset += 12;

    let inputText = JSON.parse(localStorage.getItem('inputValue'));
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;
    
    fetchSearchGifs(url);
}