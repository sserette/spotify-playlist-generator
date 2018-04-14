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

spotifyRouter.get('/api/spotify/search', async function (req, res) {
    try {
        let spotifyResult;
        if (req.method === 'GET') {
            spotifyResult = await spotify.searchTrack(req.query.q, req.session.access_token);
        }
        res.json(spotifyResult.tracks.items);
    } catch (err) {
        res.status(500);
        res.end();
        //console.error(err);
    }
});

spotifyRouter.post('/api/spotify/createPlaylist', async function (req, res) {
    try {
        let spotifyResult;
        let userData;
        if (req.method === 'POST') {
            userData = await spotify.getUserInfo(req.session.access_token);
            spotifyResult = await spotify.createPlaylist(userData.id, req.body.name, req.body.description, req.session.access_token);
        }
        res.json(spotifyResult);
    } catch (err) {
        res.status(500);
        res.end();
        //console.error(err);
    }
});

spotifyRouter.post('/api/spotify/addTracks', async function (req, res) {
    try {
        let spotifyResult;
        let userData;
        if (req.method === 'POST') {
            userData = await spotify.getUserInfo(req.session.access_token);
            spotifyResult = await spotify.addTracks(userData.id, req.body.playlistId, req.body.uris, req.session.access_token);
            spotifyResult.userId = userData.id;
        }
        res.json(spotifyResult);
    } catch (err) {
        res.status(500);
        res.end();
        //console.error(err);
    }
});

module.exports = spotifyRouter;
