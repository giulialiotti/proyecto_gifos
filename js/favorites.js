// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- FAVORITES SECTION ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

favoritesGifsGrid.style.display = "none";
btnSeeMore.style.display = "none";

function drawFavoritesGifs() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    favoritesGifsGrid.style.display = "grid"; 
    btnSeeMore.style.display = "flex";
    btnSeeMore.addEventListener('click', changeOffset);

    for (let i = 0; i < favorites.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");

        img.src = favorites[i].images.original.url;
        img.alt = favorites[i].title;

        div.appendChild(img);
        favoritesGifsGrid.appendChild(div);
    } 
}

drawFavoritesGifs();

