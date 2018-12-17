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

Change #11 - Application Form 2nd round
Name: Arne Thomsen
Date: 12/02/18
Detail Changes:
1. updated form.js contructor with user object
2. Added user object as ID for new application forms

Change #12 - Application Form 2nd round
Name: Joyce Miller
Date: 12/02/18
Detail Changes:
1. updated user.js - changed this.showUserEditForm = false to true
2. editUser.html - commented out back and delete buttons in table header
3. tableUsers.html - commented out New Users and Get Users buttons in the table header

Change #13 - Fixed bug in logout
Name: Arne Thomsen
Date: 12/03/18
Detail Changes:
1. updated logout method in nav-bar.js

Change #14 - Action item 1 - hide #users from non-admins
Name: Andy Wittmann
Date: 12/05/18
Detail Changes:
1. updated users.js - changed this.showUserEditForm = true to false
2. editUser.html - un-commented back and delete buttons in table header
3. tableUsers.html - un-commented New Users and Get Users buttons in the table header
4. updated nav-bar.html - added show.bind="userObj.role ==='admin'" to #users link
5. removed #home from nav-bar.html
6. changed login() to direct to forms instead of home
7. deleted modules home.html and home.js
8. created value-converters\format-date.js
9. added './value-converters/format-date' to resources\index.js

Change #15 - Fixed date format
Name: Arne Thomsen
Date: 12/10/18
Detail Changes:
1. updated tableForms.html to use date converter

Change #16 - Added file upload for application
Name: Arne Thomsen
Date: 12/10/18
Detail Changes:
1. NPM install for multer and mkdirp and require in forms.js controller file
2. Updated controller file forms.js with class content (copy&paste from PPT, adapt to forms)
3. Updated data-services.js with class content (copy&paste from PPT)
4. Updated form-object with uploadFile method
5. Updated editForm.html with file upload button
6. Updated forms.js back method per class instruction
7. Added changeFiles method to forms.js
8. Updated save method in forms.js with file handling
9. Updated controller forms.js to include form ID in response of post method
10. Updated editForm.html with hyperlink to uploaded file
11. Updated gitignore to ignore uploaded files in public folder
12. Added file folder to config.js file
13. Updated editForm.html with a more descriptive text related to the file upload
14. Updated database schema for forms to include file

Change #16 -
Name: Danny Forero
Date: 12/10/18
Detail Changes:
1.  added images folder
2.  moved image from publics to image folder
3.  updated landing.html to look at new image folder
4.  updated all htmls to use css files....i am color blind so if you dont like the color scheme work with me  please
5.  added new images and updated users image page
Date: 12/11/18
6.  added new images and updated the scholarships page
7.  fixed problem where one could not delete a user
8.  added known bug/enhancements needed section to readme below
9.  fixed bug where amount requested could not be updated
10.  allowed for delete of application form
11. defaulted amount to 0 on the add new application page
12.  admin and reviewers call different route to get all application forms
13.  requestors can only see their applications
14.  added welcome login message to nav bar
15.  added second message line to users and forms page
16.  fixed bug where applications form was loaded upon login but not selected in the navbar
17.  added name to the grid for applications -- for admin and reviewer
18.  hide name on the grid for requestors, all they see are their own
Date: 12/12/2018
19.  centered the users table on users page 
20.  table for applications is now working correctly
     --shows name for admin/reviewer
     --does not show name for requestors
21.  add status to the editForm page.  
     --when requestor adds a new application, they cannot enter status, and defaults to new
     --when a reviewer/admin edit a application, they can see/change the status
22.  if admin/reviewer, then populate the reviewer id in the application
23.  add a warning for school year and $amount to be numeric
24.  made status in editForm a dropdown selector instead of text box
25.  changed name on tableForms to be Requestor
26.  added Reviewer to tableForms (only visible for admin and reviewer)
27.  fixed bug when saving was not going to get a refreshed list of forms correctly

Change #17 -
Name: Andy Wittmann
Date: 12/13/18
Detail Changes:
1.  changed default amountRequested in forms.js newForm() from 0 to 2500
2.  changed "input type" of amountRequested and schoolYear in editForm.html from 'email' to 'number'


Change #18 -
Name: Danny Forero
Date: 12/13/18
Detail Changes:
1.  added role to table users

Change 19 - Added authentication to routes
Name: Arne Thomsen
Date: 12/13/18
Detail Changes:
1. Added requireAuth to all routes on the server
2. Added phone number to readme file

Change 20 - Changed language and size of Applcation comment box
Name: Andy Wittmann
Date: 12/14/18
Detail Changes:
1. Changed comment box Placeholder from "Please add your full application here" to "Additional comments here"
2. Reduced comment box size from 10 to 3 rows

Change 21 - Remove Create User button and deploy
Name: Joyce Miller
Date: 12/16/2018
Detail Changes:
1. Removed the Create User button
2. Created Public folder on the server
3. Copied Scripts folder from client to the Public folder
4. Copied index.html to the Public folder

Change 22 - Copy images to server\public
Name: Andy Wittmann
Date: 12/17/2018
Detail Changes:
1. copied images folder to server\public


Contact Info:
Danny 917 817 7694
Andy 414 484 8262
Joyce 414 975 0451
Arne 262 347 9068

