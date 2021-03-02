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

// const inputContainer = document.querySelector('.input-container');

const searchInput = document.getElementById('searchInput');
const URLSuggestions = "https://api.giphy.com/v1/tags/related/" + searchInput + "?&api_key=" + APIKEY + "&limit=4";

function fetchSearchSuggestions(URLSuggestions) {
  fetch(URLSuggestions)
  .then(response => response.json())
  .then(json => {
    suggestions = json.data;
    console.log(suggestions);
  })
  .catch(error => console.log(error));
}

fetchSearchSuggestions(URLSuggestions);

searchInput.addEventListener('keyup', () => {
  let inputText = searchInput.value;
  //console.log(inputText);
  drawSuggestions(suggestions);
});

function drawSuggestions(suggestions) {
  for (let i = 0; i < suggestions.length; i++) {
    suggestionsList.innerHTML += `
    <li class="suggestionsLi">${suggestions[i].name}</li>`;
  }
};

let suggestionsList = document.getElementById('suggestionsList');
let suggestionsUl = document.createElement('ul');
let suggestionsLi = document.querySelector('.suggestionsLi');

suggestionsList.appendChild(suggestionsUl);
//suggestionsUl.appendChild(suggestionsLi);
suggestionsUl.classList.add("suggestionsUl");



// function drawSuggestions(suggestion) {
//   let suggestionsLi = document.createElement('li');
//   suggestionsLi.classList.add("suggestionsLi");
// };

// Codigo fran 

// function suggestions(input){
//   return fetch ("https://api.giphy.com/v1/tags/related/" + input + "?&api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID")
//   .then(response => response.json())
//   .then(data => data)
//   .catch(error => console.error(error))
// }

// input.addEventListener("keyup", () =>{
//   clearSuggestionsContainerContent();
//   suggestions(input).then(data =>  drawSuggestions(data));
// })