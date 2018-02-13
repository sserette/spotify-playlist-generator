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

// allow all files in public to be accessed without authentication
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

// all routes after this must be accessed with proper authentication
const authRouter = require('./auth-router.js');
app.use(authRouter);

// enable any other routers defined in the routers folder
const fs = require('fs');
const routers = fs.readdirSync('routers');
for (let routerFile of routers) {
    const router = require('./routers/' + routerFile);
    app.use(router);
}

// start server on port 8889
app.listen(process.env.PORT || 8889);
