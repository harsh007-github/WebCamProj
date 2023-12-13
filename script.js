let video = document.querySelector("video");

// Permissions needed to entered and with their rquirements (true in this case)
let constraints = {
    audio:true,
    video:true
}

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
})
