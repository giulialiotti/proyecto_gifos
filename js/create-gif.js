const video = document.getElementById('video');
const beginBtn = document.getElementById('beginBtn');
const stopBtn = document.getElementById('stopBtn');
let recorder;

async function initializeCamara() {
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    video.srcObject = stream;
    video.play();

    return stream;
}

initializeCamara().then(
    stream => {
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
)

//Cambiar el beginbtn por startbtn cuando este listo
beginBtn.addEventListener('click', () => {
    recorder.startRecording();
})

stopBtn.addEventListener('click', () => {
    recorder.stopRecording( () => {
        let blob = recorder.getBlob();
        console.log(URL.createObjectURL(blob));
    });
})