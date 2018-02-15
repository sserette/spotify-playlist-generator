const express = require('express');
const spotifyRouter = express.Router();
const spotify = require(`${process.cwd()}/spotify`);

spotifyRouter.all('/api/spotify', async function (req, res) {
    try {
        let spotifyResult;
        if (req.method === 'GET') {
            spotifyResult = await spotify.get(req.query.endpoint, req.session.access_token);
        }
        res.json(spotifyResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

module.exports = spotifyRouter;
