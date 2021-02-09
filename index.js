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
    // darkMode.classList.toggle('active'); y asi cambiar el texto a modo diurno
})


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

let searchInput = document.getElementById('searchInput').value;

function searchResults() {
    fetch('https://api.giphy.com/v1/tags/related/?api_key=gUd0zCdNEkv06vVTL5GpSGw4arqlSool')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        
    })
    .catch(error => console.error(error));
}

// images.original.url 
