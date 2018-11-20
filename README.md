# ScholarshipApplication
scholarship application to a non-profit organization project

GitConfirmation:
Confirm you can update this file, and commit, and push to server
1. Danny is confirmed
2. Joyce has not confirmed yet
3. Arne has not confirmed yet
4. Andrew is confirmed


Change Log:

Change#1
Daniel Forero
11/15/2018


NodeSetup:
1. created server folder
2. npm init
3. npm install express --save
4. npm install nodemon --save
5. npm install morgan winston --save
6. npm install grunt --save
7. created .gitignore file
8. npm install grunt-contrib-nodemon -g and also --save
9. npm install express-async-handler --save
10. npm install body-parser --save
11. npm install grunt-cli -g and also --save
12.  added logger,config, express, Gruntfile, and index.js files
13.  added users.js file in controllers 
14.  Server successfully listening on port 3300
15.  PUT and GET(ALL) routes tested and working (console.log only -- no database)


Change#2
Name: Andy
Date: 11/16/18
Detail changes: install mongoose
1. npm install mongoose bluebird --save
2. added db connections
3. changed app name form users to ScholarshipApplication
4. updated controller for users
5. created controller for forms
6. created schema models for forms and users - I made some assumptions, needs review

Change#3
Name: Danny Forero
Date: 11/20/18
Detail changes: Add DB calls to routes 
1. removed node modules and package-lock.json from parent directory
2. added db promise
3. POST db insert working (tested for dupe/enum errors too)
4. GET (ALL) db request working
5. Get specific user request working
6. Update specific user request working
7. POST Forms db working
8. added comments for GET ALL and GET Specific calls that were already working
9. added comments for PUT update forms
10.  do we need to delete application forms?  there is a delete coded.