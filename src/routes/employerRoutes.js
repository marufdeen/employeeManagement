const express = require("express");
const Employer = require("../controllers/employerController"); 
const { validateSignup, validateSignin } = require("../middlewares/employerCredentials"); 

const router = express.Router();

router.post("/register", validateSignup, Employer.register);
router.post("/login", validateSignin, Employer.login); 

module.exports = router;
