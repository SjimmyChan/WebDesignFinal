$(document).ready(function(){
    var dbForum = firebase.database().ref().child('forum');
    var dbUser = firebase.database().ref().child('user');

    dbForum.once("value", function(snapshot){
      var forumId = dbForum.child(snapshot.key).key;
      snapshot.forEach(function(data){
        //console.log(dbForum.child(data.key).key);
        if(location.search === '?' + dbForum.child(data.key).key){
          dbForum.child(data.key).update({
            view : data.val().view+1
          });
          dbUser.once("value", function(snapshot){
            snapshot.forEach(function(userInfo){
              if(userInfo.key === data.val().userId){
                var $image = $("<img>");
                var imgUrl = userInfo.val().imageUrl;
                var author = data.val().author;
                $image.attr("src", imgUrl);

                $($image).css({
                  "width" : "100px",
                  "height" : "100px",
                  "border-radius" : "50%",
                  "margin-left" : "20%",
                  "margin-top" : "10px"
                });

                $('.author-info').html($image);
                $('.author-info').append("<p>"+author+"</p>");
              }
            });
          });
          $('.article-title').html(data.val().title);
          $('.article-title').css({
            "font-size" : "30px"
          });
          if ($(window).width() < 425){
            $('.article-title').css({
              "font-size" : "16px"
            });
          }
          $('.article').html(data.val().content);
        }

      });
    });
});
