$("#articles").on("click", "h3", function () {
    $("#notes").empty();
    var articleID = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + articleID
    })
        .done(function (data) {
      
            $("#notes").append("<h3>Enter a note for " + data.headline + "...</h3><br/>");
          
            $("#notes").append("Note Title:<br/> <input id='titleinput' name='title' ><br/>");
        
            $("#notes").append("Comments:<br/> <textarea id='bodyinput' name='body'></textarea><br/>");
           
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");


            if (data.note) {
              
                $("#titleinput").val(data.note.title);
               
                $("#bodyinput").val(data.note.body);
       
                $("#notes").append("<button data-id='" + data.note._id + "' id='delnote'>Delete Note</button>");
            }
        });
});


$(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");


    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {

            title: $("#titleinput").val(),
      
            body: $("#bodyinput").val()
        }
    })

        .done(function (data) {
      
            console.log(data);
     
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});



$("#notes").on("click", "#delnote", function () {
    $("#notes").empty();

    $.ajax({
        method: "POST",
        url: "/delnote/" + $(this).attr("data-id")
    })
    
        .done(function (data) {

        });
});


$("#articles").on("click", "#delmovie", function () {
    console.log("delmovie button clicked");

    $.ajax({
        method: "POST",
        url: "/delmovie/" + $(this).attr("data-id")
    })

        .done(function (data) {
            $("#notes").append(data);

            $.getJSON("/movies", function (data) {
                $("#articles").html("<h2>Saved Movies</h2><hr/>");
            
                for (var i = 0; i < data.length; i++) {
          
                    $("#articles").append("<h3 data-id='" + data[i]._id + "'>" + data[i].headline + "</h3>");
                    $("#articles").append(data[i].link + "<br/>" + data[i].summary + "<br/>")
                    $("#articles").append("<button data-id='" + data[i]._id + "' id='delmovie'>Delete Movie</button><br/><hr>");
                }
            });
        });
});



$("#articles").on("click", "#savemovie", function () {
    console.log("savemovie button clicked");

    $.ajax({
        method: "POST",
        url: "/savemovie/" + $(this).attr("data-id")
    })
  
        .done(function (data) {
     
            $("#notes").append(data);
        });

});