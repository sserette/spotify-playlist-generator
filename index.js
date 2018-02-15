const express = require('express');
const app = express();

// allow cross domain requests
const cors = require('cors');
app.use(cors());

// store session data from client
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
app.use(session({
    store: new LokiStore(),
    secret: 'random_value',
    resave: false,
    saveUninitialized: true
}));

// serve static files without authentication
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

// send user to landing page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// all routes after this must be accessed with proper authentication
const authRouter = require('./auth-router.js');
app.use(authRouter);

app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/app.html'));
});

// enable any other routers defined in the routers folder
const fs = require('fs');
const routers = fs.readdirSync('routers');
for (let routerFile of routers) {
    const router = require('./routers/' + routerFile);
    app.use(router);
}

// start server on port 8080
app.listen(process.env.PORT || 8080);
