const spotify = require(`${process.cwd()}/spotify`);

var numTracks = 10;

var getTestTracks = async function(access_token) {
	var tracks = new Array();

	//Classic Rock tracks
	var track = await spotify.getTrack("7BY005dacJkbO6EPiOh2wb", access_token); //The Animals - House of the Rising Sun
	tracks.push(track);

	track = await spotify.getTrack("5MMnwYs0hIxkENRsbkWJ2G", access_token); //Deep Purple - Smoke On the Water
	tracks.push(track);

	track = await spotify.getTrack("6J17MkMmuzBiIOjRH6MOBZ", access_token); //AC/DC - Rock and Roll Ain't Noise Pollution
	tracks.push(track);

	track = await spotify.getTrack("3LTMnFa0hhwisyq6ILahyj", access_token); //Dire Straits - Sultans Of Swing
	tracks.push(track);

	track = await spotify.getTrack("1wXE6zvNWRz8GuMfEUgETz", access_token); //Nazareth - Hair Of The Dog
	tracks.push(track);

	//Country
	track = await spotify.getTrack("477pWnF7WFWb9Qs6g8rs4J", access_token); //Brantley Gilbert - Bottoms Up
	tracks.push(track);
	
	track = await spotify.getTrack("1TwLKNsCnhi1HxbIi4bAW0", access_token); //Sam Hunt - House Party
	tracks.push(track);

	track = await spotify.getTrack("1zWZvrk13cL8Sl3VLeG57F", access_token); //Thomas Rhett - T-Shirt
	tracks.push(track);

	//Rap
	track = await spotify.getTrack("2XW4DbS6NddZxRPm5rMCeY", access_token); //Drake - God's Plan
	tracks.push(track);

	track = await spotify.getTrack("4rv1ww0dUwFZcDVPqhcOcX", access_token); //The Weeknd - Try Me
	tracks.push(track);

	track = await spotify.getTrack("6tarvNiKnEjYMj1VZhlDqR", access_token); //Lil Yachty, Trippie Redd - 66
	tracks.push(track);
	/*
	//Electronic/Dance
	track = await spotify.getTrack("6OYjreGuIk79v0n5IvIy96", access_token); //Dropgun - Nobody
	tracks.push(track);

	track = await spotify.getTrack("1bA2ZK7CFxEMnyn1dWP2jp", access_token); //Bakermat - Baby
	tracks.push(track);

	track = await spotify.getTrack("5vMAKJ78vhNtvbIKz4yeIY", access_token); //Don Diablo - Cutting Shapes
	tracks.push(track);

	//80s
	track = await spotify.getTrack("4YR6Dextuoc3I8nJ0XgzKI", access_token); //Kenny Loggins - Footloose
	tracks.push(track);

	track = await spotify.getTrack("46RVKt5Edm1zl0rXhPJZxz", access_token); //Men At Work - Down Under
	tracks.push(track);

	//Classical
	track = await spotify.getTrack("69T81Cyvg4MekLcbh8DOwj", access_token); //Ludwig van Beethoven - Beethoven: Symphony No. 3 in E-Flat Major...
	tracks.push(track);

	track = await spotify.getTrack("0keXPud9gaE9LIW7ZaWW4s", access_token); //John Danyel, Karl Nyhlin - Pavan
	tracks.push(track);

	track = await spotify.getTrack("49P5YsdjSDcF5bSNYfdZEF", access_token); //Antoine de Fevin, Paolo Cherici - Sancta Trinitas
	tracks.push(track);

	track = await spotify.getTrack("0AyptO1NDrEW51CeG46JvZ", access_token); //Alessandro Piccinini, Francesca Torelli - Toccata XX
	tracks.push(track);
	*/

	return tracks;
}

var inTrackArray = function(id, trackArray){
	if (trackArray)
		for (var i = 0; i < trackArray.length; i++)
			if (trackArray[i].id == id)
				return true;
		
	return false;
}

var hashSongs = function(trackArray) {
	let songsTable = {};
	if(trackArray) {
		for(let track of trackArray) {
			songsTable[track.id] = track.id;
		}
	}
	return songsTable;
}

var getIndexOfMostPopular = function(trackArray, popSongs){
	if (!trackArray)
		console.log("No tracks in array in getIndexOfMostPopular");
	
	var highestPopIndex = 0;
	
	//Increment the popularity index until a song is found 
	//that is not currently in the list of popular songs
	while (popSongs && inTrackArray(trackArray[highestPopIndex].id, popSongs)){
		highestPopIndex++;
		if (highestPopIndex == trackArray.length) //No new songs to add
			return -1;
	}
	
	for (var i = highestPopIndex + 1; i < trackArray.length; i++)
	{
		var currentPop = trackArray[i].popularity;
		if (currentPop > trackArray[highestPopIndex].popularity && !inTrackArray(trackArray[i].id, popSongs))
			highestPopIndex = i;
	}

	return highestPopIndex;
}

/*
	Pre: 	frontier is an array of states with frontier.length > 0
			state is a state in frontier
	Post:	return and remove state from frontier using the splice function
*/
var removeFromFrontier = function(frontier, state) {
	for (var i = 0; i < frontier.length; i++)
		if (frontier[i].id == state.id) {
			var removedState = frontier[i];
			frontier.splice(i, 1);
			return removedState;
		}
}

/*
	Pre:	states is an array of states that all have a depth and path cost
	Pre:	return the state that has the lowest average cost, where cost = pathCost / depth
*/
var aStarMeanPopularity = function(states) {
	var leastIndex = 0;
	var least = 0;

	if (states[0].depth > 0)
		var least = states[0].pathCost / states[0].depth;

	for (var i = 1; i < states.length; i++) {
		var cost = states[i].pathCost / states[i].depth;
		if (cost < least) {
			least = cost;
			leastIndex = i;
		}
	}

	return states[leastIndex];
}

/*
	Pre: 	leafState is a leaf node that passed the goal test
	Post:	return an array of states with a length of numTracks by adding each successive parent to the array
*/
var getPlaylist = function(leafState) {
	var playlist = new Array();

	var currState = leafState;

	while (playlist.length < numTracks) {
		playlist.push(currState);
		currState = currState.parent;
	}

	return playlist;
}

/*
	Pre:	initialState is the initial state of the graph search to be performed
			heuristicFunction is a function that can return a state from a given set of states
	Post:	return the array of states that is the completed graph search based on the initial state and heuristicFunction given
*/
var graphSearch = async function(initialId, heuristicFunction, access_token) {
	var initialState = new Object;
	initialState.id = initialId;
	initialState.popularity = 0;
	initialState.depth = 0;
	initialState.pathCost = 0;

	var frontier = new Array();
	frontier.push(initialState); //Initialize the frontier using the initial state
	var explored = new Array(); //Initialize the explored set to be empty

	var debugCount = 0;

	while (frontier.length > 0) {
		debugCount++;
		console.log("Debug ct: " + debugCount + "    Frontier size: " + frontier.length);

		var selectedState = heuristicFunction(frontier); //Choose a leaf node
		removeFromFrontier(frontier, selectedState); //Remove it from the frontier


		if (selectedState.depth == numTracks)
			return getPlaylist(selectedState);

		explored.push(selectedState);
		var results = await spotify.getRecommendations(selectedState.id, numTracks, access_token);
		expandedStates = results.tracks

		for (var i = 0; i < expandedStates.length; i++) {
			var currState = expandedStates[i];

			if (!inTrackArray(currState.id, explored) && !inTrackArray(currState.id, frontier)) {
				currState.parent = selectedState;
				currState.pathCost = selectedState.pathCost + (100 - currState.popularity);
				currState.depth = selectedState.depth + 1;
				frontier.push(currState);
			}
		}
	}

	//Search did not find a goal state, so return the initialState by itself in an array.
	var failArray = new Array();
	failArray.push(initialState);
	return failArray;
}

var getHeuristicIndex = function(trackArray, popSongs) {
	if(!trackArray) {
		console.error('No tracks in array in getAStarIndex');
	}
	let popTable = hashSongs(popSongs);
	let heuristicIndex = 0;
	let sumValue = 0;
	for(let track of popSongs) {
		sumValue += track.popularity;
	}
	let avgValue = sumValue / popSongs.length;
	for(let i = 1; i < trackArray.length; i++) {
		let heuristicValue = trackArray[heuristicIndex].popularity + avgValue;
		if(Math.abs(trackArray[i].popularity + avgValue) > heuristicValue && !popTable[trackArray[i].id]) {
			heuristicIndex = i;
		}
	}
	return heuristicIndex;
}

var getArtistsString = function(track) {
	var string = "";

	for (var i = 0; i < track.artists.length; i++) {
		string += track.artists[i].name;

		if (i < track.artists.length - 1)
		string += ", ";
	}

	return string;
}

var getTestTableRow = function(initialTrack, tracks) {
	tableRow = new Object;

	var popularitySum = 0;
	var tracksString = "";

	for (var i = 0; i < tracks.length; i++) {
		popularitySum += tracks[i].popularity;

		tracksString += getArtistsString(tracks[i]);

		tracksString += " - " + tracks[i].name;

		if (i < tracks.length - 1)
			tracksString += "<br>";
	}

	tableRow.initialTrack = getArtistsString(initialTrack) + " - " + initialTrack.name;
	tableRow.resultTracks = tracksString;
	tableRow.averagePopularity = popularitySum / tracks.length;

	return tableRow;
}

var runTestsGivenFunction = async function(func, access_token) {
	var testTracks = await getTestTracks(access_token);

	var data = new Array();

	for (var i = 0; i < testTracks.length; i++) {
		var currentTrack = testTracks[i];
		var results = await func(currentTrack.id, access_token);
		var tableRow = getTestTableRow(currentTrack, results);
		data.push(tableRow);
		sleep(3000);
	}

	return data;
}

var sleep = function(delay) {
	var start = new Date().getTime()
    while (new Date().getTime() < start + delay) ;
}

module.exports = {
	getStandard: async function(seed, access_token) {
		var baseURL = "/v1/recommendations?seed_tracks=";
	
		var results = await spotify.getRecommendations(seed, numTracks, access_token);
		var trackArray = results.tracks;
		
		return trackArray;
	},

	getStandardTests: async function(access_token) {
		var data = runTestsGivenFunction(module.exports.getStandard, access_token);
		return data;
	},

	getDepthFirst: async function(seed, access_token){
		var baseURL = "/v1/recommendations?seed_tracks=";
		
		var popSongs = new Array();
		
		for (var i = 0; i < numTracks; i++) {
			var results = await spotify.getRecommendations(seed, numTracks, access_token);
			var trackArray = results.tracks;
			
			if (trackArray){
				var mostPopIndex = getIndexOfMostPopular(trackArray, popSongs);
				popSongs.push(trackArray[mostPopIndex]);
				seed = trackArray[mostPopIndex].id;
			}
		}
		
		return popSongs;
	},

	getDepthFirstTests: async function(access_token) {
		var data = runTestsGivenFunction(module.exports.getDepthFirst, access_token);
		return data;
	},

	getAStar: async function(seed, access_token){
		let baseURL = "/v1/recommendations?seed_tracks=";
		
		let heuristicSongs = new Array();
		
		for (var i = 0; i < numTracks; i++) {
			let results = await spotify.getRecommendations(seed, numTracks, access_token);
			
			let trackArray = results.tracks;
			
			if (trackArray){
				let heuristicIndex = getHeuristicIndex(trackArray, heuristicSongs);
				heuristicSongs.push(trackArray[heuristicIndex]);
				seed = trackArray[heuristicIndex].id;
			}
		}
		
		return heuristicSongs;
	},

	getAStarMeanPopularity: async function(seed, access_token) {
		return graphSearch(seed, aStarMeanPopularity, access_token);
	},

	getAStarMeanPopularityTests: async function(access_token) {
		var data = runTestsGivenFunction(module.exports.getAStarMeanPopularity, access_token);
		return data;
	},
};
