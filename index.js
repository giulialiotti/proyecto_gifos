const APIKEY = "gUd0zCdNEkv06vVTL5GpSGw4arqlSool";

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- HAMBURGER MENU ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---

const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('navUl');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
});

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- DARK MODE ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---

const darkMode = document.getElementById('darkMode');

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

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -
// ---- ---- ---- ---- ---- TRENDING FETCH API KEY ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- -

function endPointTrendingGifs() {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=gUd0zCdNEkv06vVTL5GpSGw4arqlSool')
    .then(response => response.json())
    .then(json => {
        console.log(json.data);
    })
    .catch(error => console.error(error));
}

endPointTrendingGifs();

// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 
// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- 

document.addEventListener("DOMContentLoaded", searchResults);
      function searchResults() {
        document.getElementById("btnSearch").addEventListener("click", ev => {
          ev.preventDefault(); //to stop the page reload
          let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=`;
          let str = document.getElementById("searchInput").value.trim();
          url = url.concat(str);
          //console.log(url);
          fetch(url)
            .then(response => response.json())
            .then(content => {
              // data, pagination, meta
              //console.log(content.data);
              //console.log("META", content.meta);
              let gifs = content.data;
              for (let i = 0; i < gifs.length; i++) {
                let div = document.createElement("div");
                let img = document.createElement("img");
                img.src = gifs[i].images.original.url;
                img.alt = gifs[i].title;
                div.appendChild(img);
                let searchResultsGifs = document.getElementById("searchResultsGifs");
                searchResultsGifs.appendChild(div);
              }
              document.querySelector("#searchInput").value = "";
            })
            .catch(err => {
              console.error(err);
            });
        });
      }

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
