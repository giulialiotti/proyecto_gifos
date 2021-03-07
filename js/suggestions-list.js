// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- SEARCH GIFOS SUGGESTIONS LIST ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

// // Buscar las sugerencias en json
// const searchSuggestions = async searchText => {
//   const response = await fetch(`https://api.giphy.com/v1/tags/related/${searchValue}?api_key=${APIKEY}`);
//   const suggestions = await response.json();

//   // Obtener coincidencias con el text input ingresado
//   let matches = suggestions.filter(suggestion => {
//     const regex = new RegExp(`^${searchText}`, 'gi');
//     return suggestion.name.match(regex);
//   });

//   if (searchText.length === 0) {
//     matches = [];
//   }

//   console.log(matches);
// };

// searchInput.addEventListener('input', () => searchSuggestions(searchValue));


// let suggestList = (list) => (
//   `<ul id="suggestList">
//       ${list.map(node).join('')}
//   </ul>`
// );

// fetch(`https://api.giphy.com/v1/tags/related/${searchValue}?api_key=${APIKEY}`)
// .then(response => response.json())
// .then(json => loadLists(json))  // <-- Call loadLists() here
// .catch(error => console.log(error));

// let loadLists = (json) => {
//   let suggestions = [...json.data];

//   let searchSuggest = ['input', function(e) {
//           filterList(e.target.value, suggestions);
//       }, false];

//   searchInput.addEventListener(...searchSuggest);
//   suggestionsList.innerHTML = suggestList(suggestions.slice(0, 3));
// }

// let filterList = (key, suggestions) => {
//   let listEl = document.getElementById('suggestList');
//   //listEl.innerHTML = '';  // <-- Clear the field to avoid repeated entries.

//   for (let i = 0; i < suggestions.length; i++) {
//       if ((suggestions[i].name.toLowerCase())
//           .indexOf(key.toLowerCase()) > -1) {
//           let node = () => (
//               `<li class="suggestion">
//                   ${suggestions[i].name}
//               </li>`
//           );
//           if (listEl.childNodes.length < 4) {
//               listEl.insertAdjacentHTML('beforeend', node());
//           }
//       }
//       if (key.length < 2) {
//           //listEl.innerHTML = '';
//           suggestionsList.innerHTML = suggestList(suggestions.slice(0, 3));
//       }
//   }
// };

// let suggestionListItem = (item) => (
//   `<li class="uk-width-1-1">
//       <img class="uk-border-circle uk-width-1-4 uk-float-left" src="${item.profile_pic}" data-uk-image />
//       <p class="uk-width-3-4 uk-text-lead uk-text-truncate uk-padding-small uk-padding-remove-vertical">${item.ig_handle}</p>
//   </li>`
// );

//---------------------------------------------------------------------------------------------------------------

// const searchInput = document.getElementById('searchInput');
// const inputContainer = document.querySelector('.input-container');
// const suggestionsList = document.getElementById('suggestionsList');

// let searchValue = searchInput.setSelectionRange(0, searchInput.value.length);

// // const searchSuggestions = fetch(`https://api.giphy.com/v1/tags/related/${searchValue}?api_key=${APIKEY}`)
// // .then(respuesta => console.log(respuesta.json()))
// // .catch(error => console.log(error));

// async function searchSuggestions() {
//   try {
//     let respuesta = await fetch(`https://api.giphy.com/v1/tags/related/${searchValue}?api_key=${APIKEY}`);
//     let suggestions = await respuesta.json();
//     return console.log(suggestions.data);
//   } catch (error) {
//     throw (error)
//   }
// }

// // searchSuggestions()
// //     .then(resultado => console.log(resultado))
// //     .catch(error => console.log("error", error));

// searchInput.addEventListener('keyup', () => {
//   //console.log(e.target.value);

//   let results = [];
//   let input = searchInput.value;
//   //console.log(input);
//   if (input.length) {
//     results = searchSuggestions().filter((item) => {
//       return item.toLowerCase().includes(input.toLowerCase());
//     });
//   }
//   renderResults(results);
// });

// function renderResults(results) {
//   if (!results.length) {
//     return inputContainer.classList.remove('show');
//   }

//   const content = results
//     .map((item) => {
//       return `<li>${item}</li>`;
//     })
//     .join('');

//     inputContainer.classList.add('show');
//     suggestionsList.innerHTML = `<ul>${content}</ul>`;
// }


let input;
const URLSuggestions = `https://api.giphy.com/v1/tags/related/${searchInput}?&api_key=${APIKEY}&limit=4`;
const URLAutocomplete = `https://api.giphy.com/v1/gifs/search/tags?&api_key=${APIKEY}&q=${input}&limit=4`;
const suggestionsList = document.getElementById('suggestionsList');

let suggestions;

function getSuggestions() {
  let input = document.getElementById('searchInput').value;
  fetch(`https://api.giphy.com/v1/gifs/search/tags?&api_key=${APIKEY}&q=${input}&limit=4`)
    .then(response => response.json())
    .then(data => {
      let suggestions = data.data;
      console.log(suggestions)
      drawSuggestions(suggestions);
    })
    .catch(error => {
      console.error(error);
  });
}

function drawSuggestions(suggestions) {
  suggestionsList.innerHTML = '';

  suggestions.forEach(item => {
    let li = document.createElement('li');
    let span = document.createElement('span');

    li.classList.add('suggestions-li');
    span.classList.add('grey-lupa');

    li.innerText = item.name;

    li.appendChild(span);
    suggestionsList.appendChild(li);

    li.addEventListener('click', () => selectItem(item));
  })
}

searchInput.addEventListener('keyup', () => {
  console.log(searchInput.value);
  let results = suggestions.name.filter(item => item.toLowerCase().includes(searchInput.value));
  drawSuggestions(results);
});

function selectItem(item) {
  console.log(item.name)
  searchInput.innerText = item.name;
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=${item}`;
  //console.log(url);
  fetchSearchGifs(url);
}
