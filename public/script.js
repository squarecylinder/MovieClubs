$(document).ready(function () {
    for (let i = 0; i < 7; i++) {
        var title = $("<h5>").text(moment().add(i, 'days').format("MMM Do YY"));
        var button = $("<a>").attr("href", "#").addClass("index-submit btn btn-primary").text("Schedule a movie!");
        $(title).addClass("card-title");
        $(button).attr("data-date", moment().add(i, 'days').format("MMM Do YY"));
        $("#day-" + i).append(title, button);
    }
    $.get("/api/movieclubs", function (results) {
    }).then(function (results) {
        for(let j = 0; j < results.length; j++){
            switch (results[j].date){
                case moment().add(0, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-0").append(clubTitle.append(body));
                    break;
            }
            switch (results[j].date){
                case moment().add(1, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-1").append(clubTitle.append(body));
                    break;
            }
            switch (results[j].date){
                case moment().add(2, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-2").append(clubTitle.append(body));
                    break;
            }
            switch (results[j].date){
                case moment().add(3, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-3").append(clubTitle.append(body));
                    break;
            }
            switch (results[j].date){
                case moment().add(4, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-4").append(clubTitle.append(body));
                    break;
            }
            switch (results[j].date){
                case moment().add(5, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-5").append(clubTitle.append(body));
                    break;
            }
            switch (results[j].date){
                case moment().add(6, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $("#day-6").append(clubTitle.append(body));
                    break;
            }
        }
    });
    $(".index-submit").on("click", function (event) {
        event.preventDefault();
        var movieDate = $(this).attr("data-date");
        $(".hide").removeClass("hide");
        $("#search-btn").on("click", function (event) {
            event.preventDefault();
            var newSearch = {
                title: $("#search").val().trim()
            };
            $.ajax({
                method: "GET",
                url: "http://www.omdbapi.com/?t=" + newSearch.title + "&apikey=5868d549",
            }).then(function (data) {
                $.post("/api/add", { title: data.Title, date: movieDate, poster: data.Poster, plot: data.Plot })
                    .then(function () {
                        window.location.replace("add");
                    });
            });
        });
    });

    $("#add-submit").on("click", function (event) {
        var movieClub = {
            eventTitle: $("#eventTitle").val().trim(),
            date: $("#add-card-date").attr("data-date"),
            time: $("#eventTime").val(),
            movieTitle: $("#add-card-title").attr("data-title")
        };
        if (movieClub.time === ''){
            alert("Please enter a valid time");
            return;
        }
        event.preventDefault();
        $.post("/api/movieclubs", movieClub)
            .then(function () {
                window.location.replace('/');
            });
    });

    $("#events-btn").on("click", function (event) {
        $.get("/api/movieclubs").then(function(){
            // window.location.href = "/events"
        })
    });


    $("#add-cancel").on("click", function (event) {
        event.preventDefault();
        window.location.href = "/";
    });

});


