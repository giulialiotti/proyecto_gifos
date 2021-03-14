// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- SEARCH GIFOS SUGGESTIONS LIST ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

async function getSuggestions() {
    let input = document.getElementById('searchInput').value;
    let resp = await fetch(`https://api.giphy.com/v1/gifs/search/tags?&api_key=${APIKEY}&q=${input}&limit=4`);
    let data = await resp.json();

    return data;
}

function drawSuggestions() {
  suggestionsList.innerHTML = '';

  getSuggestions().then( data => {
    let suggestions = data.data;

    suggestions.forEach(item => {
      let li = document.createElement('li');
      let span = document.createElement('span');

      li.classList.add('suggestions-li');
      span.classList.add('grey-lupa');

      li.innerText = item.name;

      li.appendChild(span);
      suggestionsList.appendChild(li);

      li.addEventListener('click', () => selectItem(item));

      //suggestions.name.filter(item => item.toLowerCase().includes(searchInput.value));
    })
  })
}

searchInput.addEventListener('keyup', () => {
  console.log(searchInput.value);
  drawSuggestions();
});

function selectItem(item) {
  console.log(item.name)
  searchInput.innerText = item.name;
  let urlItem = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${item.name}`;
  console.log(urlItem);
  fetchSearchGifs(urlItem);
}
