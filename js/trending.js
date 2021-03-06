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

// ---- ---- ---- ---- ---- TRENDING SLIDER ---- ---- ---- ---- ----

let btnLeftTrending = document.querySelector('.btn-left-trending');
let btnRightTrending = document.querySelector('.btn-right-trending');
let img;

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
}

btnLeftTrending.addEventListener('click', () => {
    console.log("hago click")
    // moveLeftTrending(trendingGifs, img);
});
btnRightTrending.addEventListener('click', () => {
    console.log("hago click")
    changeOffsetTrending();
});


// ---- ---- ---- ---- ---- MOVE LEFT AND RIGHT ARROWS ON DESKTOP ---- ---- ---- ---- ----
// NO FUNCIONA
function moveLeftTrending(trendingGifs, img) {
    if (gifIndex > 0) {
        gifIndex = gifIndex - 1;
    } else {
        gifIndex = trendingGifs.length - 1;
    }
    img.src = trendingGifs[gifIndex].images.downsized.url;
}

// function moveRightTrending(trendingGifs) {
//     if (gifIndex < trendingGifs.length - 1) {
//         gifIndex = gifIndex + 3;
//     } else {
//         gifIndex = 0;
//     }
//     img.src = trendingGifs[gifIndex].images.downsized.url;
// }

function changeOffsetTrending() {
    offset += 3;

    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=3&offset=${offset}`)
    .then(response => response.json())
    .then(json => {
        let trendingGifs = json.data;
        console.log(trendingGifs);
        drawTrendingGifs(trendingGifs);
        // removeEventListeners();
    });
}

// No funciona
function removeEventListeners() {
    btnLeftTrending.removeEventListener('click');
    btnRightTrending.removeEventListener('click');
}


// trendingGifs.forEach(gif => {
//     let div = document.createElement("div");
//     let img = document.createElement("img");
    
//     img.src = gif.images.original.url;
//     img.alt = gif.title;
//     div.appendChild(img);
//     div.classList.add('gif-images');

//     const gifsSlider = document.querySelector('.gifs-slider');
//     gifsSlider.appendChild(div);

//     div.addEventListener('mouseenter', () => drawHoverGif(trendingGifs, gif, div));
//     div.addEventListener('mouseleave', () => removeHoverGif(div));
// });