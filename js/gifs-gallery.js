// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---
// ---- ---- ---- ---- ---- GIFS GALLERY EXPANDED ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

closeGalleryBtn.addEventListener('click', () => {
    gifsGallery.classList.toggle('hide-gallery');
});

// ---- ---- ---- ---- ---- EXPAND GIF ---- ---- ---- ---- ----

function expandGif(gifs, i) {
    let gif = gifs[i];
    expandedGif.src = gif.images.original.url;
    expandedGif.alt = gif.title;
    gifsGallery.classList.toggle('hide-gallery');

    gifIndex = i;

    btnLeft.addEventListener('click', () => {
        moveLeft(gifs);
    });
    btnRight.addEventListener('click', () => {
        moveRight(gifs);
    });

    galleryUser.textContent = gif.username == '' ? 'Unknown' : gif.username;
    galleryGifTitle.textContent = gif.title;
}

// ---- ---- ---- ---- ---- LIKE AND SAVE BUTTONS WHILE EXPANDED ---- ---- ---- ---- ----

function galleryBtns() {
    let galleryButtons = document.querySelector('.gallery-buttons');
    let likeBtn = document.createElement('div');
    let saveBtn = document.createElement('div');
    likeBtn.classList.add('gif-expand-like-btn');
    saveBtn.classList.add('gif-expand-save-btn');
    galleryButtons.append(likeBtn, saveBtn);
    likeBtn.addEventListener('click', () => addFavorite(gif));
    saveBtn.addEventListener('click', () => downloadGif(url));
}

galleryBtns();

// ---- ---- ---- ---- ---- MOVE LEFT AND RIGHT ARROWS WHILE EXPANDED ---- ---- ---- ---- ----

function moveLeft(gifs) {
    if (gifIndex > 0) {
        gifIndex = gifIndex - 1;
    } else {
        gifIndex = gifs.length - 1;
    }
    changeContent(gifs);
}

function moveRight(gifs) {
    if (gifIndex < gifs.length - 1) {
        gifIndex = gifIndex + 1;
    } else {
        gifIndex = 0;
    }
    changeContent(gifs);
}

function changeContent(gifs) {
    expandedGif.src = gifs[gifIndex].images.original.url;
    galleryUser.textContent = gifs[gifIndex].username == '' ? 'Unknown' : gifs[gifIndex].username;
    galleryGifTitle.textContent = gifs[gifIndex].title;
}