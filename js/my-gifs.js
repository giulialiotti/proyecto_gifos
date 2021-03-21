const myGifosGrid = document.getElementById('myGifosGrid');
const seeMoreMyGifos = document.getElementById('seeMoreMyGifos');
const iconMyGifos = document.querySelector('.icon-my-gifos');
const myGifosText = document.querySelector('.my-gifos-text');

myGifosGrid.style.display = "none";
seeMoreMyGifos.style.display = "none";

let gifos = JSON.parse(localStorage.getItem('gifosList'));

function myGifos() {
    
    if (gifos.length === 0) {
        iconMyGifos.style.display = "block";
        myGifosText.style.display = "block";
    } else {
        iconMyGifos.style.display = "none";
        myGifosText.style.display = "none";
        
        myGifosGrid.style.display = "grid";
        drawGifos(gifos);
    }
}

myGifos();

// function showGifosGrid(gifos) {
//     myGifosGrid.style.display = "grid";
//     seeMoreMyGifos.style.display = "flex";
//     seeMoreMyGifos.addEventListener('click', () => {
//         for (let i = currentIndex; i < currentIndex + 12; i++) {
//             if (gifos[i]) {
//                 drawGifos();
//             }
//         }
//         currentIndex += 12;
        
//         // If there's no more favorites hide see more button
//         if (currentIndex >= gifos.length) {
//             seeMoreMyGifos.style.display = 'none';
//         }
//     });
// }

function drawGifos(gifos) {
    for (let i = 0; i < gifos.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");
    
        img.src = gifos[i].images.original.url;
    
        div.classList.add('gif-container');
        div.appendChild(img);
        myGifosGrid.appendChild(div);
    
        div.addEventListener('mouseenter', () => drawHoverGif(gifos, i, div));
        div.addEventListener('mouseleave', () => removeHoverGif(div));
    
        if (gifos.length <= 12) {
            seeMoreMyGifos.style.display = 'none';
        }
    }
}
