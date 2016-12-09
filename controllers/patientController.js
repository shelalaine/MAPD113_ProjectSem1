/**
 * Controller for all patient functionalities
 */

function patientController() {

    var Patient = require('../models/patient');

    // Create new patient
    this.createPatient = function(req, res, next){
        if (req.params.firstName === undefined) {
            return next(new restify.InvalidArgumentError('First name must be supplied'));
        }
        if (req.params.lastName === undefined) {
            return next(new restify.InvalidArgumentError('Last name must be supplied'));
        }

        // Create new patient
        var patient = new Patient(req.params);
        patient.save(function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send(201, patient);
        });
    };

    // Add patient vitals
    this.addVitals = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.vitals.push(req.params); 
                patient.save(function(err, result){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"vitals": result.vitals});
                    }
                })
            }
        });
    }

    // Add patient prescription
    this.addPrescription = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.prescriptions.push(req.params); 
                patient.save(function(err, result){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"prescriptions": result.prescriptions});
                    }
                })
            }
        });
    }

    // Add laboratory test
    this.addTest = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                // Push all tests 
                for (x = 0; x < req.params.labTests.length; x++) {
                    patient.labTests.push(req.params.labTests[x]);
                }
                // Save all latest tests added
                patient.save(function(err, result){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"labTests": result.labTests});
                    }
                })
            }
        });
    }

    // Add Doctor notes
    this.addNotes = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.drNotes.push({
                    date: req.params.date,
                    notes: req.params.notes,
                    diagnosedByName: req.params.diagnosedByName
                }); 

                patient.save(function(err, result){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"drNotes": result.drNotes});
                    }
                })
            }
        });
    }

    // Add a new doctor assigned to the patient
    this.addDoctors = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.doctors.push({
                    name: req.params.name,
                    gender: req.params.gender,
                    specialty: req.params.specialty
                }); 

                patient.save(function(err, result){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"doctors": result.doctors});
                    }
                })
            }
        });
    }

    // Add a new nurse assigned to the patient
    this.addNurses = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.nurses.push({
                    name: req.params.name,
                    gender: req.params.gender,
                    gender: req.params.gender
                }); 

                patient.save(function(err, result){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"nurses": result.nurses});
                    }
                })
            }
        });
    }

    // Fetch all patients
    this.getPatients = function(req, res, next) {
        Patient.find({}, function(err, patients){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            // return res.send({"patients": patients});
            return res.send(patients);
        });
    }

    // Fetch patient by Id
    this.getPatientById = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send(404, {'error': err});
            }

            return res.send(patient);
        });
    }

    // Delete a patient by Id
    this.deletePatientById = function(req, res, next) {
        Patient.findByIdAndRemove(req.params.id_p, function(err){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send('Patient is deleted');
        });
    }

    // Delete a patient's test/vitals/prescription/note/doctor/nurse by Id
    this.deletePatientChildById = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send(404, {'error': err});
            }
            switch (req.params.record_type) {
                case "tests":
                    patient.labTests.pull({_id: req.params.id_r});
                    break;
                case "vitals":
                    patient.vitals.pull({_id: req.params.id_r});
                    break;
                case "prescriptions":
                    patient.prescriptions.pull({_id: req.params.id_r});
                    break;
                case "notes":
                    patient.notes.pull({_id: req.params.id_r});
                    break;
                case "doctors":
                    patient.doctors.pull({_id: req.params.id_r});
                    break;
                case "nurses":
                    patient.nurses.pull({_id: req.params.id_r});
                    break;
                default:
                    return res.send(404, {'error': 'Not supported'});
            }
            
            patient.save(function (err) {
                if (err) return handleError(err);
                return res.send('The ' + req.params.record_type + ' sub-doc was removed')
            });
        });
    }

    this.updatePatient = function(req, res, next){
        Patient.findByIdAndUpdate(req.params.id_p, {$set: req.params}, 
        {new: true}, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send(201, patient);
        });
        
    }

    return this;
}

module.exports = new patientController();