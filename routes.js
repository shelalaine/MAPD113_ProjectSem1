module.exports = function(server) {
    var patient = require('./controllers/patientController');

    server.get('/', function(req, res, next){
        return res.send("HEALTHMATIC'S PATIENT REST API");
    });


    // Create the Patient API
    server.post('/patients', patient.createPatient);

    // Add new vital record of a Patient by ID API
    server.put('/patients/:id_p/vitals', patient.addVitals);

    // Add new prescription record of a Patient by ID API
    server.put('/patients/:id_p/prescriptions', patient.addPrescription);

    // Add new laboratory test of a Patient by ID API
    server.put('/patients/:id_p/tests', patient.addTest);

    // Add new Doctor notes of a Patient by ID API
    server.put('/patients/:id_p/notes', patient.addNotes);

    // Add new doctors for a Patient by ID API
    server.put('/patients/:id_p/doctors', patient.addDoctors);

    // Add new nurses for a Patient by ID API
    server.put('/patients/:id_p/nurses', patient.addNurses);

    // Get all Patient API
    server.get('/patients', patient.getPatients);

    // Get Patient by ID API
    server.get('/patients/:id_p', patient.getPatientById); 

    // Delete Patient by ID API
    server.del('/patients/:id_p', patient.deletePatientById);

    // Delete Patient's test/note/vitals/prescription/nurse/doctor by ID API
    server.del('/patients/:id_p/:record_type/:id_r', patient.deletePatientChildById);
};