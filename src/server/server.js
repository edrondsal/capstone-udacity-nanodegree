/*--------------------------------------------------------
Server code for CAPSTONE project. UDACITY Project - Front End Developper Nanodegree
version: 0.0.1
created on: 20/06/20
last modified: 20/06/20
Updates:
20/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const port = 8000;
let appTripData = {};

// Start up an instance of app
const app = express();

//Configuration of express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Configuration of express to use  Cors for cross origin allowance
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
const server = app.listen(port,listening);


/**
 * @description Function working as the callback of the listen function used to create the server
 * @since      0.0.1
 * @access     private
*/
function listening(){
    console.log(`server running in localhost:${port}`);
}


