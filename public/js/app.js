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
	}

	//table header
	insertTableHeader(table);
}

$(document).ready(function() {
    //let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	
    //$.get(url, function(data) {
    //    console.log(data);
    //});
	
	let aiBaseURL = "/api/ai?endpoint="; //Move to back end
	let spotifyBaseURL = "/api/spotify?endpoint=/v1/recommendations?seed_tracks="; //Move to back end
	
	$("#search-button").click(function(){
		var currTrackID = document.getElementById("id-input").value;

		clearTable("greedy-table");
		clearTable("search-table");
		
		$.get(aiBaseURL + currTrackID, function(data) {	
			populateTable("greedy-table", data);
		});
			
		$.get(spotifyBaseURL + currTrackID, function(data) {
			console.log(data);
			populateTable("search-table", data.tracks);
		});
    });
});
