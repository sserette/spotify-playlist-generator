var insertTableHeader = function(table){
	var header = table.createTHead();
	var headerRow = header.insertRow(0);  
	
	var headerRow = document.getElementById('song-table').tHead.children[0],

	headerCell = document.createElement('th');
	headerCell.innerHTML = "Name";
	headerRow.appendChild(headerCell);

	headerCell = document.createElement('th');
	headerCell.innerHTML = "Album";
	headerRow.appendChild(headerCell);

	headerCell = document.createElement('th');
	headerCell.innerHTML = "Artists";
	headerRow.appendChild(headerCell);

	headerCell = document.createElement('th');
	headerCell.innerHTML = "Popularity";
	headerRow.appendChild(headerCell);
}

$(document).ready(function() {
    let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	
    $.get(url, function(data) {
        console.log(data);
    });
	
	let aiBaseURL = "/api/ai?endpoint="; //Move to back end
	let spotifyBaseURL = "/api/spotify?endpoint=/v1/recommendations?seed_tracks="; //Move to back end
	
	$("#search-button").click(function(){
		var currTrackID = document.getElementById("id-input").value;
		
		$.get(aiBaseURL + currTrackID, function(data) {
			console.log(data);
			
			var table = document.getElementById("song-table");
			
			while (table.hasChildNodes())
				table.removeChild(table.lastChild);

			for (var index = 0; index < data.length; index++)
			{
				var row = table.insertRow(table.rows.length);

				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);

				cell1.innerHTML = data[index].name;
				cell2.innerHTML = data[index].album.name;

				var artistArray = data[index].artists;
				for (var i = 0; i < artistArray.length; i++) {
					cell3.innerHTML += artistArray[i].name;
					if (i < artistArray.length - 1)
					cell3.innerHTML += ", ";
				}

				cell4.innerHTML = data[index].popularity;
			}

			//table header
			insertTableHeader(table);
		});
			
		$.get(spotifyBaseURL + currTrackID, function(data) {
			console.log(data);
		});
    });
});
