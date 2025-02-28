const express = require('express');
const cors = require("cors");
const RegiRouter = require("./routes/Register");
const LoginRouter = require("./routes/Login"); 
const authRouter = require("./routes/Home");
const cookieParser = require('cookie-parser');

require('dotenv').config(); 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());

app.use("/", RegiRouter);
app.use("/", LoginRouter);
app.use("/", authRouter);

app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

const PORT_NO = 8080;
app.listen(PORT_NO, () => {
    console.log(`Server is Running on port ${PORT_NO}...`);
});





// const express = require('express');
// const cors = require("cors");
// const RegiRouter = require("./routes/Register");
// const LoginRouter = require("./routes/Login"); 
// const authRouter = require("./routes/Home");
// const cookieParser = require('cookie-parser');

// require('dotenv').config(); 

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));


// app.use(cookieParser());


// app.use("/", RegiRouter);
// app.use("/", LoginRouter);
// app.use("/", authRouter);

// app.get("/logout",(req , res) =>{
//     res.clearCookie('token');
//     return res.json({Status: "Success"});
// });

// const PORT_NO = 8080;
// app.listen(PORT_NO, () => {
//     console.log(`Server is Running on port ${PORT_NO}...`);
// });