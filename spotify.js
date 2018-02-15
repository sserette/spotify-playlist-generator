const request = require('superagent');
const path = require('path');
const credentials = require(`${process.cwd()}/credentials.json`);

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
    get: function(endpoint, access_token) {
        return new Promise((resolve, reject) => {
            request.get('https://' + path.join('api.spotify.com', endpoint))
            .set('Authorization', 'Bearer ' + access_token)
            .end(function(err, body) {
                if(err) reject(err);
                else resolve(body.text && JSON.parse(body.text));
            });
        });
    } 
};
