$(document).ready(function(){
    const $articleList = $('#article-list');
    const $publishBtn = $('#publish-btn');

    $publishBtn.click(function(e){
      firebase.auth().onAuthStateChanged(function(currentUser){
        if(currentUser){
          $(".no-user").css({"display" : "none"});
          console.log("Logged In");
          window.location.href = "publish_article.html";
        }
        else{
          $(".has-user").css({"display" : "none"});
          alert("Please log in first!");
          window.location.href = "log_in.html";
        }
      });
    });
});
