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

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- MAGNIFYING GLASS AND INPUT CHANGES ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

insertLupa.style.display = "none";

// If suggestions list is active magnifying glass appears next to input container
function lupaChanges() {
    if (searchInput.value !== "") {
        insertLupa.style.display = "block";
        insertLupa.classList.add('grey-lupa-input');
        searchInput.classList.add('active-search');
        eventOnCross();
        eventOnGrayLupa();
    } else {
        clearInput();
    }
}

// Remove gray magnifying glass next to input, eliminate class and chage cross back to magnifying glass
function clearInput() {
    insertLupa.style.display = "none";
    searchInput.classList.remove('active-search');
    btnSearch.style.backgroundImage = "url('../assets/icon-search.svg')";
}

// Function of event that on click clears field
function eventOnCross() {
    btnSearch.style.backgroundImage = "url('../assets/close.svg')";
    btnSearch.addEventListener("click", ev => {
        ev.preventDefault();
        searchInput.value = "";
        suggestionsList.innerHTML = '';
        clearInput();
    });
}

// Function of event when click on gray magnifying glass next to input
function eventOnGrayLupa() {
    insertLupa.addEventListener("click", () => {
        // Clear suggestions list
        suggestionsList.innerHTML = '';

        clearInput();
        searchResults();

        // Get input text from local storage to use as title on results grid
        let inputText = JSON.parse(localStorage.getItem('inputValue'));
        changeTitleSearchResults(inputText);

        // Empty input
        searchInput.value = "";
    });
}
