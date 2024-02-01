// Open Database
// Create objectStore(just like tables)
let db;
let request = indexedDB.open("fileStorage");
request.onerror= (e)=> {
    console.log("DB Error");
    db = request.result; 
};
request.onsuccess = (e) => {
    console.log("DB Opened Successfully");
};
request.onupgradeneeded = (e)=> {
    console.log("DB Upgraded and intial DB created");
    db = request.result; 
    db.createObjectStore("video", { keyPath: "id" });
    db.createObjectStore("image", { keyPath: "id" });
};