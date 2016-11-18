/**
 * Application setup
 */

var restify = require('restify');
var config = require('./config');
var server = restify.createServer({name: config.serverName, version: config.version});

// Setup listener
// server.listen(config.port, config.host, function(){
server.listen(config.port, function(){
    console.log('Server %s listening at %s', config.serverName, server.url);
    console.log('Resources:');
    console.log('/patients');
    console.log('/patients/:id_p');
    console.log('/patients/:id_p/vitals');
    console.log('/patients/:id_p/prescriptions');
    console.log('/patients/:id_p/tests');
    console.log('/patients/:id_p/notes');
    console.log('/patients/:id_p/doctors');
    console.log('/patients/:id_p/nurses');
    console.log('/patients/:id_p/vitals/:id_r');
    console.log('/patients/:id_p/prescriptions/:id_r');
    console.log('/patients/:id_p/tests/:id_r');
    console.log('/patients/:id_p/notes/:id_r');
    console.log('/patients/:id_p/doctors/:id_r');
    console.log('/patients/:id_p/nurses/:id_r');
    console.log('Where:');
    console.log(":id_p --> Patient's id");
    console.log(":id_r --> Patient record's id");
});

// Allow the use of POST
server.use(restify.fullResponse());
// Maps req.body to req.params so there is no switching between them
server.use(restify.bodyParser());

// Define the mongoose connection
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbPath);
var db = mongoose.connection;

db.on('error', function() {
    console.log('Error occured from the database');
});

db.once('open', function dbOpen() {
    console.log('Successfully opened the database');
});

var routes = require('./routes')(server);