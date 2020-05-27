$(document).ready(function () {
    for (let i = 1; i <= 7; i++){
        var title = $("<h5>").text(moment().add(i, 'days').format("MMM Do YY"));
        var button = $("<a>").attr("href", "#").addClass("index-submit btn btn-primary").text("Schedule a movie!");
        $(title).addClass("card-title");
        $(button).attr("data-date", moment().add(i, 'days').format("MMM Do YY"));
        $("#day-" + i).append(title, button);
    }
    $(".index-submit").on("click", function (event){
        event.preventDefault();
        var movieDate = $(this).attr("data-date");
        $(".hide").removeClass("hide");
    });

    $("#add-submit").on("click", function (event) {
        var movieClub = {
            eventTitle: $("#eventTitle").val().trim(),
            date: $("#eventDate").val(),
            time: $("#eventTime").val(),
            movieTitle: $("#add-card-title").attr("data-title")
        };
        event.preventDefault();
        $.post("/api/movieclubs", movieClub)
        .then(function(){
            window.location.replace('/');
        });
    });
    $("#events-btn").on("click", function (event) {
        event.preventDefault();
        window.location.replace("events");
    });
    
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var newSearch = {
            title: $("#search").val().trim()
        };
        $.ajax({
            method: "GET",
            url: "http://www.omdbapi.com/?t=" + newSearch.title + "&apikey=5868d549",
        }).then(function (data) {
            $.post("/api/add", {title: data.Title, poster: data.Poster, plot: data.Plot})
            .then(function(){
                window.location.replace("add");
            });
        });
    });

    $("#add-cancel").on("click", function (event) {
        event.preventDefault();
        window.location.href = "/";
    });
    })
