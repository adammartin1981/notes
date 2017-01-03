// The main server to expose the angular app (/) and the api (/api) on port 3333
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('server/db.json');
var middlewares = jsonServer.defaults();
var express = require('express');
var app = express();
var proxy = require('express-http-proxy');


var apiProxy = proxy('localhost:3000', {
    forwardPath: function (req, res) {
        var newBase = req.baseUrl.replace('/api', '');
        return require('url').parse(newBase).path;
    }
});

// For running ng serve
var distVersion = true;

if (distVersion) {
    app.use('/', express.static('dist'));
} else {
    // This is for running ng serve in another instance
    var ngProxy = proxy('localhost:4200', {
        forwardPath: function (req, res) {
            return require('url').parse(req.baseUrl).path;
        }
    });

    app.use("/*", ngProxy);
}


server.use(middlewares);
server.use(router);

server.listen(3000, function () {
    console.log('JSON Server is running on port 3000')
});

// Port the JSON server through
app.use("/api/*", apiProxy);

// Fire up the server and port the api through
app.listen('3333', function() {
    console.log('Express server is running on port 3333');
});

