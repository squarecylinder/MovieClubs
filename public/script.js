$(document).ready(function () {
    // Populating 7 cards on the main screen for each day starting from today.
    for (let i = 0; i < 7; i++) {
        // Creating a card-title that has a day in it, today - 7 days out
        var title = $("<h5>").text(moment().add(i, 'days').format("MMM Do YY"));
        // Creating a "button" that allows the user to schedule a club, clicking this button doesn't actually
        // schedule the club, rather it shows a hidden form that allows a user to search. This button saves the day
        // that the user clicks to scheduele the club on the appropriate day.
        var button = $("<a>").attr("href", "#").addClass("index-submit btn btn-primary").text("Schedule a Club!");
        // Just adding a card-title.
        $(title).addClass("card-title");
        // This is where we save the day to a data-* attribute
        $(button).attr("data-date", moment().add(i, 'days').format("MMM Do YY"));
        // Appends the cards to day 0 - 6 and then appends the title and button
        $("#day-" + i).append(title, button);
    }
    // After the page loads, we run another check to see if their are any clubs currently scheduled
    // This code GETs everything from our /api/movieclubs
    $.get("/api/movieclubs", function () {
    }).then(function (results) {
        // If a result shows up we loop through the length of our movieclubs database
        for(let j = 0; j < results.length; j++){
            // We then check if the day that it was scheduled for matches a day on a card
            switch (results[j].date){
                // Checks to see if the date from our result matches the first day or day 0
                case moment().add(0, 'days').format("MMM Do YY"):
                    // Creating the title of the card
                    var clubTitle = $("<p>");
                    // Creating our "button" with the text of the club title
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    // Saves the data-id so that it will be unique to that club and match our database id scheme but on the front end
                    $(body).attr("data-id", j + 1);
                    // Then we append to the appropriate card, repeat this for ever case.
                    $("#day-0").append(clubTitle.append(body));
                    break;
                    // Checks to see if the date from our result matches the second day or day 1
                case moment().add(1, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $(body).attr("data-id", j + 1);
                    $("#day-1").append(clubTitle.append(body));
                    break;
                    // Checks to see if the date from our result matches the third day or day 2
                case moment().add(2, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $(body).attr("data-id", j + 1);
                    $("#day-2").append(clubTitle.append(body));
                    break;
                    // Checks to see if the date from our result matches the fourth day or day 3
                case moment().add(3, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $(body).attr("data-id", j + 1);
                    $("#day-3").append(clubTitle.append(body));
                    break;
                    // Checks to see if the date from our result matches the fifth day or day 4
                case moment().add(4, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $(body).attr("data-id", j + 1);
                    $("#day-4").append(clubTitle.append(body));
                    break;
                    // Checks to see if the date from our result matches the sixth day or day 5
                case moment().add(5, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $(body).attr("data-id", j + 1);
                    $("#day-5").append(clubTitle.append(body));
                    break;
                    // Checks to see if the date from our result matches the seventh day or day 6
                case moment().add(6, 'days').format("MMM Do YY"):
                    var clubTitle = $("<p>");
                    var body = $("<a>").attr("href", "#").addClass("index-clubs btn btn-danger card-text").text(results[j].eventTitle)
                    $(body).attr("data-id", j + 1);
                    $("#day-6").append(clubTitle.append(body));
                    break;
            }
        }
        // Making an onclick event on the button that we created for appending clubs on the days
        $(".index-clubs").on("click", function(event) {
            console.log("pressing the index-club button");
            // Saves the id of the movie club to a variable when you click the button, we use this to check it against
            // another call so that the club we are going to RSVP on is the club we want
            var guestList = {
                MovieClubId: $(this).attr("data-id")
            }
            console.log($(this).attr("data-id"));
            // POST to RSVP the object of MovieClubId and its id
            // This may need to be a GET?
            $.post("/api/rsvp", guestList).then(function(){
                console.log("It posted to the api");
                // This will then take you to the RSVP page so the user can rsvp
                window.location.replace("rsvp");
            })
        })
    });
    // The "Schedule a Club" button on the day cards
    $(".index-submit").on("click", function (event) {
        // This saves the date of the club so we can use it later!
        var movieDate = $(this).attr("data-date");
        // Shows the hidden button
        $(".hide").removeClass("hide");
        // This is the hidden input form that shows up when clicking "Schedule a Club" button
        $("#search-btn").on("click", function (event) {
            // We use a preventDefault here just incase the movie search doesn't return before the page refreshes once the user
            // hits submit!
            event.preventDefault();
            // Saving the user input into a value we can use to search OMDBs api
            var newSearch = $("#search").val().trim()
            // ajax call to OMDB
            $.ajax({
                // The method is GET because we want data as a response
                method: "GET",
                // This is the URL + UserInput + apikey
                url: "http://www.omdbapi.com/?t=" + newSearch + "&apikey=5868d549",
                // After the call we want to do something with the data.
            }).then(function (data) {
                // We post this to the /api/add as an object because this object correlates to our Search Database
                // We will be using this to populate our add page with handlebars
                $.post("/api/add", { title: data.Title, date: movieDate, poster: data.Poster, plot: data.Plot })
                    // finally we use a .then so it waits until everything is done before it changes the window location to our add page
                    .then(function () {
                        window.location.replace("add");
                    });
            });
        });
    });
    // The submit button on our add handlebars page, waits for an onclick event!
    $("#add-submit").on("click", function (event) {
        // Creating an object that we can save in our movieclubs table
        var movieClub = {
            // Grabs the event title from user input
            eventTitle: $("#eventTitle").val().trim(),
            // Grabs the date from the cards data-date attr
            date: $("#add-card-date").attr("data-date"),
            // Grabs the time from the user input
            time: $("#eventTime").val(),
            // Grabs the movie title from the cards data-title attr
            movieTitle: $("#add-card-title").attr("data-title")
        };
        // if the time is empty, prompts the user to enter a valid time!
        if (movieClub.time === ''){
            alert("Please enter a valid time");
            return;
        }
        // POST our movie club 
        $.post("/api/movieclubs", movieClub)
            // Once its posted we change the page back to the index page.
            .then(function () {
                window.location.replace('/');
            });
    });
    // If the user input the wrong movie, or its not on OMDB, then they can go back to the main page
    // by hitting the cancel button on the add page.
    $("#add-cancel").on("click", function (event) {
        window.location.replace('/');
    });

});


