const video = document.getElementById('video');
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

video.style.display = "none";

async function initializeCamara() {
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    video.srcObject = stream;
    video.play();
    console.log(stream);
    return stream;
}

// ---- ---- ---- ---- ---- BUTTONS AND TEXT ---- ---- ---- ---- ----

recordBtn.style.display = "none";
stopBtn.style.display = "none";
uploadBtn.style.display = "none";

beginBtn.addEventListener('click', () => {
    // Change text 
    createGifTitle.innerHTML = `<h2>¿Nos das acceso<br>a tu cámara?</h2>`;
    createGifTextFirstLine.innerText = 'El acceso a tu camara será válido sólo';
    createGifTextSecondLine.innerText = 'por el tiempo en el que estés creando el GIFO.';

    // Hide begin button
    beginBtn.style.display = "none";

    // Number 1 changes color
    numberChangeColor(numberOne);

    // Ask permission to use the camera
    initializeCamara().then(
        stream => {
            createGifText.style.display = "none";
            video.style.display = "block";
            changeNumberColorBack(numberOne);
            numberChangeColor(numberTwo);
            recordBtn.style.display = "flex";
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

    // Start recording gif
    recorder.startRecording();
})

stopBtn.addEventListener('click', () => {
    // Stop recording gif
    recorder.stopRecording( () => {
        let blob = recorder.getBlob();
        console.log(URL.createObjectURL(blob));
    });
})

// Change the color of the numbers when each of them is active
function numberChangeColor(number) {
    number.style.color = "#FFFFFF";
    number.style.background = "#572EE5";
}

function changeNumberColorBack(number) {
    number.style.color = "#572EE5";
    number.style.background = "#FFFFFF";
}