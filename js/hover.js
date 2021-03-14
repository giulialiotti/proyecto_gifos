// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ---- HOVER ON GIFS ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ----

function drawHoverGif(gifs, i, div) {
    let gif = gifs[i];
    let url = gif.images.downsized.url;

    let hover = document.createElement('div');

    let hoverIcons = document.createElement('div');
    let likeBtn = document.createElement('div');
    let saveBtn = document.createElement('div');
    let expandBtn = document.createElement('div');

    let hoverText = document.createElement('div');
    let user = document.createElement('p');
    let title = document.createElement('p');

    user.textContent = gif.username == '' ? 'Unknown' : gif.username;
    title.textContent = gif.title;

    hover.classList.add('gif-hover');

    hoverIcons.classList.add('gif-hover-icons');
    likeBtn.classList.add('gif-hover-like-btn');
    saveBtn.classList.add('gif-hover-save-btn');
    expandBtn.classList.add('gif-hover-expand-btn');

    hoverText.classList.add('gif-hover-text');
    user.classList.add('gif-hover-user');
    title.classList.add('gif-hover-title');    
    
    likeBtn.addEventListener('click', () => addFavorite(gif));
    expandBtn.addEventListener('click', () => expandGif(gifs, i));
    saveBtn.addEventListener('click', () =>  downloadGif(url));

    div.appendChild(hover);
    hover.append(hoverIcons, hoverText);
    hoverIcons.append(likeBtn, saveBtn, expandBtn);
    hoverText.append(user, title);
}

function removeHoverGif(div) {
    let hover = document.querySelector('.gif-hover');
    div.removeChild(hover);
}