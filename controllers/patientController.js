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
                email: req.params.contact.email, 
                emergencyContactName: req.params.contact.emergencyContactName,
                emergencyContactNumber: req.params.contact.emergencyContactNumber
            },
            gender: req.params.gender,
            weight: req.params.weight,
            height: req.params.height,
            occupation: req.params.occupation,
            bloodType: req.params.bloodType,
            maritalStatus: req.params.maritalStatus,
            condition: req.params.condition,
            admissionDate: req.params.admissionDate,
            dischargedDate: req.params.dischargedDate,
            room: req.params.room,
            insurance: {
                name: req.params.insurance.name,
                expiryDate: req.params.insurance.expiryDate
            },
            allergies: req.params.allergies
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
                    takenByName: req.params.takenByName,
                    systolic: req.params.systolic,
                    diastolic: req.params.diastolic,
                    heartRate: req.params.heartRate,
                    temperature: req.params.temperature,
                    respirationRate: req.params.respirationRate
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
                    prescribedByName: req.params.prescribedByName 
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
    this.addTest = function(req, res, next) {
        Patient.findById(req.params.id_p, function(err, patient){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                patient.labTests.push({
                    requestDate: req.params.requestDate,
                    requestedByName: req.params.requestedByName,
                    testType: req.params.testType,
                    sampleTakenDate: req.params.sampleTakenDate,
                    sampleTakenByName: req.params.sampleTakenByName,
                    imageResult: req.params.imageResult,
                    status: req.params.status 
                }); 

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

            return res.send({"patients": patients});
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

    return this;
}

module.exports = new patientController();