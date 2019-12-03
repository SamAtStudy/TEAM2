'use strict';
window.onload = function () {
  this.openDialog();
 // this.closeModal();
}
// Signs-in Accommodate.
function signIn() {
  // Sign into Firebase using popup auth & Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out of Accommodate.
function signOut() {
  // Sign out of Firebase.
  firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns the signed-in user's email
function getUserEmail() {
  return firebase.auth().currentUser.email;
}

//Returns the signed-in user's email
function getUserPhoneNumber() {
  return firebase.auth().currentUser.phoneNumber;
}

// Returns the sign-in user's ID
function getUserID(){
  // return firebase.auth().currentUser.uid;
  const authPromise=()=>{
    return new Promise((resolve, reject)=>{
      const user = firebase.auth().currentUser;
      console.log(user.email)
    })
  }
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile information.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();
    var userEmail = getUserEmail();
    var userPhoneNumber = getUserPhoneNumber();

    // Set the user's profile information.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userPicProfileElement.src = addSizeToGoogleProfilePic(profilePicUrl);
    userNameElement.textContent = userName;
    userNameProfileElement.textContent = userName;
    userEmailElement.textContent = userEmail;
    userPhoneNumberElement.textContent = userPhoneNumber;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');
    showModal.removeAttribute('hidden');
    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');
    showModal.setAttribute('hidden', true);

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var userPicElement = document.getElementById('user-pic');
var userPicProfileElement = document.getElementById('user-pic-profile');
var userNameElement = document.getElementById('user-name');
var userNameProfileElement = document.getElementById('user-name-profile');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');
var userEmailElement = document.getElementById('user-email');
var userPhoneNumberElement = document.getElementById('user-phone-number');
var showModal = document.getElementById('modal');
var userId = getUserID();

// Saves message on form submit.
// messageFormElement.addEventListener('submit', onMessageFormSubmit);
signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);

// initialize Firebase
initFirebaseAuth();

// Function to open the dialog to choose student or landlord
function openDialog() {
  $("sign-in").click(function () {
    document.getElementById('modal').style.display = "block";
  })

  if (isUserSignedIn() == true) {
    document.getElementById('modal').style.display = "none";
  }
}

var database = firebase.database();

// Updating status of user to database
function writeUserData() {
  var email = getUserEmail();
  var isLandlord = document.querySelector('input[name="type"]:checked').value;
  if (isLandlord == 'landlord') {
    firebase.database().ref('Userdata/' + userId).set({
      name: getUserName(),
      email: getUserEmail(),
      phoneNumber: getUserPhoneNumber(),
      isLandlord: true,
      clicked: true
    })
  }
  else {
    firebase.database().ref('Userdata/' + userId).set({
      name: getUserName(),
      email: getUserEmail(),
      phoneNumber: getUserPhoneNumber(),
      isLandlord: false,
      clicked: true
    })
  }
  closeModal();
}

// Close modal once submit button is clicked
function closeModal() {
  var clicked = firebase.database().ref('Userdata/' + userId + '/clicked');
  clicked.on('value', function(snapshot){
    if(snapshot.val() == false) {
      document.getElementById('modal').style.display = 'block';
    }
    else {
      document.getElementById('modal').style.display = 'none';
    }
  })
}