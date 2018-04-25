Spotify Playlist Generator
==========================

Student project for CIS 479 - Artificial Intelligence that generates Spotify playlists based on user inputted songs.

### System Requirements
* Node.js >=9.11.1

### Run the server
1. Run `npm install`
2. Run `npm start` within the root directory
3. Navigate to [localhost:8080](http://localhost:8080) in any web browser

###Test the application
1. Provide proper Spotify authentication when requested.
2. Type in the search bar for tracks, or click the test button (see notes about testing below). Note that the search bar uses a Typeahead feature. The desired song must be clicked on.
3. Wait for results to appear in all search tables.
4. Add desired playlists to Spotify account, or export results to a file. Change the file name of the exported file to have a .csv extension, and then open it through Microsoft Excel 

### Additional notes about testing and results:
1. The top of the `ai.js` file contains the list of songs to be tested.
2. The top of the `ai.js` file contains a variable for the number of tracks to be in the resulting playlist.
3. Be careful when selecting playlist size and and test tracks, as the application can time out. Playlists of size 20 should only test a couple or a few songs at a time. Watch the console while testing; it outputs live feedback on the search. If the console stops output, or starts interleaving searches, then it must be restarted.
4. Raw data for the project test results can be found in the `test data` subfolder at the root directory.