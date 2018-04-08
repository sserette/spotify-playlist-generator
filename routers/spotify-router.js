const express = require('express');
const spotifyRouter = express.Router();
const spotify = require(`${process.cwd()}/spotify`);

spotifyRouter.get('/api/spotify/recommend', async function (req, res) {
    try {
        let spotifyResult;
        if (req.method === 'GET') {
            spotifyResult = await spotify.getRecommendations(req.query.seed_tracks, req.query.numTracks, req.session.access_token);
        }
        res.json(spotifyResult);
    } catch (err) {
        res.status(500);
        res.end();
        //console.error(err);
    }
});

spotifyRouter.get('/api/spotify/track', async function (req, res) {
    try {
        let spotifyResult;
        if (req.method === 'GET') {
            spotifyResult = await spotify.getTrack(req.query.trackId, req.session.access_token);
        }
        res.json(spotifyResult);
    } catch (err) {
        res.status(500);
        res.end();
        //console.error(err);
    }
});

module.exports = spotifyRouter;
