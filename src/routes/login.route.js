const express = require('express');
const router = express.Router();
const user_db = require("../services/user-database.js");
const interactions_db = require("../services/interactions-database.js");

// Sign up endpoint
router.route('/sign-up').post(function (req, res, next) {
    // Pass in account creation info through JSON
    // Create object to hold account info
    let user = {
        email: req.body.email,
        username : req.body.username,
        password: req.body.password,
    }

    // Check if email is already in DB
    let stmt = user_db.prepare("SELECT * FROM userLoginInfo WHERE email = ?");
    let insert = stmt.get(user.email);
    console.log(insert);

    if (typeof insert == "undefined") {
        stmt = user_db.prepare("INSERT INTO userLoginInfo (email, password, username) VALUES (?, ?, ?)");
        insert = stmt.run(user.email, user.password, user.username);
        res.status(200).send("Account created");
    } else {
        res.status(404).send("Account already exists");
    }
});

// Sign in Endpoint
router.route('/sign-in').get(function (req, res, next) {
    const select_statement = db.prepare('SELECT * FROM accesslog').all();
});

module.exports = router;