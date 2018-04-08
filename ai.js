const spotify = require(`${process.cwd()}/spotify`);

var numTracks = 10;

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
var selectStateAverageHeuristic = function(states) {
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
			selectionFunction is a function that can return a state from a given set of states
	Post:	return the array of states that is the completed graph search based on the initial state and selectionFunction given
*/
var graphSearch = async function(initialId, selectionFunction, access_token) {
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

		var selectedState = selectionFunction(frontier); //Choose a leaf node
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

module.exports = {
	getStandard: async function(seed, access_token){
		var baseURL = "/v1/recommendations?seed_tracks=";
	
		var results = await spotify.getRecommendations(seed, numTracks, access_token);
		var trackArray = results.tracks;
		
		return trackArray;
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

	getHeuristic: async function(seed, access_token) {
		return graphSearch(seed, selectStateAverageHeuristic, access_token);
	}
};
