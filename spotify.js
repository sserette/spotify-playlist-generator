const request = require('superagent');
const path = require('path');
const credentials = require(`${process.cwd()}/credentials.json`);

var trackIdsString = function(tracks) {
    var IdsString = "";

    for (var i = 0; i < tracks.length; i++) {
        IdsString += tracks[i].id;

        if (i < tracks.length - 1)
        IdsString += ","
    }

    return IdsString;
}

module.exports = {
    getAuthToken: function(authCode) {
        return new Promise((resolve, reject) => {
            request.post('https://accounts.spotify.com/api/token').send({
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: credentials.redirectUri,
                client_id: credentials.clientId,
                client_secret: credentials.clientSecret
            }).set('Content-Type', 'application/x-www-form-urlencoded').end((err, res) => {
                if(err) reject(err);
                else resolve(res.body);
            });
        });
    },
    getUserInfo: function(access_token) {
        let endpoint = '/v1/me';
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    },
    getRecommendations: function(seed_tracks, limit, access_token) {
        let endpoint = '/v1/recommendations?seed_tracks=';
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint + seed_tracks + "&limit=" + limit))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    },
    getTrack: function(trackId, access_token) {
        let endpoint = '/v1/tracks/';
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint + trackId))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    },
    getAudioFeaturesSingleTrack: function(track, access_token) {
        let endpoint = '/v1/audio-features/';
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint + track.id))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    },
    getAudioFeaturesMultipleTracks: function(tracks, access_token) {
        let endpoint = '/v1/audio-features/?ids=';
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint + trackIdsString(tracks)))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    },
    searchTrack: function(q, access_token) {
        let endpoint = '/v1/search?type=track&q=';
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint + q))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    },
    createPlaylist: function(userId, name, description, access_token) {
        let endpoint = '/v1/users/' + userId + '/playlists';
        return new Promise((resolve, reject) => {
            request.post('https://' + path.join('api.spotify.com', endpoint))
            .send({name: name, description: description, public: false})
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + access_token)
            .end((err, res) => {
                if(err) reject(err);
                else resolve(res.body);
            });
        });
    },
    addTracks: function(userId, playlistId, uris, access_token) {
        let endpoint = '/v1/users/' + userId + '/playlists/' + playlistId + '/tracks';
        return new Promise((resolve, reject) => {
            request.post('https://' + path.join('api.spotify.com', endpoint))
            .send({uris: uris})
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + access_token)
            .end((err, res) => {
                if(err) reject(err);
                else resolve(res.body);
            });
        });
    }
};
