# ScholarshipApplication
scholarship application to a non-profit organization project

GitConfirmation:
Confirm you can update this file, and commit, and push to server
1. Danny is confirmed
2. Joyce has not confirmed yet
3. Arne is confirmed
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

Change#4
Name: Joyce Miller
Date: 11/25/18
Detail changes: 
1. Installed client
2. Set up routing
3. Added layer for users
4. Added phone field and set default role to requester
5. Set data-services port to 3300 to match server
6. Created a user and verified in Compass
7. Created nav bar, users table, and cleaned up users form
8. Verified that user creation is working from cleaned-up form
9. User functionality complete as defined in class

Change#5
Name: Andy Wittmann
Date: 11/26/18
Detail changes: updated forms.js schema


Change #6
Name: Danny Forero
Date: 11/26/18
Detail Changes:
1. updated server routes to work with new forms schema
2. added new route to get all forms by requestor id


Change #7
Name: Danny Forero
Date: 11/29/18
Detail Changes:
1. updated server routes to get all forms given a users email - finally!
2. removed deletes and updates, since i dont think we wil be using these - will add back if needed

Change #8
Name: Danny Forero
Date: 11/30/18
Detail Changes:
1. added public folder under Client
2. added two images in public folder (1 for landing page, and 1 for eventual logout page)
3. added image1 to the landing page

Change #9 - Application Form Basics
Name: Arne Thomsen
Date: 12/02/18
Detail Changes:
1. added form-object.js in /client/src/resources/data
2. added forms.js in /client/src/modules
3. added forms.html in /client/src/modules
4. added tableForms.html in /client/src/modules/components
5. added editForm.html in /client/src/modules/components
6. Update nav-bar.html for application link to '#forms'
7. Added Forms route to app.js

Change #10 - Authentication
Name: Arne Thomsen
Date: 12/02/18
Detail Changes:
1. Installed bcrypt and added it to server user model
2. Updated route in users.js controller to add password change
3. Installed passport, passport-jwt, passport-local and jsonwebtoken
4. Created file passport.js in config folder
5. Updated config.js with secret
6. Updated error handler in express.js
7. Added login route and passport require to users.js 
8. Updated passport file with token authorization logic
9. Updated user.js controller with auth require (I did not set authorization on each route!)
10. Installed aurelia-auth on client
11. Updated aurelia.json file with aurelia-auth dependecy
12. Created auth-config.js file in client/src folder
13. Updated main.js with authorization changes
14. Updated app.js with authorization changes
15. Updated nav-bar.js with aurelia auth updates / Updated login method to store user object
16. Added error message for nav-bar.html
17. Changed logout method in nav-bar.js to include new authorization
18. Added bind method to nav-bar.js
19. Changed nav-bar.html with new authentication variable
20. Reinstalled text



