$(document).ready(function(){
    var editor = CKEDITOR.replace('content');
    var dbUser = firebase.database().ref().child('user');
    var dbForum = firebase.database().ref().child('forum');

    const $submitBtn = $('#submit-btn');
    const $articleTitle = $('#edit-article-content');
    const $articleContent = $('#article-content');

    var content;
    editor.on('change', function(evt){
      console.log(evt.editor.getData());
      content = evt.editor.getData();
    });

    $submitBtn.click(function(e){
      currentUser = firebase.auth().currentUser;
      var name;
      dbUser.on("value", function(snapshot){
        snapshot.forEach(function(userId){
          if(userId.key === currentUser.uid){
            console.log(userId.val().name);
            name = userId.val().name;
            console.log($articleTitle[0].value);
            console.log(content);
            console.log(name);
            dbForum.push({
              author : name,
              title : $articleTitle[0].value,
              content : content,
              userId : currentUser.uid,
              view: 0
            });
            dbForum.on("value", function(snapshot){
              for(var i = 0; i < Object.keys(snapshot.val()).length; i++){
                if(i === Object.keys(snapshot.val()).length - 1){
                  var articleId = Object.keys(snapshot.val())[i];
                  window.location.href = "article.html?" + articleId;
                }
              }
            });
          }
        });
      });
    });
});
