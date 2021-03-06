// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SHOW TRENDING GIFS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----
let limit;

function fetchTrendingEndopint() {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(json => {
            let trendingGifs = json.data;
            drawTrendingGifs(trendingGifs);
        })
        .catch(error => console.error(error));
}

function changeLimitMobileDesktop() {
    if (window.matchMedia("(min-width: 960px)").matches) {
        /* The screen has at least 960px of width */
        limit = 3;
        fetchTrendingEndopint();
        } else {
        /* The screen has less than 960px of width */
        limit = 20;
        fetchTrendingEndopint();
    }
};

changeLimitMobileDesktop();

// ---- ---- ---- ---- ---- TRENDING SLIDER ---- ---- ---- ---- ----

function drawTrendingGifs(trendingGifs) {
    const gifsSlider = document.querySelector('.gifs-slider');
    gifsSlider.innerHTML = '';

    for (let i = 0; i < trendingGifs.length; i++) {
        let div = document.createElement("div");
        img = document.createElement("img");
        
        img.src = trendingGifs[i].images.downsized.url;
        img.alt = trendingGifs[i].title;
        div.appendChild(img);
        div.classList.add('gif-images');
       
        gifsSlider.appendChild(div);

        div.addEventListener('mouseenter', () => drawHoverGif(trendingGifs, i, div));
        div.addEventListener('mouseleave', () => removeHoverGif(div));
    }

    if (trendingGifs.length === [0]) {
        btnLeftTrending.style.display = "none";
    }
}

// ---- ---- ---- ---- ---- MOVE LEFT AND RIGHT ARROWS ON DESKTOP ---- ---- ---- ---- ----

btnLeftTrending.style.display = "none";

btnRightTrending.addEventListener('click', () => {
    moveRightTrending();
    btnLeftTrending.style.display = "block";
});

btnLeftTrending.addEventListener('click', () => {
    moveLeftTrending();
});

function moveLeftTrending() {
    offset -= 3;
    limit = 3;
    fetchTrendingEndopint();
}

function moveRightTrending() {
    offset += 3;
    limit = 3;
    fetchTrendingEndopint();
}