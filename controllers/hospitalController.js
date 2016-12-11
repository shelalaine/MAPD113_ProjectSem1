/**
 * Controller for all Hospital functionalities
 */

function hospitalController() {

    var Hospital = require('../models/hospital');

    // Create new hospital
    this.createHospital = function(req, res, next){
        var hospital = new Hospital(req.params);
        hospital.save(function(err, hospital){
            if (err) {
                return res.send({'error': err});
            }

            return res.send(201, hospital);
        });
    };

    // Update hospital
    this.updateHospital = function(req, res, next){
        Hospital.findByIdAndUpdate(req.params.id_h, {$set: req.params}, 
        {new: true}, function(err, hospital){
            if (err) {
                return res.send({'error': err});
            }
            
            return res.send(201, hospital);
        });
    };


    // Fetch hospital by id
    this.getHospitalById = function(req, res, next) {

        Hospital.findById(req.params.id_h, function(err, hospitals) {
            if (err) {
                return res.send({'error': err});
            }
            return res.send(hospitals);
        });
    }

    // Fetch all laboratories
    this.getLaboratories = function(req, res, next){
        Hospital.findById(req.params.id_h, function(err, hospital){
            if (err) {
                return res.send({'error': err});
            }
            return res.send(hospital.laboratories);
        });
    }

    // Fetch all rooms
    this.getRooms = function(req, res, next){
        Hospital.findById(req.params.id_h, function(err, hospital){
            if (err) {
                return res.send({'error': err});
            }
            return res.send(hospital.rooms);
        });
    }

    // Fetch all hospitals
    this.getHospitals = function(req, res, next) {
        Hospital.find({}, function(err, hospitals){
            if (err) {
                return res.send({'error': err});
            }
            return res.send(hospitals);
        });
    }

    // Delete a hospital by Id
    this.deleteHospitalById = function(req, res, next) {
        Hospital.findByIdAndRemove(req.params.id_h, function(err){
            if (err) {
                console.log(err);
                return res.send({'error': err});
            }

            return res.send('Hospital is deleted');
        });
    }

    return this;
}

module.exports = new hospitalController();