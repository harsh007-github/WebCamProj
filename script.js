let video = document.querySelector("video");
// Record and capture on click of these
let recordCont = document.querySelector(".recordBtnContainer");
let captureCont = document.querySelector(".captureBtnContainer");
// Animations will be performed on these on click
let recordBtn = document.querySelector(".recordBtn");
let captureBtn = document.querySelector(".captureBtn");
let recorder;
let recordFlag = false;
let chunks = [];
let color = "transparent";

// Permissions needed to enter and with their requirements (true in this case)
let constraints = {
    audio: true,
    video: true
};

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e) => {
        chunks = [];
    });
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    });
    recorder.addEventListener("stop", (e) => {
        // Converting chunks to video
        let blob = new Blob(chunks, { type: "video/mp4" });
        // let url = URL.createObjectURL(blob);
        if (db) {
            let dbTransaction = db.transaction("video", "readwrite");
            let videoID = shortid();
            let videoStore = dbTransaction.objectStore("video");
            let videoEntry = {
                id: videoID,
                blobData: blob
            };
            videoStore.add(videoEntry);
        }

        // let a = document.createElement("a");
        // a.href = url;
        // a.download = "stream.mp4"
        // a.click();
    });
});

recordCont.addEventListener("click", (e) => {
    if (!recorder) {
        return;
    }
    // Acts as toggle b/w true and false to start and stop recording
    recordFlag = !recordFlag;
    if (recordFlag) {
        recorder.start();
        recordBtn.classList.add("scaleRecord");
        startTimer();
    } else {
        recorder.stop();
        recordBtn.classList.remove("scaleRecord");
        stopTimer();
    }
});

captureCont.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    let tool = canvas.getContext("2d");
    // Filtering
    
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);
    tool.fillStyle = color;
    tool.fillRect(0, 0, canvas.width, canvas.height);
    let imageURL = canvas.toDataURL();
    if (db) {
        let dbTransaction = db.transaction("image", "readwrite");
        let imageID = shortid();
        let imageStore = dbTransaction.objectStore("image");
        let imageEntry = {
            id: imageID,
            URL: imageURL
        };
        imageStore.add(imageEntry);
    }
    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "capture.jpg";
    a.click();
});

let timer = document.querySelector(".timer");
let timerID;
let cnt = 0;

function startTimer() {
    timer.style.display = "block";
    function displayTimer() {
        let totalTime = cnt;
        let hour = Number.parseInt(cnt / 3600);
        totalTime -= 3600 * hour;
        let minutes = Number.parseInt(totalTime / 60);
        totalTime -= Number.parseInt(60 * minutes);
        let seconds = totalTime;
        hour = (hour < 10) ? `0${hour}` : hour;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        timer.innerText = `${hour}:${minutes}:${seconds}`;
        cnt++;
    }
    timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
    clearInterval(timerID);
    timer.style.display = "none";
    timer.innerText = "00:00:00";
}

// Logic for filter
let filter = document.querySelectorAll(".filter");
let filterLayer = document.querySelector(".filterLayer");

filter.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        let filterElemStyle = getComputedStyle(filterElem);
        color = filterElemStyle.backgroundColor;
        filterLayer.style.backgroundColor = color;
    });
});
