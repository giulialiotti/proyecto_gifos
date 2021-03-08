const video = document.getElementById('video');
const videoContainer = document.querySelector('.video-container');

// Buttons
const beginBtn = document.getElementById('beginBtn');
const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const uploadBtn = document.getElementById('uploadBtn');

// Text
const createGifText = document.getElementById('createGifText');
let createGifTitle = document.getElementById('createGifTitle');
let createGifTextFirstLine = document.getElementById('createGifTextFirstLine');
let createGifTextSecondLine = document.getElementById('createGifTextSecondLine');

// Numbers
const numberOne = document.getElementById('numberOne')
const numberTwo = document.getElementById('numberTwo')
const numberThree = document.getElementById('numberThree')

// Recorder
let recorder;

// ---- ---- ---- ---- ---- CAMARA FUNCTIONALITY ---- ---- ---- ---- ----

async function initializeCamara() {
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    video.srcObject = stream;
    video.play();
    console.log(stream);
    return stream;
}

// ---- ---- ---- ---- ---- EVENT LISTENERS BUTTONS ---- ---- ---- ---- ----

videoContainer.style.display = "none";
recordBtn.style.display = "none";
stopBtn.style.display = "none";
uploadBtn.style.display = "none";

beginBtn.addEventListener('click', () => {
    // Change text 
    changeCreateGifText();

    // Hide begin button
    beginBtn.style.display = "none";

    // Number 1 changes color
    numberChangeColor(numberOne);

    // Ask permission to use the camera
    initializeCamara().then(
        stream => {
            createGifText.style.display = "none";
            videoContainer.style.display = "block";
            recordBtn.style.display = "flex";

            changeNumberColorBack(numberOne);
            numberChangeColor(numberTwo);
            
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log('started')
                },
            });
        }   
    ); 
})

recordBtn.addEventListener('click', () => {
    // Hide and show buttons
    recordBtn.style.display = "none";
    stopBtn.style.display = "flex";

    // Start recording gif
    recorder.startRecording();
})

stopBtn.addEventListener('click', () => {
    // Hide and show buttons
    stopBtn.style.display = "none";
    uploadBtn.style.display = "flex";

    // Stop recording gif
    recorder.stopRecording( () => {
        let blob = recorder.getBlob();
        let url = window.URL.createObjectURL(blob);
        console.log(url);
        //video.src = url;
    });    
})

let form = new FormData();
form.append('file', recorder.getBlob(), 'myGif.gif');
console.log(form.get('file'));

let uploadUrl = `https://www.upload.giphy.com/v1/gifs?api_key=${APIKEY}`;

async function uploadGif() {
    let resp = await fetch(uploadUrl, { method: "POST", body: form });
    let data = await resp.json();

    return data;
}

uploadBtn.addEventListener('click', () => {
    // Change numbers
    changeNumberColorBack(numberTwo);
    numberChangeColor(numberThree);

    // Hide button
    uploadBtn.style.display = "none";

    // Show uploading hover on gif
    videoHover();

    // Upload gif 
    uploadGif().then(data => {
        localStorage.setItem('myGifs', JSON.stringify(data));
        disableVideoHover();
        successHover();
    });
})

function uploadedGif(data) {
    localStorage.setItem('myGifs', JSON.stringify(data));
    disableVideoHover();
    successHover();
}

// ---- ---- ---- ---- ---- FUNCTIONS ---- ---- ---- ---- ----

// Change inner text on step two
function changeCreateGifText() {
    createGifTitle.innerHTML = `<h2>¿Nos das acceso<br>a tu cámara?</h2>`;
    createGifTextFirstLine.innerText = 'El acceso a tu camara será válido sólo';
    createGifTextSecondLine.innerText = 'por el tiempo en el que estés creando el GIFO.'; 
}

// Change the color of the numbers when each of them is active
function numberChangeColor(number) {
    number.style.color = "#FFFFFF";
    number.style.background = "#572EE5";
}

// Change the color of the numbers back to original
function changeNumberColorBack(number) {
    number.style.color = "#572EE5";
    number.style.background = "#FFFFFF";
}

function videoHover() {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let text = document.createElement('p');

    img.src = "../assets/loader.svg";
    text.innerText = "Estamos subiendo tu GIFO";
    
    div.classList.add('video-hover');
    img.classList.add('loader-hover');
    text.classList.add('video-hover-text');

    videoContainer.append(div);
    div.append(img, text);
}

function disableVideoHover() {
    window.videoHover = function(){};
}

function successHover() {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let text = document.createElement('p');

    img.src = "../assets/check.svg";
    text.innerText = "GIFO subido con éxito";
    
    div.classList.add('video-hover');
    img.classList.add('loader-hover');
    text.classList.add('video-hover-text');

    videoContainer.append(div);
    div.append(img, text);
}