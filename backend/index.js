const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const app = express();
const Salt = 10;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signUp"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed: ", err);
    } else {
        console.log("Database Connected");
    }
});

// Register Route
app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`Name`, `Email`, `password`) VALUES (?)";
    
    bcrypt.hash(req.body.password, Salt, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }

        const values = [
            req.body.Name,
            req.body.Email,
            hash
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Database Insert Error:", err);
                return res.status(500).json({ error: "Error inserting data" });
            }

            return res.json({ Status: "Success" });
        });
    });
});

//login route
app.post("/login",(req,res) =>{
    const sql = "SELECT * FROM login WHERE Email = ?";

    db.query(sql, [req.body.Email], (err, result) => {  
        if (err) {
            return res.status(500).json({ Error: "Login Error in Server" });
        }

        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, match) => { 
                if (err) {
                    return res.status(500).json({ Error: "Password Compare Error" });
                }

                if (match) {
                    return res.json({ Status: "Success" }); 
                } else {
                    return res.json({ Error: "Password Not Match" });
                }
            });
        } else {
            return res.json({ Error: "No Email Existed" });
        }
    });
});

// Start Server
app.listen(8081, () => {
    console.log(" Server is Running on port 8080...");
});
