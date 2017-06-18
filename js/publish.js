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
              url : "article.html?" + currentUser.uid
            });
          }
        });
      });

      // $(".article").html(content);

      // dbForum.push();
       //window.location.href = "article.html?" + currentUser.uid;
       //location.search = currentUser.uid;
    });
});
