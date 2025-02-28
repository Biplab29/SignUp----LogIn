
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const db = require("../Models/Db");
// const jwt = require("jsonwebtoken");

// const Login = (req,res) => {
//     const sql = "SELECT * FROM login WHERE email = ?";

//     db.query(sql, [req.body.email], (err, result) => {  
//         if (err) {
//             return res.status(500).json({ Error: "Login Error in Server" });
//         }
//         if (result.length > 0) {
//             bcrypt.compare(req.body.password.toString(), result[0].password, (err, match) => { 
//                 if (err) { 
//                     return res.status(500).json({ Error: "Password Compare Error" });
//                 }
//                 if (match) {
//                     const name = result[0].name;
//                     const token = jwt.sign({name}, "jwt-secret-key", { expiresIn: "1d" });
//                     res.cookie('token', token);
//                     return res.json({ Status: "Success" }); 
//                 } else {
//                     return res.json({ Error: "Password Not Match" });
//                 }
//             });
//         } else {
//             return res.json({ Error: "No Email Existed" });
//         }
//     });
// }
// console.log("Login Controller is Working");

// module.exports = Login;

const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../Models/Db");
const jwt = require("jsonwebtoken");

const Login = (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], (err, result) => {  
        if (err) {
            return res.status(500).json({ Error: "Login Error in Server" });
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, match) => { 
                if (err) { 
                    return res.status(500).json({ Error: "Password Compare Error" });
                }
                if (match) {
                    const name = result[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie('token', token, { httpOnly: true }); // Set httpOnly for security
                    return res.json({ Status: "Success" }); 
                } else {
                    return res.json({ Error: "Password Not Match" });
                }
            });
        } else {
            return res.json({ Error: "No Email Existed" });
        }
    });
}

console.log("Login Controller is Working");
module.exports = Login;
