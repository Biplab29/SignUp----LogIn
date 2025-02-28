const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/Home.js");
const jwt = require("jsonwebtoken");

const verifyUser  = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ Error: "You are not logged in" }); // Changed to 401
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token is invalid" });
            } else {
                req.name = decoded.name; // Changed to req.name
                next();
            }
        });
    }
};

authRouter.get("/", verifyUser , authController);

module.exports = authRouter;


// const express = require("express");
// const authRouter = express.Router();
// const authController = require("../controller/Home.js");
// const jwt = require("jsonwebtoken");

// const verifyUser = ((req,res, next) =>{
//     const token = req.cookies.token ;
//     if(!token){
//         return res.status({ Error: "You are not logedIn" });
//     } else {
//         jwt.verify(token, "jwt-secret-key", (err, decoded) =>{
//             if(err) {
//                 return res.status(403).json({ message: "Token is invalid" });
//             } else {
//                 res.name = decoded.name ;
//                 next();
//             }
//         })
//     }
    
//     });
//  authRouter.get("/", verifyUser, authController);


// module.exports = authRouter;