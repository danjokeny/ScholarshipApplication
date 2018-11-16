//users.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    asyncHandler = require('express-async-handler');

//mongoose = require('mongoose'),
//Users = mongoose.model('Users');

module.exports = function (app, config) {
    logger.log('info', 'in users.js file!');
    app.use('/api', router);

    //API call routes below
    logger.log('info', 'using /api route!!');
    
    //PUT Create new user  API request -- -- console log only
    //Sample: http://localhost:3300/api/users (PUT)
    router.put('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'PUT Create new user Async Request');
        res.status(200).json({message:'Created a new user!'});
    }));


    //Get All Users API request -- -- console log only
    //Sample: http://localhost:3300/api/users (GET)
    router.get('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Get ALL Users Async Request');
        res.status(200).json({message:'Got All Users'});
    }));

};