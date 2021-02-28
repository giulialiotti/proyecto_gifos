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

// NO FUNCIONA SI LO PASO A INDEX.JS
btnSearch.addEventListener("click", ev => {
    ev.preventDefault();
    searchResults();
});

function searchResults() {
    //hideTrendingText();

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

const searchResultsGifs = document.getElementById("searchResultsGifs");

function gifsLoop(gifs) {
    for (let i = 0; i < gifs.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");

        img.src = gifs[i].images.original.url;
        img.alt = gifs[i].title;

        div.addEventListener('mouseenter', () => drawHoverGif(gifs, i, div));
        div.addEventListener('mouseleave', () => removeHoverGif(div));
        
        div.appendChild(img);
        searchResultsGifs.appendChild(div);
    }
}

// ---- ---- ---- ---- ---- HOVER ON GIFS ---- ---- ---- ---- ----

function drawHoverGif(gifs, i, div) {
    let gif = gifs[i];
    let hover = document.createElement('div');

    let hoverIcons = document.createElement('div');
    let likeBtn = document.createElement('div');
    let saveBtn = document.createElement('div');
    let expandBtn = document.createElement('div');

    let hoverText = document.createElement('div');
    let user = document.createElement('p');
    let title = document.createElement('p');

    user.textContent = gif.username == '' ? 'Unknown' : gif.username;
    title.textContent = gif.title;

    hover.classList.add('gif-hover');

    hoverIcons.classList.add('gif-hover-icons');
    likeBtn.classList.add('gif-hover-like-btn');
    saveBtn.classList.add('gif-hover-save-btn');
    expandBtn.classList.add('gif-hover-expand-btn');

    hoverText.classList.add('gif-hover-text');
    user.classList.add('gif-hover-user');
    title.classList.add('gif-hover-title');    
    
    likeBtn.addEventListener('click', () => addFavorite(gif));
    expandBtn.addEventListener('click', () => expandGif(gifs, i));

    div.appendChild(hover);
    hover.append(hoverIcons, hoverText);
    hoverIcons.append(likeBtn, saveBtn, expandBtn);
    hoverText.append(user, title);
}

function removeHoverGif(div) {
    let hover = document.querySelector('.gif-hover');
    div.removeChild(hover);
}

// ---- ---- ---- ---- ---- ADD GIF TO FAVORITE SECTION ---- ---- ---- ---- ----

function addFavorite(gif) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let favIndex;

    if (!favorites) {
        favorites = [];
        favIndex = -1;
    } else {
        favIndex = favorites.findIndex(favorites => favorites.id == gif.id);
    }

    if (favIndex == -1) {
        favorites.push(gif);
    } else {
        favorites.splice(favIndex, 1);
    }

    localStorage.setItem('favorites',JSON.stringify(favorites));
}

// ---- ---- ---- ---- ---- EXPAND GIF ---- ---- ---- ---- ----

function expandGif(gifs, i) {
    let gif = gifs[i];
    expandedGif.src = gif.images.original.url;
    expandedGif.alt = gif.title;
    gifsGallery.classList.toggle('hide-gallery');

    gifIndex = i;

    btnLeft.addEventListener('click', () => {
        moveLeft(gifs);
    });
    btnRight.addEventListener('click', () => {
        moveRight(gifs);
    });

    galleryUser.textContent = gif.username == '' ? 'Unknown' : gif.username;
    galleryGifTitle.textContent = gif.title;
}

function galleryBtns() {
    let galleryButtons = document.querySelector('.gallery-buttons');
    let likeBtn = document.createElement('div');
    let saveBtn = document.createElement('div');
    likeBtn.classList.add('gif-expand-like-btn');
    saveBtn.classList.add('gif-expand-save-btn');
    galleryButtons.append(likeBtn, saveBtn);
    likeBtn.addEventListener('click', () => addFavorite(gif));
}

galleryBtns();

// ---- ---- ---- ---- ---- MOVE LEFT AND RIGHT ARROWS WHILE EXPANDED ---- ---- ---- ---- ----

function moveLeft(gifs) {
    if (gifIndex > 0) {
        gifIndex = gifIndex - 1;
    } else {
        gifIndex = gifs.length - 1;
    }

    expandedGif.src = gifs[gifIndex].images.original.url;
}

function moveRight(gifs) {
    if (gifIndex < gifs.length - 1) {
        gifIndex = gifIndex + 1;
    } else {
        gifIndex = 0;
    }

    expandedGif.src = gifs[gifIndex].images.original.u
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

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- GIFS GALLERY EXPANDED ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

