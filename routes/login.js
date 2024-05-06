const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginsController = require("../controllers/loginController");

router.post("/login", loginsController.toLoggIn);

module.exports = router;
