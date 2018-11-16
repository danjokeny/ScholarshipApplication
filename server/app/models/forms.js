var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var formContentSchema = new Schema({
    requesterId: {type: Schema.Types.ObjectId, require: true},
    schoolName: {type: String, require: false},
    courseOfStudy: {type: String, require: false},
    schoolYear: {type: Number, require: false},
    amountRequested: {type: Number, require: true},
    dateCreated: {type: Date, default: Date.now},
    formID: {type: Schema.Types.ObjectId, require: true},
    reviewComments: {type: String},
    file: {
        fileName: {type: String },
        originalFileName: {type: String }
    }
});

module.exports = Mongoose.model('FormContent', formContentSchema);

var formSchema = new Schema({
    title: {type: String, require: true},
    requesterId: {type: Schema.Types.ObjectId, require: true},
    reviewerId: {type: Schema.Types.ObjectId, require: true},
    status: {type: String, enum:['new', 'approved', 'denied']},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = Mongoose.model('Form', formSchema);