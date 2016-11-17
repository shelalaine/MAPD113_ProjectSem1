module.exports = function(server) {
    var patient = require('./controllers/patientController');

    server.get('/', function(req, res, next){
        return res.send("WELCOME TO THE PATIENT REST API");
    });


    // Create the Patient API
    server.post('/patients', patient.createPatient);

    // Add new vital record of a Patient by ID API
    server.put('/patients/:id_p/vitals', patient.addVitals);

    // Add new prescription record of a Patient by ID API
    server.put('/patients/:id_p/prescriptions', patient.addPrescription);

    // Add new laboratory test of a Patient by ID API
    // server.put('/patients/:id_p/tests', patient.addTest);

    // Get all Patient API
    server.get('/patients', patient.getPatients);

    // Get Patient by ID API
    server.get('/patients/:id', patient.getPatientById); 

    // Delete Patient by ID API
    server.del('/patients/:id', patient.deletePatientById);
};