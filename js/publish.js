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

      // dbForum.on("child_added", function(snapshot){
      //   //console.log(snapshot.key);
      //   console.log(dbForum.child(snapshot.key));
      //   dbForum.child(snapshot.key).on("child_added", function(data){
      //      //console.log(data);
      //     //location.search = snapshot.key;
      //     //dbForum.child(snapshot.key).update({url : "artical.html" + location.search})
      //   })
      // });


      // $(".article").html(content);
      // dbForum.push();
       //location.search = currentUser.uid;
    });
});
