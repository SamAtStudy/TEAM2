// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCXHMXYetxYwcXiWr9P4q7G00aca9NWWeE",
    authDomain: "accommodate-51e89.firebaseapp.com",
    databaseURL: "https://accommodate-51e89.firebaseio.com",
    projectId: "accommodate-51e89",
    storageBucket: "accommodate-51e89.appspot.com",
    messagingSenderId: "836579640070",
    appId: "1:836579640070:web:843813bc346aaa49635487",
    measurementId: "G-G5K8XF1YQM"
  };
  firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('/ContactForm');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();
  

  //Get value
  var name = getInputVal('name');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get form value
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    phone: phone,
    message: message
  });
}
