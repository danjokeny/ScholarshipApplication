//users.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    asyncHandler = require('express-async-handler'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {

    app.use('/api', router);

    //API call routes below
    logger.log('info', 'using /api route!!');


    //create new user api Post request with json passed in raw body
    //Sample: http://localhost:3300/api/users (POST)
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
            logger.log('info', result);
            res.status(200).json(result);
        })
    }));

    //Get all forms for requester user by email
    //Sample: http://localhost:3300/api/users/email/AmyV@nm.com
    router.get('/users/email/:email', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all forms for requestor user by email =>%s<', req.params.email);
        let inEmail = req.params.email;
        logger.log('info', 'inEmail = ' + inEmail);

        //get user by email
        let query = User.findOne();
        query.where('email').eq(inEmail);
        query.select('firstName lastName email');

        await query.exec().then(result => {
            logger.log('info', 'get  email  = ' + result.email + ' and id =  ' + result._id);
            let requestorId = result._id;
            logger.log('info', 'let inside requestor  id =  ' + requestorId);
            let query2 = Form.find();
            query2.where('requesterId').eq(requestorId)
            query2.exec().then(result2 => {
                logger.log('info', 'get forms by requestor id = ' + result2);
                res.status(200).json(result2);
            });
        })
    }));




    //Update existing data row with json passed in raw body
    //Sample:http://localhost:3300/api/users (PUT)
    /*
    {
    "_id": "5bf440c2529ce230e821fad1",
    "firstName": "Amy",
    "lastName": "Vankauwenberg",
    "active": false,
    "role": "requester",
    "email": "AmyV@nm.com",
    "password": "555666777",
    "phone": "914-814-5555"
    }
    */
    router.put('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating user');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'update user = ' + result);
                res.status(200).json(result);
            })
    }));

    //Route to update passwords (needed due to encryption)

    router.put('/users/password/:userId', requireAuth, function (req, res, next) {
        logger.log('Update user ' + req.params.userId, 'verbose');
        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }
                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/users/login').post(requireLogin, login);

};