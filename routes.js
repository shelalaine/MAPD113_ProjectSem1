module.exports = function(server) {
    var hospital = require('./controllers/hospitalController');
    var patient = require('./controllers/patientController');
    var staff = require('./controllers/staffController');

    server.get('/', function(req, res, next){
        return res.send("HEALTHMATIC'S PATIENT REST API");
    });

    // PATIENT COLLECTION
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

    // Update Patient's profile API
    server.put('/patients/:id_p', patient.updatePatient);

     // Update Patient Lab Test
    server.put('/patients/:id_p/labTest', patient.updatePatientLabTest);

  
    // STAFF COLLECTION
    // Create the Staff API
    server.post('/staffs', staff.createStaff);

    // Get all Staff API
    server.get('/staffs', staff.getStaffs);

    // Get staff by Role (e.g. doctor, nurse, labTech) or ID API
    server.get('/staffs/:role_or_id', staff.getStaffByRoleOrId);

    // Get all Doctor API
    server.get('/doctors', staff.getDoctors);

    // Get all Nurse API
    server.get('/nurses', staff.getNurses);

    // Update the Staff API
    server.put('/staffs/:id_s', staff.updateStaff);

    // Delete Staff by ID API
    server.del('/staffs/:id_s', staff.deleteStaffById);

    // Get all assigned patients to the staff API
    server.get('/staffs/:id_s/patients', staff.getPatientsOfStaff);

    
    // HOSPITAL COLLECTION
    // Create the Hospital API
    server.post('/hospitals', hospital.createHospital);

    // Update the hospital
    server.put('/hospitals/:id_h', hospital.updateHospital);

    // Get hospital by ID API
    server.get('/hospitals/:id_h', hospital.getHospitalById);

    // Get all laboratories API
    server.get('/hospitals/:id_h/laboratories', hospital.getLaboratories);

    // Get all rooms API
    server.get('/hospitals/:id_h/rooms', hospital.getRooms);

    // Update a Room
    server.put('/hospitals/:id_h/rooms', hospital.updateRoom);

    // Get all Hospitals API
    server.get('/hospitals', hospital.getHospitals);

    // Delete Hospital by ID API
    server.del('/hospitals/:id_h', hospital.deleteHospitalById);


    // LOGIN COLLECTION
    // Login
    server.post('/login', staff.login);

    // Login With Samsung Finger
    server.post('/loginsamsung', staff.loginSamsung);
};