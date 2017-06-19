$(document).ready(function(){
    var dbForum = firebase.database().ref().child('forum');
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

    dbForum.limitToLast(1000).on("value", function(snapshot){
      snapshot.forEach(function(data){
        console.log(data.key);
        var link = "<a href='article.html?"+data.key+"'>"+data.val().title+"</a>";
        var author = data.val().author;
        $('#article-list').append("<tr><td>"+ link +" </td><td>"+ author +"</td></tr>");
        // $('#article-list').append("<a href='article.html?"+data.key+"'>"+data.val().title+"</a>" + "<br>");
        // $('#article-author').append(data.val().author + "<br>");
        //
        // $('#article-list').css({
        //   "margin-right" : "10%"
        // });

      });
    });
});
