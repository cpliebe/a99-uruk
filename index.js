const express = require('express');
const minimist = require('minimist');
const bodyParser = require("body-parser");
const fs = require('fs');
const user_db = require("./src/services/user-database.js");
const interactions_db = require("./src/services/interactions-database.js");
const morgan = require('morgan');
const path = require('path')
const app = express()

// Serve login page as start page
app.use(express.static('./public/login'));

// Allows epxress to use body-parser as middle-ware
// Needed to transmit data across POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const argv = (minimist)(process.argv.slice(2));

// Set valid arguments
argv["port"];

// Get port from argument, if not argument exists set to 5000
const HTTP_PORT = argv.port || 5000;

// Listen on port
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// EXAMPLEPAGE route
app.use(require("./src/routes/examplepage.route"))


// Signup Endpoint
app.post('/sign-up', (req, res) => {
    // Pass in account creation info through JSON
    // Create object to hold account info
    let user = {
        email: req.body.email,
        username : req.body.username,
        password: req.body.password,
    }

    // Add account to database
    const stmt = user_db.prepare("INSERT INTO userLoginInfo (email, password, username) VALUES (?, ?, ?)");
    const insert = stmt.run(user.email, user.password, user.username);
    console.log(user);
    res.status(404).send("Account created");
});


// Endpoint that lets you view all user accounts
// Should be removed before final submission
app.get('/view-user-db', (req, res) => {
    const select_statement = user_db.prepare('SELECT * FROM userLoginInfo').all();
    res.status(200).json(select_statement);
});


// Endpoint that lets you view all user interactions
// Should be removed before final submission
app.get('/view-interactions-db', (req, res) => {
    const select_statement = interactions_db.prepare('SELECT * FROM userInteractionInfo').all();
    res.status(200).json(select_statement);
});


// Signin Endpoint
app.get('/sign-in', (req, res) => {
    const select_statement = db.prepare('SELECT * FROM accesslog').all();
});


// Default endpoint request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
