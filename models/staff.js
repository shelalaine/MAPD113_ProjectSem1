/**
 * Staff model
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;

// Create the schema used for the Staff model
var staffSchema = new schema({
    firstName:          String,
    lastName:           String,
    username:          {
                         type: String,
                         unique: true,
                         required: true
                        },
    password:          {
                         type: String,
                         required: true
                        },
    fingerKey:          String,
    birthday:           String,
    gender:             Boolean,
    maritalStatus:      Boolean,
    role:               String, 
    floor:              String,
    specialty:          [String],
    imageName:          String, 
    address: {
        street:         String, 
        city:           String, 
        province:       String,
        zipCode:        String        
    },
    contact: {
        phone:          String,
        email:          String
    },
    patientRefs: [{
        patientId:     String,
        checkupDates:  [String]
    }]
}, {autoIndex: false});

// Execute before each user.save() call
staffSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

//Password matching
staffSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


// Create a Staff model
var Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;