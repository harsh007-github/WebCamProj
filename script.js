let video = document.querySelector("video");
//Record and cpature on click of these
let recordCont = document.querySelector(".recordBtnContainer");
let captureCont = document.querySelector(".captureBtnContainer");
//Animations will be performed on these on click
let recordBtn = document.querySelector(".recordBtn");
let captureBtn = document.querySelector(".captureBtn");
let recorder;
let recordFlag = false;
let chunks = [];

// Permissions needed to entered and with their rquirements (true in this case)
let constraints = {
    audio:true,
    video:true
}

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e)=> {
        chunks = [];
    });
    recorder.addEventListener("dataavailable", (e)=> {
        chunks.push(e.data);
    });
    recorder.addEventListener("stop", (e)=> {
        //Converting chunks to video
        let blob = new Blob(chunks, {type: "video/mp4"});
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "stream.mp4"
        a.click();
    });

})

recordCont.addEventListener("click", (e) => {
    if(!recorder)
    {
        return;
    }
    //Acts as toggle b/w true and false to start and stop recording
    recordFlag = !recordFlag;
    if(recordFlag)
    {
        recorder.start();
        recordBtn.classList.add("scaleRecord");
        startTimer();
    }
    else
    {
        recorder.stop();
        recordBtn.classList.remove("scaleRecord");
        stopTimer();
    }
});
let timer = document.querySelector(".timer");
let timerID;
let cnt = 0;
function startTimer()
{
    timer.style.display = "block";
    function displayTimer()
    {
        let totalTime = cnt;
        let hour = Number.parseInt(cnt / 3600);
        totalTime -= 3600*hour;
        let minutes = Number.parseInt(totalTime / 60);
        totalTime -= Number.parseInt(60*minutes);
        let seconds = totalTime;
        hour = (hour < 10)?`0${hour}`:hour;
        minutes = (minutes < 10)?`0${minutes}`:minutes;
        seconds = (seconds < 10)?`0${seconds}`:seconds;
        timer.innerText = `${hour}:${minutes}:${seconds}`;
        cnt++;
    }
    timerID = setInterval(displayTimer, 1000);
}
function stopTimer()
{
    clearInterval(timerID);
    timer.style.display = "none";
    timer.innerText = "00:00:00";
}
