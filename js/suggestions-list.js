// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- SEARCH GIFOS SUGGESTIONS LIST ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

// Fetch search endpoint with input value 
async function getSuggestions() {
    let input = document.getElementById('searchInput').value;
    let resp = await fetch(`https://api.giphy.com/v1/gifs/search/tags?&api_key=${APIKEY}&q=${input}&limit=4`);
    let data = await resp.json();

    return data;
}

// Draw list under search bar
function drawSuggestions() {
  // Empty the list before drawing
  suggestionsList.innerHTML = '';

  // Create divider
  let hr = document.createElement('hr');
  hr.classList.add('suggestions-list-divider');
  suggestionsList.appendChild(hr);

  // Show magnifying glass next to input
  lupaChanges(hr);

  getSuggestions().then( data => {
    let suggestions = data.data;

    // Looping through the data and creating items
    suggestions.forEach(item => {
      let li = document.createElement('li');
      let span = document.createElement('span');

      li.classList.add('suggestions-li');
      span.classList.add('grey-lupa');

      li.innerText = item.name;

      li.appendChild(span);
      suggestionsList.appendChild(li);

      // Add event to select each item
      li.addEventListener('click', () => selectItem(item));

      //suggestions.name.filter(item => item.toLowerCase().includes(searchInput.value));
    })
  })
}

// While user is typing show the suggestions list
searchInput.addEventListener('keyup', () => {
  console.log(searchInput.value);
  localStorage.setItem("inputValue", JSON.stringify(searchInput.value));
  drawSuggestions();
});

// Select each item on the suggestions list and fetch endpoint to show gifs results 
function selectItem(item) {
  searchInput.innerText = item.name;
  let urlItem = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${item.name}`;

  fetchSearchGifs(urlItem).then(gifs => {
    document.querySelector("#searchInput").value = "";
    hideAndShowElements();
    // Draw gifs on grid
    gifsLoop(gifs);
    // Show title from search on top of grid
    changeTitleSearchResults(item.name);
  });
  
  suggestionsList.innerHTML = '';
  clearInput();

  //See more button: when clicked show 12 more gifs
  eventSeeMoreButton(item.name);
}
