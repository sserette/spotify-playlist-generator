const spotify = require(`${process.cwd()}/spotify`);

var numTracks = 10;

var inTrackArray = function(id, trackArray){
	if (trackArray)
		for (var i = 0; i < trackArray.length; i++)
			if (trackArray[i].id == id)
				return true;
		
	return false;
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
	
	console.log("Most pop: " + highestPopIndex);
	return highestPopIndex;
}

module.exports = {
	get: async function(endpoint, access_token){
		var baseURL = "/v1/recommendations?seed_tracks=";
		
		var popSongs = new Array();
		
		for (var i = 0; i < numTracks; i++) {
			var results = await spotify.get(baseURL + endpoint, access_token);
			var trackArray = results.tracks;
			
			console.log(i + " ITERATION");
			
			for (var j = 0; j < trackArray.length; j++)
				console.log(trackArray[j].name);
			
			if (trackArray){
				var mostPopIndex = getIndexOfMostPopular(trackArray, popSongs);
				popSongs.push(trackArray[mostPopIndex]);
				endpoint = trackArray[mostPopIndex].id;
			}
		}
		
		return popSongs;
	}
};
