const express = require('express')
const cors = require('cors')
const app = express()
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const path = require('path')
const fs = require('fs')

// allow cross domain requests
app.use(cors())

// store session data from client
app.use(session({
    store: new LokiStore(),
    secret: 'random_value',
    resave: false,
    saveUninitialized: true
}))

// allow all files in public to be accessed without authentication
app.use(express.static(path.join(__dirname, '/public')))

// enable any other routers defined in the routers folder
const routers = fs.readdirSync('routers')
for (let routerFile of routers) {
    const router = require('./routers/' + routerFile)
    app.use(router)
}

// start server on port 8889
app.listen(process.env.PORT || 8889)
