//create an array of cartoons

var cartoons = ["The Simpsons", "Rugrats", "Dexters laboratory", "Teenage Mutant Ninja Turtles", "South Park", "Hey Arnold", "The Powerpuff Girls", "Pinky and the Brain", "Daria", "Dragon Ball Z", "Beavis and Butt-head", "CatDog", "Ed, Edd n Eddy", "SpongeBob SquarePants", "Pokemon", "Courage the Cowardly Dog",];

//create a button form each show

function makeButton(){
    $("#buttons").empty();
    for (var i = 0; i < cartoons.length; i++){
        var a = $("<button>")
        a.addClass("cartoon");
        a.attr("data-name", cartoons[i]);
        a.text(cartoons[i]);
        $("#buttons").append(a);
    }
}

makeButton();

//create a function to add a new cartoon

$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    var newCartoon = $("#cartoon-input").val().trim();
    cartoons.push(newCartoon);
    makeButton();
})

//create a function that displays the gifs

function gifsDisplay(){
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=9&api_key=dc6zaTOxFJmzC";

    $.ajax({url : queryURL, method : "GET"}).done(function(response) {
        console.log(response.data);
        var results = response.data;
        for (var i = 0; i < results.length; i++){
            var gifsDiv = $("<div class=gifs>");
            var gifs = $("<img>");
            gifs.attr('src', results[i].images.fixed_height_still.url);
            gifs.attr("title", "Rating: " + results[i].rating);
            gifs.attr("data-still", results[i].images.fixed_height_still.url);
            gifs.attr("data-state", "still");
            gifs.addClass("gif");
            gifs.attr("data-animate", results[i].images.fixed_height.url);
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            gifsDiv.append(gifs);
            gifsDiv.append(p);

            $("#gifsShow").prepend(gifsDiv);
        }
    });

}

//function to animate the gifs

$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
        if( state === "still"){
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        };
});

$(document).on("click", ".cartoon", gifsDisplay);
