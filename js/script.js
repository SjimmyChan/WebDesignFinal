$(document).ready(function(){
  var config = {
     apiKey: "AIzaSyAQ6gGW0gmpB0CKHtEYG3RAlC7ClMcXGkY",
     authDomain: "final-project-2a197.firebaseapp.com",
     databaseURL: "https://final-project-2a197.firebaseio.com",
     projectId: "final-project-2a197",
     storageBucket: "final-project-2a197.appspot.com",
     messagingSenderId: "972244262334"
   };
   firebase.initializeApp(config);

   var dbUser = firebase.database().ref().child('user');
   var dbForum = firebase.database().ref().child('forum');
   var currentUser = firebase.auth().currentUser;

   var photoURL;
   var $img = $('img');
   var originalName;

   const $email = $('#email');
   const $password = $('#password');
   const $name = $('#name');
   const $country = $('#country');
   const $age = $('#age');
   const $btnSignUp = $('#btnSignUp');
   const $file = $('#file');

   const $emailInfo = $('#email-info');
   const $nameInfo = $('#name-info');
   const $countryInfo = $('#country-info');
   const $ageInfo = $('#age-info');
   const $userName = $('#user-name');
   const $profileImage = $('#profile-image');
   const $editProfile = $('#edit-profile');

   const $btnLogIn = $('#btnLogIn');
   const $signInfo = $('#sign-info');
   const $logOut = $('#logOut');

   const $articleList = $('#article-list');

   /*------------Set image------------*/
   var storageRef = firebase.storage().ref();

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];

      var metadata = {
        'contentType': file.type
      };

      storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        photoURL = snapshot.metadata.downloadURLs[0];
        console.log('File available at', photoURL);
      }).catch(function(error) {
        console.error('Upload failed:', error);
      });
    }
    $file.change(handleFileSelect);
    /*-------------------------------------*/
   function findData(currentUser){
     var dbUserInfo = firebase.database().ref('user/' + currentUser.uid);

     dbUserInfo.on("value", function(snapshot){
       var username = snapshot.val().name;
       var email = snapshot.val().email;
       var country = snapshot.val().country;
       var age = snapshot.val().age;
       var imgUrl = snapshot.val().imageUrl;
       var $image = $("<img>");

       $image.attr("src", imgUrl);
       $($image).css({
         "width" : "160px",
         "height" : "160px",  
         "border-radius" : "50%",
         "margin-left" : "20%",
         "margin-bottom" : "10%"
       });
       $userName.html(username);
       $profileImage.html($image);
       $emailInfo.html(email);
       $nameInfo.html(username);
       $countryInfo.html(country);
       $ageInfo.html(age);
     })
   }

   firebase.auth().onAuthStateChanged(function(currentUser){
     if(currentUser){
       $(".no-user").css({"display" : "none"});
       findData(currentUser);
       console.log("Logged In");
     }
     else{
       $(".has-user").css({"display" : "none"});
       console.log("Nobody log in");
     }
   });


   $btnSignUp.click(function(e){
     const email = $email.val();
     const password = $password.val();
     const name = $name.val();
     const country = $country.val();
     const age = $age.val();
     const auth = firebase.auth();

     const promise = auth.createUserWithEmailAndPassword(email, password);
     promise.catch(function(e){
       console.log(e.message);
       $signInfo.html(e.message);
     });
     promise.then(function(currentUser){
       const dbUserid = dbUser.child(currentUser.uid);

       if(currentUser){
         dbUserid.update({
           'email' : email,
           'name' : name,
           'country' : country,
           'age' : age,
           'imageUrl': photoURL
         });
       }
       window.location.href = "index.html";
     });
   });

   $btnLogIn.click(function(e){
     const email = $email.val();
     const password = $password.val();
     const auth = firebase.auth();

     const promise = auth.signInWithEmailAndPassword(email, password);
     promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
     });
     promise.then(function(){
      console.log("Log in success!");
      window.location.href = "index.html";
     });
   });

   $logOut.click(function(){
    firebase.auth().signOut();
    console.log('LogOut');
    window.location.href = "index.html";
   });

   $editProfile.click(function(){
     window.location.href = "profile.html";
   });

   function edit(e, btnType, saveType){
     e.preventDefault();
     var dataset = $(btnType).prev(".data-info");
     originalName = dataset[0].textContent;
     console.log(dataset[0].textContent);
     var saveBtn = $(btnType).next(".saveBtn");
     var id = dataset.attr("id");
     var newid = id + "-form";
     var currval = dataset.text();

     dataset.empty();
     $('<input type="text" name="'+ newid +'" id="'+ newid +'" value="'+currval+'" class="hlite">').appendTo(dataset);
     $('#'+newid+'').css({
       "border-radius" : "2px",
       "height" : "25px",
       "margin-bottom" : "15px",
       "border" : "0px",
       "background-color" : "rgba(156, 155, 149, 0.32)"
     });

     $(btnType).css("display", "none");
     saveBtn.css("display", "block");
   }

   $(".edit-email").on("click", function(e){
     edit(e, this, 'email');
   });

   $(".edit-name").on("click", function(e){
     edit(e, this, 'name');
   });

   $(".edit-country").on("click", function(e){
     edit(e, this, 'country');
   });

   $(".edit-age").on("click", function(e){
     edit(e, this, 'age');
   });

  //  dbUser.on("value", function(snapshot){
  //    var auth = firebase.auth().currentUser;
  //    currentUser = firebase.auth().currentUser;
  //   //  console.log(snapshot.val());
  //    snapshot.forEach(function(userId){
  //      console.log(userId.key);
  //      console.log(currentUser.email,userId.val().email);
  //      if(currentUser.email === userId.val().email){
  //        console.log("Email exists.");
  //      }
  //      else{
  //        console.log("Email doesn't exist.");
  //      }
  //    });
  //  });
   function changeForumAuthor(originalName, newName){
     console.log(originalName, newName);
     dbForum.on("value", function(snapshot){
       snapshot.forEach(function(data){
         if(data.val().author === originalName){
           dbForum.child(data.key).update({
             author : newName
           });
         }
         console.log(data.val().author);
       });
     });
   }

   function updateProfile(infoType, newval, originalName){
       currentUser = firebase.auth().currentUser;
       var dbUserid = dbUser.child(currentUser.uid);
       //console.log(infoType , newval);
       if(currentUser){
         if(infoType === 'email'){
           dbUserid.update({
             email : newval
           });
         }
         else if(infoType === 'name'){
           dbUserid.update({
             name : newval
           });
           changeForumAuthor(originalName, newval);
         }
         else if(infoType === 'country'){
           dbUserid.update({
             country : newval
           });
         }
         else if(infoType === 'age'){
           dbUserid.update({
             age : newval
           });
         }
       }
   }

   function save(e, btnType, infoType){
     e.preventDefault();
     var editLink = $(btnType).prev(".edit-link");
     var dataset = editLink.prev(".data-info");
     var newid = dataset.attr("id");

     var cinput = "#"+newid+"-form";//edit mode
     var einput = $(cinput);
     var newval = einput[0].value;

     $(btnType).css("display", "none");
     einput.remove();
     dataset.html(newval);
     updateProfile(infoType, newval, originalName);

     editLink.css({
       "display" : "block",
       "margin-left" : "85%"
     });
   }

   $(".save-email").on("click", function(e){
     save(e, this, 'email');
   });

   $(".save-name").on("click", function(e){
     save(e, this, 'name');
   });

   $(".save-country").on("click", function(e){
     save(e, this, 'country');
   });

   $(".save-age").on("click", function(e){
     save(e, this, 'age');
   });

});
