//Retrieving data if database exists
setTimeout(() => {
    if(db)
    {
        let dbTransaction = db.transaction("video", "readonly");
        //Video accessing
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onSuccess = (e) => {
            let videoResult =  videoRequest.result;
            console.log(videoResult);
        }
        //Image accessing
    }    
}, 100);
