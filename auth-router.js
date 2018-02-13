const express = require('express');
const authRouter = express.Router();
const credentials = require(`${process.cwd()}/credentials.json`);
const spotify = require('./spotify');

// generates a request to aquire an access token for the user
authRouter.get('/api/auth', function (req, res) {
    const state = req.session.id;
    const authParams = {
        client_id: credentials.clientId,
        response_type: 'code',
        redirect_uri: credentials.redirectUri,
        state: state,
        scope: '',
        show_dialog: 'true'
    };
    let authUrl = 'https://accounts.spotify.com/authorize?';
    for(let param in authParams) {
        authUrl += '&' + param + '=' + authParams[param];
    }
    res.redirect(302, authUrl); // sends user to Spotify to get auth code. Spotify redirects to /api/callback
});

// called after Spotify authentication, gets access tokens, sends user to application
authRouter.get('/api/callback', async function (req, res) {
    try {
        if(req.session.id === req.query.state) {
            const authData = await spotify.getAuthToken(req.query.code);
            res.cookie('accessToken', authData.access_token);
            // TODO: send user to app
            res.end();
        }
        else {
            res.status(400);
            res.end();
        }
    }
    catch(err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

// checks if user is authenticated
authRouter.all('*', function (req, res, next) {
    if(!req.session.access_token) {
        res.redirect(302, '/api/auth');
    }
    else {
        next();
    }
});

module.exports = authRouter;
