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

        var patient = new Patient({
            firstName: req.params.firstName, 
            lastName: req.params.lastName,
            birthday: req.params.birthday,
            address: {
                street: req.params.address.street, 
                city: req.params.address.city, 
                province: req.params.address.province,
                zipCode: req.params.address.zipCode 
            },
            contact: {
                phone: req.params.contact.phone,
                email: req.params.contact.email
            },
            gender: req.params.gender,
            weight: req.params.weight,
            height: req.params.height,
            bloodType: req.params.bloodType,
            maritalStatus: req.params.maritalStatus,
            condition: req.params.condition,
            admissionDate: req.params.admissionDate,
            dischargedDate: req.params.dischargedDate,
            insurance: {
                name: req.params.insurance.name,
                expiryDate: req.params.insurance.expiryDate
            }
        });

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
                patient.vitals.push({
                    date: req.params.date,
                    nurseName: req.params.nurseName,
                    systolic: req.params.systolic,
                    diastolic: req.params.diastolic,
                    heartRate: req.params.heartRate,
                    temperature: req.params.temperature 
                }); 

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
                patient.prescriptions.push({
                    date: req.params.date,
                    medicineName: req.params.medicineName,
                    dosage: req.params.dosage,
                    frequency: req.params.frequency,
                    duration: req.params.duration,
                    drName: req.params.drName 
                }); 

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
    /*
    this.addTest = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.tests.push({
                    date: req.params.date,
                    drName: req.params.drName,
                    type: req.params.type,
                    sampleTakenDate: req.params.sampleTakenDate,
                    testResult: req.params.testResult
                }); 

                patient.save(function(err, data){
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({"tests": data.tests});
                    }
                })
            }
        });
    } */

    // Fetch all patients
    this.getPatients = function(req, res, next) {
        Patient.find({}, function(err, patients){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send(patients);
        });
    }


    // Fetch patient by Id
    this.getPatientById = function(req, res, next) {
        Patient.findById(req.params.id, function(err, patient){
            if (err) {
                console.log(err);
                return res.send(404, {'error': err});
            }

            return res.send(patient);
        });
    }

    // Delete a patient by Id
    this.deletePatientById = function(req, res, next) {
        Patient.findByIdAndRemove(req.params.id, function(err){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send('Patient is deleted');
        });
    }

    return this;
}

module.exports = new patientController();