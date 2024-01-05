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
    }
    else
    {
        recorder.stop();
        recordBtn.classList.remove("scaleRecord");
    }
});
