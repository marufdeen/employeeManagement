const express = require('express'); 
const employerRoutes = require('./employerRoutes');
 const employeeRoutes = require('./employeeRoutes');  
const router = express.Router();  

router.get("/", (req, res) => res.send("Welcome to Employee Management APP .")); 

// User Routes
router.use(employerRoutes)

// Post Routes
router.use(employeeRoutes);
 

module.exports = router;
