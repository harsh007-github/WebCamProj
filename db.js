// Open Database
// Create objectStore(just like tables)
let db;
let request = indexedDB.open("fileStorage"); //Opening DB with a certain name
//If Opening DB has any errors
request.onerror = (e) => {
  console.log("DB Error");
  db = request.result;
};
//If Opening DB is successful
request.onsuccess = (e) => {
  console.log("DB Opened Successfully");
};
//If Opening DB is upgraded
request.onupgradeneeded = (e) => {
  console.log("DB Upgraded and intial DB created");
  db = request.result;
  db.createObjectStore("video", { keyPath: "id" });
  db.createObjectStore("image", { keyPath: "id" });
};
