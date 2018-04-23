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
}

var clearTable = function(tableName){
	var table = document.getElementById(tableName);

	while (table.hasChildNodes())
		table.removeChild(table.lastChild);
}

var populateSearchTable = function(tableName, data){
	var table = document.getElementById(tableName);

	for (var index = 0; index < data.tracks.length; index++)
	{
		var row = table.insertRow(table.rows.length);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);

		cell1.innerHTML = data.tracks[index].name;
		cell2.innerHTML = data.tracks[index].album.name;

		var artistArray = data.tracks[index].artists;
		for (var i = 0; i < artistArray.length; i++) {
			cell3.innerHTML += artistArray[i].name;
			if (i < artistArray.length - 1)
			cell3.innerHTML += ", ";
		}

		cell4.innerHTML = data.tracks[index].popularity;
	}

	var totalPopularity = 0;

	for (var i = 0; i < data.tracks.length; i++)
		totalPopularity += data.tracks[i].popularity;

	row = table.insertRow(table.rows.length);
	var footer = row.insertCell(0);
	footer = row.insertCell(1);
	footer = row.insertCell(2);
	footer.innerHTML = "<b>" + "Average popularity: " + "</b>";
	footer = row.insertCell(3);
	var averagePopularity = totalPopularity / data.tracks.length;
	footer.innerHTML = "<b>" + averagePopularity + "</b>";

	//table header
	insertSearchTableHeader(table);
}

var insertTestTableHeader = function(table){
	var header = table.createTHead();
	var headerRow = header.insertRow(0);  

	createAndAppend(headerRow, "Initial Song");
	createAndAppend(headerRow, "Initial Song Popularity");
	createAndAppend(headerRow, "Initial Song Danceability");
	createAndAppend(headerRow, "Initial Song Energy");
	createAndAppend(headerRow, "Initial Song Speechiness");
	createAndAppend(headerRow, "Initial Song Acousticness");
	createAndAppend(headerRow, "Initial Song Instrumentalness");
	createAndAppend(headerRow, "Initial Song Liveness");
	createAndAppend(headerRow, "Initial Song Valence");

	createAndAppend(headerRow, "Result Song");
	createAndAppend(headerRow, "Result Song Popularity");
	createAndAppend(headerRow, "Result Song Danceability");
	createAndAppend(headerRow, "Result Song Energy");
	createAndAppend(headerRow, "Result Song Speechiness");
	createAndAppend(headerRow, "Result Song Acousticness");
	createAndAppend(headerRow, "Result Song Instrumentalness");
	createAndAppend(headerRow, "Result Song Liveness");
	createAndAppend(headerRow, "Result Song Valence");

	createAndAppend(headerRow, "Number of Recommendations");
}

var populateTestTable = function(tableName, data){
	var table = document.getElementById(tableName);

	console.log(data);

	for (var index = 0; index < data.length; index++)
	{
		for (var trackNum = 0; trackNum < data[index].length; trackNum++) {
			var row = table.insertRow(table.rows.length);

			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			var cell7 = row.insertCell(6);
			var cell8 = row.insertCell(7);
			var cell9 = row.insertCell(8);
			var cell10 = row.insertCell(9);
			var cell11 = row.insertCell(10);
			var cell12 = row.insertCell(11);
			var cell13 = row.insertCell(12);
			var cell14 = row.insertCell(13);
			var cell15 = row.insertCell(14);
			var cell16 = row.insertCell(15);
			var cell17 = row.insertCell(16);
			var cell18 = row.insertCell(17);
			var cell19 = row.insertCell(18);
	
			cell1.innerHTML = data[index][trackNum].initialTrack;
			cell2.innerHTML = data[index][trackNum].initialTrackPopularity;
			cell3.innerHTML = data[index][trackNum].initialTrackDanceability;
			cell4.innerHTML = data[index][trackNum].initialTrackEnergy;
			cell5.innerHTML = data[index][trackNum].initialTrackSpeechiness;
			cell6.innerHTML = data[index][trackNum].initialTrackAcousticness;
			cell7.innerHTML = data[index][trackNum].initialTrackInstrumentalness;
			cell8.innerHTML = data[index][trackNum].initialTrackLiveness;
			cell9.innerHTML = data[index][trackNum].initialTrackValence;
	
			cell10.innerHTML = data[index][trackNum].resultTrack;
			cell11.innerHTML = data[index][trackNum].resultTrackPopularity;
			cell12.innerHTML = data[index][trackNum].resultTrackDanceability;
			cell13.innerHTML = data[index][trackNum].resultTrackEnergy;
			cell14.innerHTML = data[index][trackNum].resultTrackSpeechiness;
			cell15.innerHTML = data[index][trackNum].resultTrackAcousticness;
			cell16.innerHTML = data[index][trackNum].resultTrackInstrumentalness;
			cell17.innerHTML = data[index][trackNum].resultTrackLiveness;
			cell18.innerHTML = data[index][trackNum].resultTrackValence;

			cell19.innerHTML = data[index][trackNum].numberOfRecommendations;
		}
	}

	/*
	var totalPopularity = 0;

	for (var i = 0; i < data.length; i++)
		totalPopularity += data[i].averagePopularity;

	row = table.insertRow(table.rows.length);
	var footer = row.insertCell(0);
	footer = row.insertCell(1);
	footer = row.insertCell(2);
	var averagePopularity = totalPopularity / data.length;
	footer.innerHTML = "<b>" + averagePopularity + "</b>";
	*/

	//table header
	insertTestTableHeader(table);
}

var setDisplayOfClassElements = function(className, visibility) {
	var array = document.getElementsByClassName(className);

	for (var i = 0; i < array.length; i++)
		array[i].style.visibility = visibility;
}

var exportToPlaylist = function(index) {
	let data = {
		name: 'AI Playlist',
		description: 'Playlist generated by AI for CIS 479'
	};
	$.ajax({
		url: '/api/spotify/createPlaylist',
		method: 'POST',
		data: data,
		success: function(data) {
			let body = {
				playlistId: data.id,
				uris: []
			};
			body.uris.push('spotify:track:' + currTrackID);
			if(index === 0) {
				for(let track of standardTracks) {
					body.uris.push('spotify:track:' + track.id);
				}
			}
			else if(index == 2) {
				for(let track of depthFirstTracks) {
					body.uris.push('spotify:track:' + track.id);
				}
			}
			else if(index == 4) {
				for(let track of aStarTracks) {
					body.uris.push('spotify:track:' + track.id);
				}
			}
			$.post('/api/spotify/addTracks', body, function(data) {
				let message = document.getElementById('message');
				message.innerHTML = '<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> <a id="success-link" target="_blank"></a></div>';
				let success = document.getElementById('success-link');
				success.href='https://open.spotify.com/user/' + data.userId + '/playlist/' + body.playlistId;
				success.innerHTML = 'Check out your playlist here';
				window.scrollTo(0, 0);
			});
		},
		error: function(err) {
			console.error(err);
		}
	});
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
var standardTracks;
var depthFirstTracks;
var aStarTracks;

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
			standardTracks = data;
			populateSearchTable("search-table", data);
		});
		
		$.get("/api/ai/recommend-depth-first?seed=" + currTrackID, function(data) {
			depthFirstTracks = data;
			populateSearchTable("depth-first-table", data);
		});

		$.get("/api/ai/recommend-a-star-mean-popularity?seed=" + currTrackID, function(data) {
			aStarTracks = data;
			populateSearchTable("a-star-mean-popularity-table", data);
		});

		/*
		$.get('/api/ai/recommend-a-star?seed=' + currTrackID, function(data) {
			populateSearchTable('a-star-table', data);
		});
		*/
	});

	$("#test-button").click(async function() {
		//setDisplayOfClassElements("search-tables", "hidden");
		//setDisplayOfClassElements("test-tables", "visible");
		$(".search-tables").hide();
		$(".test-tables").show();

		clearTable("testing-depth-first-table");
		clearTable("testing-search-table");
		clearTable("testing-a-star-mean-popularity-table");

/*		await $.get("/api/ai/recommend-standard-tests", function(data) {	
			populateTestTable("testing-search-table", data);
		});	
*/
/*		await $.get("/api/ai/recommend-depth-first-tests", function(data) {	
			populateTestTable("testing-depth-first-table", data);
		});
*/
		await $.get("/api/ai/recommend-a-star-mean-popularity-tests", function(data) {	
			populateTestTable("testing-a-star-mean-popularity-table", data);
		});
	});
	
	$('table').each(function (index) {
        var $table = $(this);

        var $button = $("<button class='btn btn-default' type='button'>");
		$button.text("Export to spreadsheet");
		$button.addClass($table.attr("class"));
		$button.removeClass("col-md-12");
        $button.insertBefore($table);
        
        var $playlistButton = $("<a onclick='exportToPlaylist(" + index + ")' class='btn btn-default btn-playlist'>");
		$playlistButton.text("Save Playlist to Spotify");
		$playlistButton.addClass($table.attr("class"));
		$playlistButton.removeClass("col-md-12");
        $playlistButton.insertBefore($table);

        $button.click(function () {
            var csv = $table.table2CSV({
                delivery: 'value'
            });
            window.location.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);
		});
		
		$table.hide();
		$button.hide();
		$playlistButton.hide();
    });
});
