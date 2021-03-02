// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SHOW TRENDING GIFS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----

function endPointTrendingGifs() {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=3`)
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

endPointTrendingGifs();