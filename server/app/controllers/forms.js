var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    asyncHandler = require('express-async-handler');

mongoose = require('mongoose'),
    Form = mongoose.model('Form');
//FormContent = mongoose.model('FormContent'),

module.exports = function (app, config) {
    app.use('/api', router);

    //create new forms api Post request with json passed in raw body
    //NOTE: requestorId and reviewerID must be valid users in user db
    //Sample: http://localhost:3300/api/forms (POST)
    /*{
        "schoolName"			: "dartmouth",    
        "reviewerId"			: "5bf440c2529ce230e821fad1",   
        "requesterId"    		: "5bf441ff529ce230e821fad6" ,
        "courseOfStudy" 		: "Comp sci",
        "schoolYear"			: 1990,
        "amountRequested"		: 60000,
        "status"    			: "new",
         "applicantComments"	: "",
    	"reviewComments"		: ""
	
}*/
    router.post('/forms', asyncHandler(async (req, res) => {
        logger.log('info', 'POST Create new application form');
        var form = new Form(req.body);
        await form.save()
            .then(result => {
                res.status(201).json({contentID: result._id});
            })
    }));


    //get all forms 
    //NOTE: requestorId and reviewerID will display user records within form
    //Sample: http://localhost:3300/api/forms (GET)
    router.get('/forms', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all forms');
        let query = Form.find();
        query
            .sort(req.query.order)
            .populate({ path: 'requesterId', model: 'User', select: 'lastName firstName ' })
            .populate({ path: 'reviewerId', model: 'User', select: 'lastName firstName ' });

        if (req.query.status) {
            if (req.query.status[0] == '-') {
                query.where('status').ne(req.query.status.substring(1));
            } else {
                query.where('status').eq(req.query.status);
            }
        }
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));



    //Update existing data row with json passed in raw body
    //Sample:http://localhost:3300/api/users (PUT)
    /*
{
    "status": "approved",
    "_id": "5bf455ba5a8525255439b191",
    "title": "University of Wisconsin - Milwaukee",
    "requesterId": "5bf44183529ce230e821fad4",
    "reviewerId": "5bf45a0581b9f87b78e63e68"
}
    */
    router.put('/forms', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating form');
        await Form.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(201).json({contentID: result._id});
            })
    }));

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + '/forms';
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            file.fileName = file.originalname;
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    var upload = multer({ storage: storage });

    router.post('/forms/upload/:id', upload.any(), asyncHandler(async (req, res) => {
        logger.log('info', 'Uploading files');
        await Form.findById(req.params.id).then(result => {
            for (var i = 0, x = req.files.length; i < x; i++) {
                var file = {
                    originalFileName: req.files[i].originalname,
                    fileName: req.files[i].filename
                };
                result.file = file;
            }
            result.save().then(result => {
                res.status(200).json(result);
            });
        })
    }));


    //Delete forms
    //Sample: http://localhost:3300/api/forms/5c0fd3b69ba362562820fdec (DELETE)
    router.delete('/forms/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Delete application form =>%s<', req.params.id);

        let query = Form.remove();
        query.where('_id').eq(req.params.id);
        await query.exec().then(result => {
                res.status(200).json(result);
        })
    }));


};