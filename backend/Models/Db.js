require('dotenv').config();
const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASS,
    database: process.env.USER_DB
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports =  db;