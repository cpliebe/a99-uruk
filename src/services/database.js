const Database = require('better-sqlite3');
const user_db = new Database('accesslog.db');
const interactions_db = new Database('interactions.db');


// Create database for user information
const user_stmt = user_db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' and name = 'userLoginInfo';`);

let user_row = user_stmt.get();

if (user_row == undefined) {
    const sqlInit = `
        CREATE TABLE userLoginInfo (
            userId INTEGER PRIMARY KEY, 
            email TEXT, 
            password TEXT, 
            username TEXT
        );`
        user_db.exec(sqlInit);
} else {
    console.log('User DB exists.');
}

// Create database for user interactions
const interactions_stmt = interactions_db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' and name = 'userInteractionInfo';`);

let interactions_row = interactions_stmt.get();

if (interactions_row == undefined) {
    const sqlInit = `
        CREATE TABLE userInteractionInfo (
            userInteractionId INTEGER PRIMARY KEY, 
            email TEXT,
            username TEXT,
            time TEXT
        );`
        interactions_db.exec(sqlInit);
} else {
    console.log('Interactions DB exists.');
}

module.exports = user_db, interactions_db;