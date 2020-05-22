$(document).ready(function () {
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        console.log("hitting the search button")
        var newSearch = {
            title: $("#search").val().trim()
        };
        $.ajax({
            method: "GET",
            url: "http://www.omdbapi.com/?t=" + newSearch.title + "&apikey=5868d549",
        }).then(function (data) {
            console.log(data)
            $.post("/api/add", {title: data.Title, poster: data.Poster, plot: data.Plot})
        });
    });
    // function renderSearch(data) {
    //     var newIMG = data.Poster;
    //     var newTitle = data.Title;
    //     var newBody = data.Plot;
    //     $("add-card-img").attr("src", newIMG);
    // }
})