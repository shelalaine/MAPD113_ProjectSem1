/**
 * Controller for all staff functionalities
 */

function staffController() {

    var Staff = require('../models/staff');

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

            return res.send({"staffs": staffs});
            // return res.send(staffs);
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

    return this;
}

module.exports = new staffController();