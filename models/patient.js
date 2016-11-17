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
        phone:                  String,
        email:                  String,
        emergencyContactName:   String,
        emergencyContactNumber: String
    },
    gender:             Boolean,
    weight:             Number,
    height:             Number,
    bloodType:          String,
    occupation:         String,
    maritalStatus:      Boolean,
    condition:          String,
    admissionDate:      String,
    dischargedDate:     String,
    room:               Number,
    insurance: {
        name:           String,
        expiryDate:     String
    },
    allergies:          [String],
    drNotes:    [{
        date:               String,
        notes:              String,
        diagnosedByName:    String
    }],
    labTests: [{
        requestDate:        String,
        requestedByName:    String,
        type:               String, 
        sampleTakenDate:    String,
        sampleTakenByName:  String,
        imageResult:        String,
        status:             String
    }],
    prescriptions:  [{
        date:           String,
        medicineName:   String,
        dosage:         String,
        frequency:      String,
        duration:       String,
        prescribedByName:   String  
    }],
    vitals:     [{
        date:               String,
        takenByName:        String,
        systolic:           Number,
        diastolic:          Number,
        heartRate:          Number,
        temperature:        Number,
        respirationRate:    Number      
    }],
    doctors:    [{
        id:             String,
        name:           String,
        gender:         String,
        specialty:      String
    }],
    nurses:     [{
        id:             String,
        name:           String, 
        gender:         String,
        floor:          Number
    }],
}, {autoIndex: false});

// Create a Patient model
var Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;