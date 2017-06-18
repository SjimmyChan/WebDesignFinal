$(document).ready(function(){
    var dbForum = firebase.database().ref().child('forum');
    var dbUser = firebase.database().ref().child('user');

    dbForum.on("value", function(snapshot){
      snapshot.forEach(function(data){
        console.log(data.val().title);
        $('.article-title').html(data.val().title);
        $('.article-title').css({
          "font-size" : "30px"
        });
        $('.article').html(data.val().content);
      });
    });
});
