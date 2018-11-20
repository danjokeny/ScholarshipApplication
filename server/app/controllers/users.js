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
    

    //create new user api Post request with json passed in raw body
    //Sample: http://localhost:3300/api/users (PUT)
    /*{
        "firstName" : "Amy",    
        "lastName"  : "Vankauwenberg",   
        "active"    : "True" ,
        "role"      : "requester",
        "email"     : "AmyV@nm.com",   
        "password"  : "987654321",
        "phone"     : "555-555-1000"
    }*/
    router.post('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'POST Create new user Async Request');
        var user = new User(req.body);
        console.log(req.body);
        await user.save()
        .then(result => {
                res.status(201).json(result);
        })
    }));


    //Get All Users API request 
    //Sample: http://localhost:3300/api/users (GET)
    router.get('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Get ALL Users Async Request');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            logger.log('info',result);
            res.status(200).json(result);
        })
    }));

    //Get specific User id Request 
    //Sample: http://localhost:3300/api/users/5bf441ff529ce230e821fad6,
    router.get('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get specific user by id =  %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            logger.log('info', 'getbyID user = ' + result);
            res.status(200).json(result);
        })
    }));

};