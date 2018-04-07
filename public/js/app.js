var createAndAppend = function(row, name){
	cell = document.createElement('th');
	cell.innerHTML = name;
	row.appendChild(cell);
}

var insertTableHeader = function(table){
	var header = table.createTHead();
	var headerRow = header.insertRow(0);  

	createAndAppend(headerRow, "Name");
	createAndAppend(headerRow, "Album");
	createAndAppend(headerRow, "Artists");
	createAndAppend(headerRow, "Popularity");
	//createAndAppend(headerRow, "Acousticness");
	//createAndAppend(headerRow, "Danceability");
	//createAndAppend(headerRow, "Energy");
	//createAndAppend(headerRow, "Instrumentalness");
	//createAndAppend(headerRow, "Mode");
	//createAndAppend(headerRow, "Tempo");
	//createAndAppend(headerRow, "Valence");
}

var clearTable = function(tableName){
	var table = document.getElementById(tableName);

	while (table.hasChildNodes())
		table.removeChild(table.lastChild);
}

var populateTable = function(tableName, data){
	var table = document.getElementById(tableName);

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

		//var cell5 = row.insertCell(4);
		//var cell6 = row.insertCell(5);
		//var cell7 = row.insertCell(6);
		//var cell8 = row.insertCell(7);
		//var cell9 = row.insertCell(8);
		//var cell10 = row.insertCell(9);
		//var cell11 = row.insertCell(10);

		//cell5.innerHTML = data[index].acousticness;
		//cell6.innerHTML = data[index].danceability;
		//cell7.innerHTML = data[index].energy;
		//cell8.innerHTML = data[index].instrumentalness;
		//cell9.innerHTML = data[index].mode;
		//cell10.innerHTML = data[index].tempo;
		//cell11.innerHTML = data[index].valence;
	}

	//table header
	insertTableHeader(table);
}

$(document).ready(function() {
    //let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	
    //$.get(url, function(data) {
    //    console.log(data);
    //});
	
	let aiBaseURL = "/api/ai/recommend?seed="; //Move to back end
	let spotifyRecommendBaseURL = "/api/spotify/recommend?seed_tracks="; //Move to back end
	
	$("#search-button").click(function(){
		var currTrackID = document.getElementById("id-input").value;

		clearTable("depth-first-table");
		clearTable("search-table");

		//Got rid of the following to allow for a "numTracks" variable to be passed within ai.js (to keep fairness)
		/*$.get(spotifyRecommendBaseURL + currTrackID, function(data) {
			console.log(data);
			populateTable("search-table", data.tracks);
		});*/

		$.get("/api/ai/recommend-standard?seed=" + currTrackID, function(data) {	
			populateTable("search-table", data);
		});
		
		$.get("/api/ai/recommend-depth-first?seed=" + currTrackID, function(data) {	
			populateTable("depth-first-table", data);
		});

		$.get("/api/ai/recommend-heuristic?seed=" + currTrackID, function(data) {	
			populateTable("heuristic-table", data);
		});

		//Insert more AI methods here
	});
	
	$('table').each(function () {
        var $table = $(this);

        var $button = $("<button type='button'>");
        $button.text("Export to spreadsheet");
        $button.insertBefore($table);

        $button.click(function () {
            var csv = $table.table2CSV({
                delivery: 'value'
            });
            window.location.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);
        });
    });
});
