// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- FAVORITES SECTION ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

favoritesGifsContainer.style.display = "none";
btnSeeMore.style.display = "none";

function drawFavoritesGifs() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if (favorites.length === 0) {
        iconFav.style.display = "block";
        favoritesText.style.display = "block";
    } else {
        iconFav.style.display = "none";
        favoritesText.style.display = "none";
        
        showGridFavorites();

        for (let i = 0; i < 12; i++) {
            let div = document.createElement("div");
            let img = document.createElement("img");

            img.src = favorites[i].images.original.url;
            img.alt = favorites[i].title;

            div.appendChild(img);
            favoritesGifsContainer.appendChild(div);

            div.addEventListener('mouseenter', () => drawHoverGif(favorites, i, div));
            div.addEventListener('mouseleave', () => removeHoverGif(div));
        } 
    }

    btnSeeMore.addEventListener('click', showMoreFavorites);
}

drawFavoritesGifs();

function showGridFavorites() {
    favoritesGifsContainer.style.display = "grid";
    btnSeeMore.style.display = "flex";
}

function showMoreFavorites(favorites) {
    console.log("click");
}