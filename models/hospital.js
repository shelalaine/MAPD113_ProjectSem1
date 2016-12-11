/**
 * Hospital model
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Create the schema used for the Hospital model
var hospitalSchema = new schema({
    name:           String, 
    rooms:           [{
        room:           Number, 
        // 0 - available, 1 - occupied
        availability:   Boolean}], 
    laboratories:   [{
        name: String, 
        description: String}]
}, {autoIndex: false});

// Create a Hospital model
var Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;