var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var genjam = require('./bin/genjam');
var remjam = require('./bin/remjam');

// Bootstrap the app with express
var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,middleware,token,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes
app.put('/api/v1/genjam/:name', function (req, res) {
    genjam.generate(req.params.name.toLowerCase());
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        error: null,
        data: req.params.name + ' generated successfully'
    }) + '\n');
});
app.put('/api/v1/remjam/:name', function (req, res) {
    remjam.remove(req.params.name.toLowerCase());
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        error: null,
        data: req.params.name + ' removed successfully'
    }) + '\n');
});

// Port used for localhost and when running in the cloud
var port = process.env.PORT || 3000;

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log('Server failed to start: ' + err);
    } else {
        console.log('Server running on port ' + port);
    }
});

module.exports = app;
