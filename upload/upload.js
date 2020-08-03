/* Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBC22ir16BKrU7EUmIljqwAzz_lUO8_EyM",
    authDomain: "virtual-library-9b6cb.firebaseapp.com",
    databaseURL: "https://virtual-library-9b6cb.firebaseio.com",
    projectId: "virtual-library-9b6cb",
    storageBucket: "virtual-library-9b6cb.appspot.com",
    messagingSenderId: "17543754181",
    appId: "1:17543754181:web:cc531be46b1320e1c2dbac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Refer Uploads
var uploadRef = firebase.database().ref('Uploads');

//Listen form submit
document.getElementById('bookform').addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
    e.preventDefault();

    //Get all values
    var BookName = getInputVal('title');
    var Author = getInputVal('author');
    var BookPic = getInputVal('bookPic');
    var Type = getInputVal('type');

    var newUploadRef = uploadRef.push();
    newUploadRef.set({
        BookName: BookName,
        Author: Author,
        BookPic: BookPic,
        Type: Type,
    })
}

//Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}*/
