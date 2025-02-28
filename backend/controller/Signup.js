const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../Models/Db");

const Salt = 10;

const Signup = (req, res) => {
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
};

console.log("Register Controller is Working");
module.exports = Signup;



// const express = require("express");
// const bcrypt = require("bcryptjs");
// const db = require("../Models/Db");

// const Salt = 10;


//  const Signup = (req, res) => {
//     const sql = "INSERT INTO login (`Name`, `Email`, `password`) VALUES (?)";
    
//     bcrypt.hash(req.body.password, Salt, (err, hash) => {
//         if (err) {
//             return res.status(500).json({ error: "Error hashing password" });
//         }
//         const values = [
//             req.body.Name,
//             req.body.Email,
//             hash
//         ];  
//         db.query(sql, [values], (err, result) => {
//             if (err) {
//                 console.error("Database Insert Error:", err);
//                 return res.status(500).json({ error: "Error inserting data" });
//             }
//             return res.json({ Status: "Success" });
//         })
//     })
// };
// console.log("SignUp Controller is Working");

// module.exports = Signup ;