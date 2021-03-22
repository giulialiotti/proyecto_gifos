// Video
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
const repeatCaption = document.getElementById('repeatCaption');

// Numbers
const numberOne = document.getElementById('numberOne');
const numberTwo = document.getElementById('numberTwo');
const numberThree = document.getElementById('numberThree');

// Timer
let timer = document.getElementById('timer');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let totalSeconds = 0;

// Upload endpoint
let uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`;

// Recorder and blob
let recorder;
let blob;

// ---- ---- ---- ---- ---- CAMARA FUNCTIONALITY ---- ---- ---- ---- ----

async function initializeCamara() {
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    video.srcObject = stream;
    video.play();
    console.log(stream);
    return stream;
}

// ---- ---- ---- ---- ---- EVENT LISTENERS: BEGIN, RECORD AND STOP BUTTONS ---- ---- ---- ---- ----

videoContainer.style.display = "none";
recordBtn.style.display = "none";
stopBtn.style.display = "none";
uploadBtn.style.display = "none";
timer.style.display = "none";
repeatCaption.style.display = "none";

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

    // Show timer and start counting
    timer.style.display = "flex";
    setInterval(setTime, 1000);
})

stopBtn.addEventListener('click', () => {
    // Hide and show buttons
    stopBtn.style.display = "none";
    uploadBtn.style.display = "flex";
    timer.style.display = "none";

    // Stop recording gif
    recorder.stopRecording( () => {
        blob = recorder.getBlob();
        let url = window.URL.createObjectURL(blob);
        console.log(url);
        //video.src = url;
    });
    
    // Show repeat caption
    repeatCaption.style.display = "block";
    repeatCaption.addEventListener('click', () => location.reload());
})

// ---- ---- ---- ---- ---- ---- UPLOAD PROCESS ---- ---- ---- ---- ---- ----

// Upload created gif to giphy
async function uploadGif() {
    repeatCaption.style.display = "none";
    
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    console.log(form.get('file'));

    let resp = await fetch(uploadUrl, { method: "POST", body: form });
    let data = await resp.json();

    return data;
}

// Fetch endopint and bring created gifs
async function getGifos(id) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${APIKEY}`);
    let content = await response.json();

    return content;
}

// Event on upload button
uploadBtn.addEventListener('click', () => {
    // Change numbers
    changeNumberColorBack(numberTwo);
    numberChangeColor(numberThree);

    // Hide button
    uploadBtn.style.display = "none";

    // Show uploading hover on gif
    videoHover();

    // Upload gif, save it to local storage and show success hover
    uploadGif().then(data => {
        let gifId = data.data.id;
        

        getGifos(gifId).then(content => {
            console.log(content);
            
            // Define url for download button and uploaded gif hover
            let url = content.data.images.original.url;
            successHover(url);

            // Save created gifs to local storage
            let obj = content.data;
            let gifosList = JSON.parse(localStorage.getItem('gifosList'));
            let gifosIndex;

            if (!gifosList) {
                gifosList = [];
                gifosIndex = -1;
            } else {
                gifosIndex = gifosList.findIndex(gifosList => gifosList.id == obj.id);
            }

            if (gifosIndex == -1) {
                gifosList.push(obj);
            } else {
                gifosList.splice(gifosIndex, 1);
                location.reload();
            }

            localStorage.setItem('gifosList', JSON.stringify(gifosList));
        });

        
    });
})

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

// Create hover over gif while uploading
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

// Create hover over gif when uploading was successful
function successHover(url) {
    videoContainer.innerHTML = "";
    let div = document.createElement('div');
    let img = document.createElement('img');
    let text = document.createElement('p');
    let btnsContainer = document.createElement('div');
    let saveBtn = document.createElement('div');
    let linkBtn = document.createElement('div');

    img.src = "../assets/check.svg";
    text.innerText = "GIFO subido con éxito";
    
    div.classList.add('video-hover');
    img.classList.add('succes-hover');
    text.classList.add('video-hover-text');
    btnsContainer.classList.add('video-hover-btns-container');
    saveBtn.classList.add('video-hover-save-btn');
    linkBtn.classList.add('video-hover-link-btn');

    videoContainer.append(div);
    btnsContainer.append(saveBtn, linkBtn);
    div.append(btnsContainer, img, text);

    saveBtn.addEventListener('click', () => downloadGif(url));
    linkBtn.addEventListener('click', () => getLink(url));
}

// Timer 
function setTime() {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds%60);
    minutes.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val) {
    var valString = val + "";
    if(valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}