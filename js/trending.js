// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SHOW TRENDING GIFS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----

function endPointTrendingGifs() {
    if (window.matchMedia("(min-width: 960px)").matches) {
        /* The screen has at least 960px of width */
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=3`)
        .then(response => response.json())
        .then(json => {
            let trendingGifs = json.data;
            console.log(trendingGifs);
            drawTrendingGifs(trendingGifs);
        })
        .catch(error => console.error(error));
        } else {
        /* The screen has less than 960px of width */
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=20`)
        .then(response => response.json())
        .then(json => {
            let trendingGifs = json.data;
            console.log(trendingGifs);
            drawTrendingGifs(trendingGifs);
        })
        .catch(error => console.error(error));
    }
};

endPointTrendingGifs();

let btnLeftTrending = document.querySelector('.btn-left-trending');
let btnRightTrending = document.querySelector('.btn-right-trending');

function drawTrendingGifs(trendingGifs) {
    // for (let i = 0; i < trendingGifs.length; i++) {
    //     let div = document.createElement("div");
    //     let img = document.createElement("img");
        
    //     img.src = trendingGifs[i].images.original.url;
    //     img.alt = trendingGifs[i].title;
    //     div.appendChild(img);
    //     div.classList.add('gif-images');

    //     const gifsSlider = document.querySelector('.gifs-slider');
    //     gifsSlider.appendChild(div);
    // }
    trendingGifs.forEach(gif => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        
        img.src = gif.images.original.url;
        img.alt = gif.title;
        div.appendChild(img);
        div.classList.add('gif-images');

        const gifsSlider = document.querySelector('.gifs-slider');
        gifsSlider.appendChild(div);
    });

    btnLeftTrending.addEventListener('click', () => {
        console.log("hago click")
    });
    btnRightTrending.addEventListener('click', () => {
        console.log("hago click")
    });
}

// ---- ---- ---- ---- ---- MOVE LEFT AND RIGHT ARROWS ON DESKTOP ---- ---- ---- ---- ----
// NO FUNCIONA
// function moveLeftTrending(trendingGifs, img) {
//     if (gifIndex > 0) {
//         gifIndex = gifIndex - 1;
//     } else {
//         gifIndex = trendingGifs.length - 1;
//     }

//     img.src = trendingGifs[gifIndex].images.original.url;
// }

// function moveRightTrending(trendingGifs, img) {
//     if (gifIndex < trendingGifs.length - 1) {
//         gifIndex = gifIndex + 1;
//     } else {
//         gifIndex = 0;
//     }

//     img.src = trendingGifs[gifIndex].images.original.url;
// }