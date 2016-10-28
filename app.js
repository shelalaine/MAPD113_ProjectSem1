/**
 * Application setup
 */

var restify = require('restify');
var config = require('./config');
var server = restify.createServer({name: config.serverName, version: config.version});

// Setup listener
server.listen(config.port, config.host, function(){
    console.log('Server %s listening at %s', config.serverName, server.url);
    console.log('Resources:');
    console.log('/patients');
    console.log('/patients/:id');
    console.log('/patients/:id_p/vitals');
    console.log('/patients/:id_p/prescriptions');
    // console.log('/patients/:id_p/tests');
});

// Allow the use of POST
server.use(restify.fullResponse());
// Maps req.body to req.params so there is no switching between them
server.use(restify.bodyParser());

// Define the mongoose connection
var mongoose = require('mongoose');

mongoose.connect(config.dbPath);
var db = mongoose.connection;

db.on('error', function() {
    console.log('Error occured from the database');
});

db.once('open', function dbOpen() {
    console.log('Successfully opened the database');
});

var routes = require('./routes')(server);