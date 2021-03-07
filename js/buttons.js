// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- HAMBURGER MENU ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
});

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- DARK MODE ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---

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

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- BUTTON ADD GIF TO FAVORITE SECTION ---- ---- ---- ---- 
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

function addFavorite(gif) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let favIndex;

    if (!favorites) {
        favorites = [];
        favIndex = -1;
    } else {
        favIndex = favorites.findIndex(favorites => favorites.id == gif.id);
    }

    if (favIndex == -1) {
        favorites.push(gif);
    } else {
        favorites.splice(favIndex, 1);
        location.reload();
    }

    localStorage.setItem('favorites',JSON.stringify(favorites));
}

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- BUTTON DOWNLOAD GIF ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 

function downloadGif(url) {
    fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
        const imgHref = window.URL.createObjectURL(new Blob([blob]));
        var link = document.createElement("a");
        link.setAttribute("download", 'mygif.gif');
        link.href = imgHref;
        document.body.appendChild(link);
        link.click();
        link.remove();
    });
}