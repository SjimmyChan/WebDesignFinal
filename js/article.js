$(document).ready(function(){
    var dbForum = firebase.database().ref().child('forum');
    var dbUser = firebase.database().ref().child('user');

    dbForum.on("value", function(snapshot){
      var forumId = dbForum.child(snapshot.key).key;
      //location.search = forumId;
      snapshot.forEach(function(data){
        console.log(dbForum.child(data.key).key);
        if(location.search === '?' + dbForum.child(data.key).key){
          $('.article-title').html(data.val().title);
          $('.article-title').css({
            "font-size" : "30px"
          });
          $('.article').html(data.val().content);
        }

      });
    });
});
