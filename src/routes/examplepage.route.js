const express = require('express');
const router = express.Router();
const path = require('path')

router.route('/examplepage/').get(function (req, res, next) {
    res.sendFile(path.join(__dirname.slice(0,-11), 'public/examplepage/index.html'));
})

router.route('/examplepage/style.css').get(function (req, res, next) {
    res.sendFile(path.join(__dirname.slice(0,-11), 'public/examplepage/style.css'));
})

router.route('/examplepage/script.js').get(function (req, res, next) {
    res.sendFile(path.join(__dirname.slice(0,-11), 'public/examplepage/script.js'));
})

module.exports = router;