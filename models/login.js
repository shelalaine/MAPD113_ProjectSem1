/**
 * Login model
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Create the schema used for the Login model
var loginSchema = new schema({
    username:           String,
    password:           String,
    fingerKey:          String,
}, {autoIndex: false});

// Create a Staff model
var Login = mongoose.model("Login", loginSchema);

module.exports = Login;