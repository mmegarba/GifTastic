var topics = ["duck", "mouse", "chicken"];



for (var i = 0; i < topics.length; i++) {

var newButton  = $("<button>");
newButton.attr("value", topics[i]);
newButton.text(topics[i])
newButton.attr("class", "button")

$("#ButtonsDiv").append(newButton);
}





$("#ButtonsDiv").on("click",".button", function(){

var searchTerm = $(this).attr("value")

console.log($(this))

grabGiphy(searchTerm)

});



function grabGiphy(searchTerm){
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

console.log(searchTerm);

$.ajax({
url:queryURL,
method:"GET",

}).done(function(response){
console.log(response);
console.log(response.data[0].embed_url);

for (var i = 0; i < response.data.length; i++) {

  var newgif = $("<img>")
  newgif.attr("src", response.data[i].images.fixed_height_still.url)
  newgif.attr("data-still", response.data[i].images.fixed_height_still.url)
  newgif.attr("data-state", "still");
  newgif.attr("data-animate", response.data[i].images.fixed_height.url)
  newgif.attr("class", "gif")


  $("#displayDiv").after(newgif);



}


});
};


$(document.body).on('click', '.gif' ,function(){


if($(this).attr("data-state") === "still")

{


  $(this).attr("src", "");

  $(this).attr("data-state","animate");

}

if($(this).attr("data-state") === "animate")
{

  $(this).attr("src", $(this).attr("data-still"));

  $(this).attr("data-state","still");

}

});
