const express = require('express');
const minimist = require('minimist');
const fs = require('fs');
const user_db = require("./src/services/user-database.js");
const interactions_db = require("./src/services/interactions-database.js");
const morgan = require('morgan');
const app = express()

// Serve login page as start page
app.use(express.static('./public/login'));

const argv = (minimist)(process.argv.slice(2));

// Set valid arguments
argv["port"];

// Get port from argument, if not argument exists set to 5000
const HTTP_PORT = argv.port || 5000;

// Listen on port
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Endpoints for directory to EXAMPLEPAGE ----------- (should try to put this in a separate folder/file)

// Returns html
app.get('/examplepage/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/examplepage/index.html'));
})

// Returns css
app.get('/examplepage/style.css', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/examplepage/style.css'));
})

// Returns js
app.get('/examplepage/script.js', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/examplepage/script.js'));
})

// ---------------------------------------------------

// Signup Endpoint
app.get('/sign-up', (req, res) => {
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
});


// Signin Endpoint
app.get('/sign-in', (req, res) => {
    const select_statement = db.prepare('SELECT * FROM accesslog').all();
});


// Default endpoint request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
