let APIKEY = "gUd0zCdNEkv06vVTL5GpSGw4arqlSool";

// ---- ---- ---- ---- ---- HAMBURGER MENU ---- ---- ---- ---- ----

const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('navUl');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
});

// ---- ---- ---- ---- ---- DARK MODE ---- ---- ---- ---- ----

const darkMode = document.getElementById('darkMode');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    changeText();
});

function changeText() {
    if (darkMode.innerHTML === "Modo Nocturno") {
        darkMode.innerHTML = "Modo Diurno";
    } else {
        darkMode.innerHTML = "Modo Nocturno";
    }
}

// ---- ---- ---- ---- ---- TRENDING FETCH API KEY ---- ---- ---- ---- ----

function endPointTrendingGifs() {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=gUd0zCdNEkv06vVTL5GpSGw4arqlSool')
    .then(response => response.json())
    .then(json => {
        console.log(json.data);
    })
    .catch(error => console.error(error));
}

endPointTrendingGifs();

// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----

document.addEventListener("DOMContentLoaded", searchResults);
      function searchResults() {
        document.getElementById("btnSearch").addEventListener("click", ev => {
          ev.preventDefault(); //to stop the page reload
          let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=`;
          let str = document.getElementById("searchInput").value.trim();
          url = url.concat(str);
          console.log(url);
          fetch(url)
            .then(response => response.json())
            .then(content => {
              //  data, pagination, meta
              console.log(content.data);
              console.log("META", content.meta);
              let gifs = content.data;
              for (let i = 0; i < gifs.length; i++) {
                let div = document.createElement("div");
                let img = document.createElement("img");
                img.src = gifs[i].images.original.url;
                img.alt = gifs[i].title;
                div.appendChild(img);
                let searchResultsGifs = document.getElementById("searchResultsGifs");
                searchResultsGifs.appendChild(div);
              }
              document.querySelector("#searchInput").value = "";
            })
            .catch(err => {
              console.error(err);
            });
        });
      }

// ---- ---- ---- ---- ---- SEARCH GIFOS SUGGESTIONS LIST ---- ---- ---- ---- ----


