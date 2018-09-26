var cartoons = ["Futurama", "Family Guy", "South Park", "Spongebob Squarepants", "The Simpsons", "Rick and Morty", "Pokemon", "Ed Edd n Eddy", "King of the Hill", "The Powerpuff Girls", "Hey Arnold!", "Rugrats", "Beavis and Butthead", "Scooby Doo", "The Flintstones"];
function displayCartoonInfo() {
  var cartoon = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=MWXEwFbN7Q4Rj12IfKRCCfaxDriUCbNx&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var cartoonDiv = $("<div class='cartoon'>");
      var state = "moving";
      var giph = results[i].images.fixed_height.url;
      var giphStill = results[i].images.fixed_height_still.url;
      var giphyImage = $("<img>").attr("src", giph);
      //I cant get the image to stop playing on click
      $(giphyImage).on("click", function () {
        if (state === "moving") {
          state = "still";
          giphyImage = $("<img>").attr("src", giphStill);
        } else if (state === "still") {
          giphyImage = $("<img>").attr("src", giph);
          state = "moving";
        }
      });
      cartoonDiv.append(giphyImage);
      var rating = results[i].rating;
      var ratingP = $("<p>").text("Rating: " + rating);
      cartoonDiv.append(ratingP);
      $("#cartoons-view").prepend(cartoonDiv);
    }
  });
}
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < cartoons.length; i++) {
    var a = $("<button>");
    a.addClass("cartoon-btn");
    a.attr("data-name", cartoons[i]);
    a.text(cartoons[i]);
    $("#buttons-view").append(a);
  }
}
$("#add-cartoon").on("click", function (event) {
  event.preventDefault();
  var cartoon = $("#cartoon-input").val().trim();
  cartoons.push(cartoon);
  renderButtons();
});
$(document).on("click", ".cartoon-btn", displayCartoonInfo);
renderButtons();