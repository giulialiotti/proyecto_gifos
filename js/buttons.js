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

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- CHANGE LUPA TO CROSS ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// Poner dentro de una funcion y llamarla
if (searchInput.value === "") {
    btnSearch.style.backgroundImage = "url('../assets/icon-search.svg')";
    btnSearch.addEventListener("click", ev => {
        ev.preventDefault();
        searchResults();
        suggestionsList.innerHTML = '';
    });
} else {
    btnSearch.style.backgroundImage = "url('../assets/close.svg')";
    btnSearch.addEventListener("click", ev => {
        ev.preventDefault();
        searchInput.value = "";
        suggestionsList.innerHTML = '';
    });
}

// ---- ---- ---- ---- ---- ADD LUPA NEXT TO INPUT ---- ---- ---- ---- ----

function lupaChanges() {
  let insertLupa = document.getElementById('insertLupa');  
  insertLupa.style.visibility = "visible";
  let span = document.createElement('span');
  span.classList.add('grey-lupa-input', 'grey-lupa');
  insertLupa.appendChild(span);
  searchInput.classList.add('active-search');
}

if (searchInput.value === "") {
    insertLupa.style.visibility= "hidden";
} else {
    lupaChanges();
}
