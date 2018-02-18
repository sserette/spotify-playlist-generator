var numTracks = 10;

var getIDOfMostPopular = function(trackArray){
	if (trackArray.length < 1)
		Alert("No tracks in array in getIDOfMostPopular");
	
	var highestPopIndex = 0;
	
	for(var i = 1; i < trackArray.length; i++)
	{
		var currentPop = trackArray[i].popularity;
		if (currentPop > trackArray[highestPopIndex].popularity)
			highestPopIndex = i;
	}
	
	alert("Most pop: " + trackArray[highestPopIndex].popularity);
	return trackArray[highestPopIndex].id;
}

$(document).ready(function() {
    let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	
    $.get(url, function(data) {
        console.log(data);
    });
	
	let recommendationsBaseURL = "/api/spotify?endpoint=/v1/recommendations?seed_tracks=";
	
	$("#search-button").click(function(){
		var currTrackID = document.getElementById("id-input").value;
		
		for (var count = 0; count < numTracks; count++) {
			$.get(recommendationsBaseURL + currTrackID, function(data) {
			console.log(data);
			currTrackID = getIDOfMostPopular(data.tracks);
			});
		}
    });
});
