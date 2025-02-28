const express = require("express");

const authController = (req, res) => { 
    return res.json({ Status: "Success", name: req.name });
}

module.exports = authController;    