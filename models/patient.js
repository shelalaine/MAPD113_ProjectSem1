/**
 * Patient model
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Create the schema used for the Patient model
var patientSchema = new schema({
    firstName:          String,
    lastName:           String,
    birthday:           String,
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
    gender:             Boolean,
    weight:             Number,
    height:             Number,
    bloodType:          String,
    maritalStatus:      Boolean,
    condition:          String,
    admissionDate:      String,
    dischargedDate:     String,
    insurance: {
        name:           String,
        expiryDate:     String
    },
    allergies:          [String],
    drNotes:    [{
        date:           String,
        notes:          String,
        drName:         String
    }],
    tests: [{
        date:           String,
        drName:         String,
        type:           String, 
        sampleTakenDate: String,
        testResult:        String
    }],
    prescriptions:  [{
        date:           String,
        medicineName:   String,
        dosage:         String,
        frequency:      String,
        duration:       Number,
        drName:         String  
    }],
    vitals:     [{
        date:           String,
        nurseName:      String,
        systolic:       Number,
        diastolic:      Number,
        heartRate:      Number,
        temperature:    Number      
    }],
    doctors:    [{
        id:             String,
        name:           String
    }],
    nurses:     [{
        id:             String,
        name:           String
    }],
}, {autoIndex: false});

// Create a Patient model
var Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;