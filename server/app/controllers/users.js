//users.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    //mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler')
    //Users = mongoose.model('Users');


module.exports = function (app, config) {
    app.use('/api', router);

    //API call routes below
    

    
    //create new user api Post request -- console log only
    router.post('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating New (POST) User ');
    }));



};