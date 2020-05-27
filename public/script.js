$(document).ready(function () {
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

    $("#add-submit").on("click", function (event) {
        var movieClub = {
            eventTitle: $("#eventTitle").val().trim(),
            date: $("#eventDate").val(),
            time: $("#eventTime").val(),
            movieTitle: $("#add-card-title").val().trim()
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
    for (let i = 1; i <= 7; i++){
        var title = $("<h5>").text(moment().add(i, 'days').format("MMM Do YY"));
        $(title).attr("data-date", moment().add(i, 'days').format("MMM Do YY"));
        $("#day-" + i).append(title);
    }
    $(".index-submit").on("click", function (event){
        event.preventDefault();
        console.log($(this).attr("data-date"));
        $(".hide").removeClass("hide");
    })
})