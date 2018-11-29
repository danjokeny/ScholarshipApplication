var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
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
        console.log(req.body);
        await form.save()
        .then(result => {
                res.status(201).json(result);
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
                .populate({path: 'requesterId', model: 'User', select: 'lastName firstName '} )
                .populate({path: 'reviewerId', model: 'User', select: 'lastName firstName '} );

        if(req.query.status){
            if(req.query.status[0] == '-'){
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
                res.status(200).json(result);
            })
    }));


};