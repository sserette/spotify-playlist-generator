$(document).ready(function() {
    let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	
    $.get(url, function(data) {
        console.log(data);
    });
	
	let aiBaseURL = "/api/ai?endpoint=";
	let spotifyBaseURL = "/api/spotify?endpoint=/v1/recommendations?seed_tracks=";
	
	$("#search-button").click(function(){
		var currTrackID = document.getElementById("id-input").value;
		
		$.get(aiBaseURL + currTrackID, function(data) {
			console.log(data);
			});
			
		$.get(spotifyBaseURL + currTrackID, function(data) {
			console.log(data);
			});
    });
});
