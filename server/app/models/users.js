var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    active: {type: Boolean, require: true},
    role: {type: String, enum:['admin', 'requester', 'reviewer']},
    dateRegistered: {type: Date, default: Date.now},
    email: {type: String, require: true, unique: true},
    phone: {type: String, require: true},
    password: {type: String, require: true}

});

module.exports = 
 Mongoose.model('User', userSchema);