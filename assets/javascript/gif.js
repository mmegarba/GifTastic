
var topics = ["duck", "mouse", "chicken"];

$(document).ready(function() {

for (var i = 0; i < topics.length; i++) {

var newButton  = $("<button>");
newButton.attr("value", topics[i]);
newButton.text(topics[i])
newButton.attr("class", "button")

$("#ButtonsDiv").append(newButton);
}
});




$("#ButtonsDiv").on("click",".button", function(){

var searchTerm = $(this).attr("value")

grabGiphy(searchTerm)

});



function grabGiphy(searchTerm){
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";


$.ajax({
url:queryURL,
method:"GET",

}).done(function(response){

  $("#displayDiv").empty();

for (var i = 0; i < response.data.length; i++) {

  var newgif = $("<img>");
  var newFrame = $("<div>");
  newFrame.attr("class", "imgFrame")
  var newP = $("<p>");
  newP.text("Rating: " + response.data[i].rating);

  newgif.attr("src", response.data[i].images.fixed_height_still.url);
  newgif.attr("data-still", response.data[i].images.fixed_height_still.url);
  newgif.attr("data-state", "still");
  newgif.attr("data-animate", response.data[i].images.fixed_height.url);
  newgif.attr("class", "gif");

  newFrame.append(newP);
  newFrame.append(newgif);
  $("#displayDiv").after(newFrame);



}


});
};

$(document.body).on('click', '.gif' ,function(){

var state = $(this).attr("data-state");

if(state === "still")

{
  $(this).attr("src", $(this).attr("data-animate"));

  $(this).attr("data-state","animate");


}

if(state === "animate")
{

  $(this).attr("src", $(this).attr("data-still"));

  $(this).attr("data-state","still");

}

});


$("#submitInput").on("click", function(){

  event.preventDefault();

  var userInput = $("#newInput").val();

  grabGiphy(userInput);
});
