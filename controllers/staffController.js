/**
 * Controller for all staff functionalities
 */

function staffController() {

    var Staff = require('../models/staff');
    var Login = require('../models/login');
    var Patient = require('../models/patient');

    //Login with username and password and return Staff object
    this.login = function(req, res, next){
            var login = new Login(req.params);
            console.log(login);
            if(login.username == undefined){
                return res.send(400, {'error':'Username must be supplied'});
            }
            if(login.password == undefined){
                return res.send(400, 'Password must be supplied');
            }
            Staff.findOne({ 'username': login.username, 'password': login.password }, function (err, staff) {
            if (err){
                return handleError(err);
            }
            if(staff){
                console.log('%s %s is a %s.', staff.firstName, staff.lastName, staff.firstName) // Space Ghost is a talk show host.
            }                
            return res.send(200, staff);
        })
    }

    //Login with username and password and return Staff object
    this.loginSamsung = function(req, res, next){

    }


    // Create new staff
    this.createStaff = function(req, res, next){
        if (req.params.firstName === undefined) {
            return next(new restify.InvalidArgumentError('First name must be supplied'));
        }
        if (req.params.lastName === undefined) {
            return next(new restify.InvalidArgumentError('Last name must be supplied'));
        }

        var staff = new Staff(req.params);

        staff.save(function(err, staff){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send(201, staff);
        });
    };

    // Update staff
    this.updateStaff = function(req, res, next){
        Staff.findByIdAndUpdate(req.params.id_s, {$set: req.params}, 
        {new: true}, function(err, staff){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }
            
            return res.send(201, staff);
        });
    };

    // Fetch all staffs
    this.getStaffs = function(req, res, next) {
        Staff.find({}, function(err, staffs){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            // return res.send({"staffs": staffs});
            return res.send(staffs);
        });
    }

    //Fetch all Doctors
    this.getDoctors = function(req, res, next){
        Staff.find({}, function(err, staffs){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }
            if(staffs){
                var doctors = []
                var staff
                for (i = 0; i < staffs.length; i++) {
                    staff = staffs[i]
                    if(staff.role == "doctor"){
                        doctors.push(staff)
                    }
                }
                
            }
            return res.send(doctors);
        });
    }

    //Fetch all Nurses
    this.getNurses = function(req, res, next){
        Staff.find({}, function(err, staffs){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }
            if(staffs){
                var nurses = []
                var staff
                for (i = 0; i < staffs.length; i++) {
                    staff = staffs[i]
                    if(staff.role == "nurse"){
                        nurses.push(staff)
                    }
                }
            }
            return res.send(nurses);
        });
    }

    // Fetch staff by Id
    this.getStaffById = function(req, res, next) {
        Staff.findById(req.params.id_s, function(err, staff){
            if (err) {
                console.log(err);
                return res.send(404, {'error': err});
            }

            return res.send(staff);
        });
    }

    // Delete a staff by Id
    this.deleteStaffById = function(req, res, next) {
        Staff.findByIdAndRemove(req.params.id_s, function(err){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send('Staff is deleted');
        });
    }

    function getPatients(patients, patientsRef, count, res) {
        if (count >= patientsRef.length) {
            return res.send(patients);
        }
        Patient.findById(patientsRef[count].patientId, function (err, patient){
            if (err) {
                return res.send({'error': err});
            } 
            count++;
            patients.push(patient);
            getPatients(patients, patientsRef, count, res);
        });
    }

    
    // Get all assigned patients to the staff API
    this.getPatientsOfStaff = function(req, res, next) {

        Staff.findById(req.params.id_s, function(err, staff){
            if (err) {
                console.log(err);
                return res.send(404, {'error': err});
            }
            getPatients([], staff.patientRefs, 0, res);
        });
    }

    return this;
}

module.exports = new staffController();