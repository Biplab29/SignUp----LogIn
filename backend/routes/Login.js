const express = require("express");
const LoginRouter = express.Router();
const LoginController = require("../controller/Login");

LoginRouter.post("/login", LoginController);

console.log("Login Router is working");
module.exports = LoginRouter;





// const express = require("express");
// const LoginRouter = express.Router();
// const LoginController = require("../controller/Login")



// LoginRouter.post("/login", LoginController);

// console.log("Login Router is working");

// module.exports = LoginRouter;