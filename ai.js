const spotify = require(`${process.cwd()}/spotify`);

var numTracks = 10;

var getIndexOfMostPopular = function(trackArray){
	if (!trackArray)
		console.log("No tracks in array in getIndexOfMostPopular");
	
	var highestPopIndex = 0;
	
	for(var i = 1; i < trackArray.length; i++)
	{
		var currentPop = trackArray[i].popularity;
		if (currentPop > trackArray[highestPopIndex].popularity)
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
			var mostPopIndex = getIndexOfMostPopular(trackArray);
			popSongs.push(trackArray[mostPopIndex]);
			endpoint = trackArray[mostPopIndex].id;
		}
		
		return popSongs;
	}
};
