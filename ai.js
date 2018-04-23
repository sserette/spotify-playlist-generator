const spotify = require(`${process.cwd()}/spotify`);

var numTracks = 20;

var addTestTrackToArray = async function(array, id, access_token) {
	var track = await spotify.getTrack(id, access_token);
	array.push(track);

	return array;
}

var getTestTracks = async function(access_token) {
	var tracks = new Array();

	//Classic Rock
/*	tracks = await addTestTrackToArray(tracks, "7BY005dacJkbO6EPiOh2wb", access_token); //The Animals - House of the Rising Sun
	tracks = await addTestTrackToArray(tracks, "5MMnwYs0hIxkENRsbkWJ2G", access_token); //Deep Purple - Smoke On the Water
	tracks = await addTestTrackToArray(tracks, "6J17MkMmuzBiIOjRH6MOBZ", access_token); //AC/DC - Rock and Roll Ain't Noise Pollution
	tracks = await addTestTrackToArray(tracks, "3LTMnFa0hhwisyq6ILahyj", access_token); //Dire Straits - Sultans Of Swing
	tracks = await addTestTrackToArray(tracks, "1wXE6zvNWRz8GuMfEUgETz", access_token); //Nazareth - Hair Of The Dog
*/
	//Country
/*	tracks = await addTestTrackToArray(tracks, "477pWnF7WFWb9Qs6g8rs4J", access_token); //Brantley Gilbert - Bottoms Up
	tracks = await addTestTrackToArray(tracks, "1TwLKNsCnhi1HxbIi4bAW0", access_token); //Sam Hunt - House Party
	tracks = await addTestTrackToArray(tracks, "1zWZvrk13cL8Sl3VLeG57F", access_token); //Thomas Rhett - T-Shirt
	tracks = await addTestTrackToArray(tracks, "6CyJlVAEFlNdpggOLanytL", access_token); //Chris Young - Hangin' On
	tracks = await addTestTrackToArray(tracks, "3YZ5TNGA10oTLaADq4zuNV", access_token); //Lady Antebellum - Heart Break

	//Rap
	tracks = await addTestTrackToArray(tracks, "2XW4DbS6NddZxRPm5rMCeY", access_token); //Drake - God's Plan
/*	tracks = await addTestTrackToArray(tracks, "7yotKA30dwTKNEGomV9ZsI", access_token); //J. Cole - KOD
	tracks = await addTestTrackToArray(tracks, "6n4U3TlzUGhdSFbUUhTvLP", access_token); //Migos, Drake - Walk It Talk It
	tracks = await addTestTrackToArray(tracks, "2gTYVoQCUh0QNUaFix01ld", access_token); //Nicki Minaj - Chun-Li
	tracks = await addTestTrackToArray(tracks, "17Yq72h0p15OhCbZ5lJ5gd", access_token); //Cardi B - Bickenhead
*/
	//Pop
	
/*	tracks = await addTestTrackToArray(tracks, "5SxkdsY1ufZzoq9iXceLw9", access_token); //Ariana Grande - No Tears Left To Cry
	tracks = await addTestTrackToArray(tracks, "5ChkMS8OtdzJeqyybCc9R5", access_token); //Michael Jackson - Billie Jean
	tracks = await addTestTrackToArray(tracks, "36ux3YuUsGTWPT8fXclS45", access_token); //Katy Perry, Kanye West - E.T. - feat. Kanye West
	tracks = await addTestTrackToArray(tracks, "6ECp64rv50XVz93WvxXMGF", access_token); //Maroon 5 - This Love
	tracks = await addTestTrackToArray(tracks, "4fixebDZAVToLbUCuEloa2", access_token); //Britney Spears - Womanizer

	//Electronic/Dance
	tracks = await addTestTrackToArray(tracks, "6VrCmhRBFnuGKmtNfk4jDs", access_token); //Marshmello, Lil Peep - Spotlight
	tracks = await addTestTrackToArray(tracks, "5EwwwdsQfKI8ZnFG93j5Zu", access_token); //Martin Garrix, Matisse, Sadko - Forever
	tracks = await addTestTrackToArray(tracks, "4h8VwCb1MTGoLKueQ1WgbD", access_token); //Avicii - Wake Me Up
	tracks = await addTestTrackToArray(tracks, "6JyuJFedEvPmdWQW0PkbGJ", access_token); //Skrillex, Rock Ross - Purple Lamborghini (with Rick Ross)
	tracks = await addTestTrackToArray(tracks, "16s0TT9GxYo78ln1iHZLS1", access_token); //Black Caviar - Lady (Hear Me Tonight)

	//Jazz
	tracks = await addTestTrackToArray(tracks, "1YQWosTIljIvxAgHWTp7KP", access_token); //The Dave Brubeck Quartet - Take Five
	tracks = await addTestTrackToArray(tracks, "3GOZbK2epuHzCt5YvvVFHO", access_token); //Kenny Dorham - Alone Together
*/	tracks = await addTestTrackToArray(tracks, "0q4SJUYOp0Er9fvREdDyDv", access_token); //Sun Ra - Enlightenment
	tracks = await addTestTrackToArray(tracks, "3hY3MPL9hAITPgVfiVlL5K", access_token); //Joe Lovan0 - Stella By Starlight
	tracks = await addTestTrackToArray(tracks, "1Lh7U5c3EvLBb6lSgHVFlR", access_token); //Charlie Parker - All The Things You Are

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

	var numberOfRecommendations = 0;

	while (frontier.length > 0) {
		console.log("Number of recommendations requests: " + numberOfRecommendations + "    Frontier size: " + frontier.length);

		var selectedState = heuristicFunction(frontier); //Choose a leaf node
		removeFromFrontier(frontier, selectedState); //Remove it from the frontier

		if (selectedState.depth == numTracks) {
			var searchResults = new Object();
			searchResults.numberOfRecommendations = numberOfRecommendations;
			searchResults.tracks = getPlaylist(selectedState);

			return searchResults;
		}

		explored.push(selectedState);
		var results = await spotify.getRecommendations(selectedState.id, numTracks, access_token);
		numberOfRecommendations++;
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

var getTestTableRows = function(initialTrack, initialTrackAudioFeatures, tracks, tracksAudioFeatures, numberOfRecommendations) {
	var tableRows = new Array();

	for (var trackNum = 0; trackNum < tracks.length; trackNum++) {
		var tableRow = new Object();
		tableRow.initialTrack = getArtistsString(initialTrack) + " - " + initialTrack.name;
		tableRow.initialTrackPopularity = initialTrack.popularity;
		tableRow.initialTrackDanceability = initialTrackAudioFeatures.danceability;
		tableRow.initialTrackEnergy = initialTrackAudioFeatures.energy;
		tableRow.initialTrackSpeechiness = initialTrackAudioFeatures.speechiness;
		tableRow.initialTrackAcousticness = initialTrackAudioFeatures.acousticness;
		tableRow.initialTrackInstrumentalness = initialTrackAudioFeatures.instrumentalness;
		tableRow.initialTrackLiveness = initialTrackAudioFeatures.liveness;
		tableRow.initialTrackValence = initialTrackAudioFeatures.valence;

		tableRow.resultTrack = getArtistsString(tracks[trackNum]) + " - " + tracks[trackNum].name;
		tableRow.resultTrackPopularity = tracks[trackNum].popularity;
		tableRow.resultTrackDanceability = tracksAudioFeatures.audio_features[trackNum].danceability;
		tableRow.resultTrackEnergy = tracksAudioFeatures.audio_features[trackNum].energy;
		tableRow.resultTrackSpeechiness = tracksAudioFeatures.audio_features[trackNum].speechiness;
		tableRow.resultTrackAcousticness = tracksAudioFeatures.audio_features[trackNum].acousticness;
		tableRow.resultTrackInstrumentalness = tracksAudioFeatures.audio_features[trackNum].instrumentalness;
		tableRow.resultTrackLiveness = tracksAudioFeatures.audio_features[trackNum].liveness;
		tableRow.resultTrackValence = tracksAudioFeatures.audio_features[trackNum].valence;

		tableRow.numberOfRecommendations = numberOfRecommendations;

		tableRows.push(tableRow);
	}

	return tableRows;
}

var runTestsGivenFunction = async function(func, access_token) {
	var testTracks = await getTestTracks(access_token);

	var data = new Array();

	for (var i = 0; i < testTracks.length; i++) {
		var currentTrack = testTracks[i];
		var currentTrackAudioFeatures = await spotify.getAudioFeaturesSingleTrack(currentTrack, access_token);
		var results = await func(currentTrack.id, access_token);
		var ResultsAudioFeatures = await spotify.getAudioFeaturesMultipleTracks(results.tracks, access_token);
		var tableRows = getTestTableRows(currentTrack, currentTrackAudioFeatures, results.tracks, ResultsAudioFeatures, results.numberOfRecommendations);
		data.push(tableRows);
		console.log("Song number " + i + " done.");
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
		
		var searchResults = new Object();
		searchResults.numberOfRecommendations = 1;
		searchResults.tracks = trackArray;

		return searchResults;
	},

	getStandardTests: async function(access_token) {
		var data = runTestsGivenFunction(module.exports.getStandard, access_token);
		return data;
	},

	getDepthFirst: async function(seed, access_token){
		var searchResults = new Object();

		var baseURL = "/v1/recommendations?seed_tracks=";
		
		var popSongs = new Array();

		var numberOfRecommendations = 0;
		
		for (var i = 0; i < numTracks; i++) {
			var results = await spotify.getRecommendations(seed, numTracks, access_token);
			numberOfRecommendations++;
			var trackArray = results.tracks;
			
			if (trackArray){
				var mostPopIndex = getIndexOfMostPopular(trackArray, popSongs);
				popSongs.push(trackArray[mostPopIndex]);
				seed = trackArray[mostPopIndex].id;
			}
		}
		
		searchResults.tracks = popSongs;
		searchResults.numberOfRecommendations = numberOfRecommendations;

		return searchResults;
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
