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
			
			var table = document.getElementById("song-table");

			for (var index = 0; index < data.length; index++)
			{
				var row = table.insertRow(0);

				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);

				cell1.innerHTML = data[index].name;
				cell2.innerHTML = data[index].popularity;
			}
		});
			
		$.get(spotifyBaseURL + currTrackID, function(data) {
			console.log(data);
		});
    });
});
