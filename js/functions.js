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

function searchResults() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
      ev.preventDefault();
  
      //hideTrendingText();
  
      searchResultsGifs.innerHTML = '';
  
      showSearchActive();
  
      let inputText = document.getElementById("searchInput").value.trim();
      let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${inputText}`;
  
      fetchSearchGifs(url);
  
      changeTitleSearchResults(inputText);

      let inputValue = document.getElementById('searchInput').value;
      
      localStorage.setItem('inputValue', JSON.stringify(inputValue));

      document.querySelector("#searchInput").value = "";
    });
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
        div.appendChild(img);
        let searchResultsGifs = document.getElementById("searchResultsGifs");
        searchResultsGifs.appendChild(div);
    }
}

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
    btnSeeMore.addEventListener('click', changeOffset);
};



// ---- ---- ---- ---- ---- TRENDING TEXT ---- ---- ---- ---- ----

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

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SHOW TRENDING GIFS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----

function endPointTrendingGifs() {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(json => {
        let trendingGifs = json.data;
        console.log(trendingGifs);

        for (let i = 0; i < trendingGifs.length; i++) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            
            img.src = trendingGifs[i].images.original.url;
            img.alt = trendingGifs[i].title;
            div.appendChild(img);
            div.classList.add('gif-images');

            const gifsSlider = document.querySelector('.gifs-slider');
            gifsSlider.appendChild(div);
        }
    })
    .catch(error => console.error(error));
};

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- SEE MORE BUTTON ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

/* BOTON VER MÁS:
Capturo el evento click en el botón
Creo funcion y se coloca dentro del evento
La funcion cambia el offset de la URL del fetch y va sumando de a 12
Reutilizo funciones fetchSearchGifs(url) para el fetch y gifsLoop(gifs)
para dibujarlos que esta dentro de fetchSearchGifs(url)*/

function changeOffset() {
    let offset =+ 12; 
    let inputText = JSON.parse(localStorage.getItem('inputValue'));
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;

    fetchSearchGifs(url);
}
