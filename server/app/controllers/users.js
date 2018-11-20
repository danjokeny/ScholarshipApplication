//users.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    asyncHandler = require('express-async-handler');

mongoose = require('mongoose'),
User = mongoose.model('User');

module.exports = function (app, config) {
    logger.log('info', 'in users.js file!');
    app.use('/api', router);

    //API call routes below
    logger.log('info', 'using /api route!!');
    
    //POST Create new user  API request -- -- console log only
    //Sample: http://localhost:3300/api/users (PUT)
    router.post('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'POST Create new user Async Request');
        res.status(200).json({message:'Created a new user!'});
    }));


    //Get All Users API request -- -- console log only
    //Sample: http://localhost:3300/api/users (GET)
    router.get('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Get ALL Users Async Request');
        res.status(200).json({message:'Got All Users'});
    }));

};