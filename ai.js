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

	getHeuristic: async function(seed, access_token){
		var baseURL = "/v1/recommendations?seed_tracks=";
		
		var popSongs = new Array();
		
		//Modify code to create heuristic
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
	}
};
