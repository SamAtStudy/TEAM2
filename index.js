  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBf-_S6h6ybBzPpwhCtYB-AICvJ8hQEvb0",
    authDomain: "team-1d4e6.firebaseapp.com",
    databaseURL: "https://team-1d4e6.firebaseio.com",
    projectId: "team-1d4e6",
    storageBucket: "team-1d4e6.appspot.com",
    messagingSenderId: "85845550674",
    appId: "1:85845550674:web:7136f9c0ade1e80607e18b",
    measurementId: "G-4YM5EKWCZN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
    var email = $("#email").val();
    var password = $("#password").val();

    if(email != "" && password != "")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message: " + errorMessage);
        });
    }

    else
    {
        window.alert("Please enter your email and password");
    }
  });

  $("#btn-logout").click(function(){
    firebase.auth().signOut();
  });

  $("#btn-signup").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmpassword").val();
    var username = $("#username").val();

    if(email != "" && password != "" && cpassword!= "")
    {
        console.log(password);
        console.log(cpassword);
        if(password == cpassword)
        {
          var result = firebase.auth().createUserWithEmailAndPassword(email, password);
          var ref = new Firebase ("");
         result.catch(function(error)
          {
          var errorCode = error.code;
          var errorMessage = error.message;
          
          console.log(errorMessage);
          window.alert("Message : " + errorMessage);
        });
        }

        else{
          window.alert("Password and Confirm password do not match");
        }
    }

    else{
      window.alert("Form is incomplete");
    }
  });
