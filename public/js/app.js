var createAndAppend = function(row, name){
	cell = document.createElement('th');
	cell.innerHTML = name;
	row.appendChild(cell);
}

var insertSearchTableHeader = function(table){
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

var populateSearchTable = function(tableName, data){
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

	var totalPopularity = 0;

	for (var i = 0; i < data.length; i++)
		totalPopularity += data[i].popularity;

	row = table.insertRow(table.rows.length);
	var footer = row.insertCell(0);
	footer = row.insertCell(1);
	footer = row.insertCell(2);
	footer = row.insertCell(3);
	var averagePopularity = totalPopularity / data.length;
	footer.innerHTML = "<b>" + averagePopularity + "</b>";

	//table header
	insertSearchTableHeader(table);
}

var insertTestTableHeader = function(table){
	var header = table.createTHead();
	var headerRow = header.insertRow(0);  

	createAndAppend(headerRow, "Initial Song");
	createAndAppend(headerRow, "Result Songs");
	createAndAppend(headerRow, "Average Popularity");
}

var populateTestTable = function(tableName, data){
	var table = document.getElementById(tableName);

	for (var index = 0; index < data.length; index++)
	{
		var row = table.insertRow(table.rows.length);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		cell1.innerHTML = data[index].initialTrack;
		cell2.innerHTML = data[index].resultTracks;
		cell3.innerHTML = data[index].averagePopularity;
	}

	var totalPopularity = 0;

	for (var i = 0; i < data.length; i++)
		totalPopularity += data[i].averagePopularity;

	row = table.insertRow(table.rows.length);
	var footer = row.insertCell(0);
	footer = row.insertCell(1);
	footer = row.insertCell(2);
	var averagePopularity = totalPopularity / data.length;
	footer.innerHTML = "<b>" + averagePopularity + "</b>";

	//table header
	insertTestTableHeader(table);
}

var setDisplayOfClassElements = function(className, visibility) {
	var array = document.getElementsByClassName(className);

	for (var i = 0; i < array.length; i++)
		array[i].style.visibility = visibility;
}

$.typeahead({
    input: ".js-typeahead",
    order: "asc",
    display: ["name"],
    dynamic: true,
    emptyTemplate: 'No result for "{{query}}"',
    template: function(query, item) {
    	var artist = item.artists[0].name;
    	var template = `{{name}} - ` + artist;
    	return template;
    },
    source: {
        groupName: {
            ajax: {
            	url: "/api/spotify/search",
            	data: {
            		q: '{{query}}'
            	}
            }
        }
    },
    callback: {
        onClickAfter: function (node, a, item, event) {
            event.preventDefault;
            currTrackID = item.id;
        }
    },
    cancelButton: true
});

var currTrackID;

$(document).ready(function() {
    //let url = "/api/spotify?endpoint=/v1/search?" + encodeURIComponent("q=bob&type=artist");
	
    //$.get(url, function(data) {
    //    console.log(data);
    //});
	
	let aiBaseURL = "/api/ai/recommend?seed="; //Move to back end
	let spotifyRecommendBaseURL = "/api/spotify/recommend?seed_tracks="; //Move to back end
	
	$("#search-button").click(function() {
		$(".search-tables").show();
		$(".test-tables").hide();

		//var currTrackID = document.getElementById("id-input").value;

		clearTable("depth-first-table");
		clearTable("search-table");
		//clearTable('a-star-table');
		clearTable("a-star-mean-popularity-table");

		//Got rid of the following to allow for a "numTracks" variable to be passed within ai.js (to keep fairness)
		/*$.get(spotifyRecommendBaseURL + currTrackID, function(data) {
			console.log(data);
			populateSearchTable("search-table", data.tracks);
		});*/

		$.get("/api/ai/recommend-standard?seed=" + currTrackID, function(data) {	
			populateSearchTable("search-table", data);
		});
		
		$.get("/api/ai/recommend-depth-first?seed=" + currTrackID, function(data) {	
			populateSearchTable("depth-first-table", data);
		});

		$.get("/api/ai/recommend-a-star-mean-popularity?seed=" + currTrackID, function(data) {	
			populateSearchTable("a-star-mean-popularity-table", data);
		});

		/*
		$.get('/api/ai/recommend-a-star?seed=' + currTrackID, function(data) {
			populateSearchTable('a-star-table', data);
		});
		*/
	});

	$("#test-button").click(function() {
		//setDisplayOfClassElements("search-tables", "hidden");
		//setDisplayOfClassElements("test-tables", "visible");
		$(".search-tables").hide();
		$(".test-tables").show();

		clearTable("testing-depth-first-table");
		clearTable("testing-search-table");
		clearTable("testing-a-star-mean-popularity-table");

		$.get("/api/ai/recommend-standard-tests", function(data) {	
			populateTestTable("testing-search-table", data);
		});

		$.get("/api/ai/recommend-depth-first-tests", function(data) {	
			populateTestTable("testing-depth-first-table", data);
		});

		$.get("/api/ai/recommend-a-star-mean-popularity-tests", function(data) {	
			populateTestTable("testing-a-star-mean-popularity-table", data);
		});
	});
	
	$('table').each(function () {
        var $table = $(this);

        var $button = $("<button class='btn btn-default' type='button'>");
		$button.text("Export to spreadsheet");
		$button.addClass($table.attr("class"));
        $button.insertBefore($table);

        $button.click(function () {
            var csv = $table.table2CSV({
                delivery: 'value'
            });
            window.location.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);
		});
		
		$table.hide();
		$button.hide();
    });
});
