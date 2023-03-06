# medical_departures
backend development test for medical departures

#INSTRUCTIONS ON HOW TO RUN LOCALLY

##PREREQUISITES
:Node js version: 16.14.0

:download the project to local machine

:open project directory in CMD

:make sure you're in the same directory with the package.json file

:type "npm install" (install project dependencies)

:type "npm install nodemon -g"  (make sure its installed globally on machine)

:return to CMD and type "npm run dev"

##HOW IT WORKS
access swagger docs via link: http://localhost:3000/api-docs

use POSTMAN or any similar tool to test API ENDPOINTS

##WHAT TO KNOW
:The API endpoints are described in the docs
 
:inorder to able to test all the CRUDS the system offers 

:make sure you have registered a USER and logged in 

:An ACCESS TOKEN WILL BE GIVEN to you on successful login 
which you should copy and paste into the headers 
under Authorization via POSTMAN ,so that the token is attached
to every request.

:This is how the system will be able to identify which USER is logged in 
and allow you to perform CRUD OPERATIONS defined
