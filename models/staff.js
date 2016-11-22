/**
 * Staff model
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Create the schema used for the Staff model
var staffSchema = new schema({
    firstName:          String,
    lastName:           String,
    username:           String,
    birthday:           String,
    gender:             Boolean,
    maritalStatus:      Boolean,
    role:               String, 
    floor:              String,
    specialty:          [String],
    photo:              String, 
    address: {
        street:         String, 
        city:           String, 
        province:       String,
        zipCode:        String        
    },
    contact: {
        phone:          String,
        email:          String
    },
    patients: [{
        patientId:     String,
        checkupDates:  [String]
    }]
}, {autoIndex: false});

// Create a Staff model
var Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;