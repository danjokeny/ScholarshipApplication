var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Form = mongoose.model('Form'),
    FormContent = mongoose.model('FormContent'),
    asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/forms', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all forms');
        let query = Form.find();
        query
            .sort(req.query.order)
                .populate({path: 'requesterId', model: 'User', select: 'lastName firstName fullName'} )
                .populate({path: 'reviewerId', model: 'User', select: 'lastName firstName fullName'} );

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

    router.get('/forms/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get form %s', req.params.id);
        await Form.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/forms', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating form');
        var Form = new Form(req.body);
        const result = await Form.save()
        res.status(201).json(result);
    }));

    router.put('/forms', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating form');
        await Form.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/forms/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting form %s', req.params.id);
        await Form.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};