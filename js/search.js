// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 

// Hide, hr, trending text, grid and see more button while inactive
hideSearchInactive();

// btnSearch.addEventListener("click", ev => {
//     ev.preventDefault();
//     searchResults();
// });

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

        img.src = gifs[i].images.downsized.url;
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

// ---- ---- ---- ---- ---- SEARCH TITLE ON GRID ---- ---- ---- ---- ----

function changeTitleSearchResults(inputText) {
    titleSearchResult.innerHTML = inputText;
};

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- SEE MORE BUTTON ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ----

function changeOffset() { 
    offset += 12;

    let inputText = JSON.parse(localStorage.getItem('inputValue'));
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;
    
    fetchSearchGifs(url);
}

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -
// ---- ---- ---- ---- ---- TRENDING TEXT IN SEARCH BAR SECTION ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -

// Fetch trending api
function endPointTrendingGifsText() {
    fetch(`https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(json => {
        trendingGifsText = json.data;

        // Create an array of only 5 elements, insert and join in html
        let arr = trendingGifsText.slice(0, 5);
        trendingText.innerHTML = arr.join(', ');

        arr.forEach(trending => {
            let urlTrending = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${trending}`;

            trending.onclick = () => {
                fetchSearchGifs(urlTrending)
            };
        });
    })
    .catch(error => console.error(error));
};

endPointTrendingGifsText();

//---------------------------------------------------------------------------

// trending.addEventListener('click', () => {
            //     console.log('hago click');
            //     fetchSearchGifs(urlTrending);
            // });

// for (let i = 0; i < arr.length; i++) {
        //     console.log(arr)
        //     let urlTrending = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${arr[i]}`;
        //     arr[i].addEventListener('click', () => {
        //         console.log('hago click')
        //     })
    //}

// function endPointTrendingGifsText() {
//     fetch(`https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`)
//     .then(response => response.json())
//     .then(json => {
//         trendingGifsText = json.data;

//         // Create an array of only 5 elements, insert and join in html
//         let arr = trendingGifsText.slice(0, 5);
//         //trendingText.innerHTML = arr.join(', ');

//         arr.forEach(trending => {
//             let urlTrending = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${trending}`;
//             let aTag = document.createElement('a');
//             // aTag.href = urlTrending;
//             aTag.textContent = trending;
//             trendingText.appendChild(aTag);

//             aTag.onclick = () => { 
//                 aTag.href = urlTrending;
//                 fetchSearchGifs(urlTrending)
//             };
//         });
//     })
//     .catch(error => console.error(error));
// };

