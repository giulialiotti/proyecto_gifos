// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- FAVORITES SECTION ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

favoritesGifsContainer.style.display = "none";
btnSeeMore.style.display = "none";

function favoritesGifs() {

    if (favorites.length === 0) {
        iconFav.style.display = "block";
        favoritesText.style.display = "block";
    } else {
        iconFav.style.display = "none";
        favoritesText.style.display = "none";
        
        showGridFavorites(favorites);
        favoritesGifsLoop(favorites);
    }
}

favoritesGifs();

function favoritesGifsLoop(favorites) {
    for (let i = 0; i < 12; i++) {
        drawFavorites(favorites, i);
    }
}

function drawFavorites(favorites, i) {
    let div = document.createElement("div");
    let img = document.createElement("img");

    img.src = favorites[i].images.downsized.url;
    img.alt = favorites[i].title;

    div.classList.add('gif-container');
    div.appendChild(img);
    favoritesGifsContainer.appendChild(div);

    div.addEventListener('mouseenter', () => drawHoverGif(favorites, i, div));
    div.addEventListener('mouseleave', () => removeHoverGif(div));

    if (favorites.length <= 12) {
        btnSeeMore.style.display = 'none';
    }
}

function showGridFavorites(favorites) {
    favoritesGifsContainer.style.display = "grid";
    btnSeeMore.style.display = "flex";
    btnSeeMore.addEventListener('click', () => {
        for (let i = currentIndex; i < currentIndex + 12; i++) {
            if (favorites[i]) {
                drawFavorites(favorites, i);
            }
        }
        currentIndex += 12;
        
        // If there's no more favorites hide see more button
        if (currentIndex >= favorites.length) {
            btnSeeMore.style.display = 'none';
        }
    });
}
