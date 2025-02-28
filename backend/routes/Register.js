const express = require("express");
const RegiRouter = express.Router();
const SignUpController = require("../controller/Signup");

// Register Route
RegiRouter.post('/register', SignUpController);
console.log("Register Route is Working");
module.exports = RegiRouter;





// const express = require("express");
// const RegiRouter = express.Router();
// const SignUpController = require("../controller/Signup")





// // Register Route
// RegiRouter.post('/register', SignUpController);
// console.log("Register Route is Working");

// module.exports = RegiRouter;