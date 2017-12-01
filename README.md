# COP4331-Employee-Tracker
Create a mobile application that can keep track of a user. When the user logs into to the system the user's image will be captured and GPS location will be send to the admin where admin can view image and GPS location in web application. After login, GPS location of the employee will be tracked automatically by the system and send to the admin every 10 minutes. The admin can add new employee and view the GPS location of the employee by entering employee identity number as well as date. Since GPS location of the employee is tracked, the employees should not be able to add fake their location.

##### Download project
`git clone https://github.com/tparkerd/cop4331-employee-tracker-web.git`

##### Dependencies
1. [Node 9.0.0+](https://nodejs.org/en/)

#### Build Instructions

###### Install via `npm`
Make sure to be in the `/server` directory with terminal or command prompt
- Linux: `sudo npm install`
- Windows: `npm install` (run command prompt as an administrator)

###### Running the server
- `npm start`

In case `nodemon` is not installed, use `node app.js`
