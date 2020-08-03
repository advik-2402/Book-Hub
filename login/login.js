// Your web app's Firebase configuration
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

//Refer registeration
var registerationRef = firebase.database().ref('Registrations');
var loginRef = firebase.database().ref('Logins');

//Listen form submit
document.getElementById('login').addEventListener('submit', submitForm2);
document.getElementById('register').addEventListener('submit', submitForm);

//Submit form
function submitForm(e) {
    e.preventDefault();
    //console.log(123);

    //Get all values
    var name = getInputVal('name');
    var contact = getInputVal('phone');
    var address = getInputVal('address');
    var email = getInputVal('email');
    var password = getInputVal('password');

    var newRegisterRef = registerationRef.push();
    newRegisterRef.set({
        name: name,
        contact: contact,
        address: address,
        email: email,
        password: password,
    })

    //console.log(email);
    //console.log(password);

    //Show Alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 5 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 5000);
}

function submitForm2(e) {
    e.preventDefault();
    //console.log(123);

    //Get all values
    var email = getInputVal('email');
    var password = getInputVal('password');

    var newLoginRef = loginRef.push();
    newLoginRef.set({
        email: email,
        password: password,
    })

    //console.log(email);
    //console.log(password);

    //Show Alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 5 seconds
    setTimeout(function () {
        document.querySelector('.alert2').style.display = 'none';
    }, 5000);
}

//Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

//Function to save registration to firebase
/*function saveRegister(name, contact, address, email, password) {
    var newRegisterRef = registerationRef.push();
    newRegisterRef.set({
        name: name,
        contact: contact,
        address: address,
        email: email,
        password: password,
    })
}*/