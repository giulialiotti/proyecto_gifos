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
  }

  localStorage.setItem('favorites',JSON.stringify(favorites));
}

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- SEE MORE BUTTON ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

/* BOTON VER MÁS:
Capturo el evento click en el botón
Creo funcion y se coloca dentro del evento
La funcion cambia el offset de la URL del fetch y va sumando de a 12
Reutilizo funciones fetchSearchGifs(url) para el fetch y gifsLoop(gifs)
para dibujarlos que esta dentro de fetchSearchGifs(url)*/

function changeOffset() {
    let offset =+ 12; 
    let inputText = JSON.parse(localStorage.getItem('inputValue'));
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;

    fetchSearchGifs(url);
}