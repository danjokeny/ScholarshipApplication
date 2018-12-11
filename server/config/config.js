//config.js module

var path = require('path'),
       rootPath = path.normalize(__dirname + '/..'),
       env = process.env.NODE_ENV || 'development';

var config = {
       development: {
              root: rootPath,
              app: { name: 'ScholarshipApplication' },
              port: 3300,  
              db: 'mongodb://127.0.0.1/apply-dev',
              secret: "cayennedlikedhistreats",
              uploads: './public/uploadedFiles'
       },
       production: {
              root: rootPath,
              app: { name: 'ScholarshipApplication'},
              port: 80,  
              db: 'mongodb://127.0.0.1/apply',
              secret: "cayennedlikedhistreats",
              uploads: './public/uploadedFiles' 
       }
};

module.exports = config[env];