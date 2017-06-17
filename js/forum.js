$(document).ready(function(){
    var editor = CKEDITOR.replace('content');

    var dbForum = firebase.database().ref().child('forum');

    const $articleList = $('#article-list');
    const $publishBtn = $('#publish-btn');
    const $submitBtn = $('#submit-btn');
    const $articleTitle = $('#title-area');
    const $articleContent = $('#article-content');

    var content;
    editor.on('change', function(evt){
      console.log(evt.editor.getData());
      content = evt.editor.getData();
    })

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

    $submitBtn.click(function(e){
      currentUser = firebase.auth().currentUser;
      console.log($articleTitle[0].value);
      console.log(content);
      $(".article").html(content);
      //location.search = currentUser.uid;
      console.log(location.search);
      //window.location.href = "article.html";
    });
});
