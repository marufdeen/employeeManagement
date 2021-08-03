const express = require('express'); 
const employeeController = require('../controllers/employeeController');
const  validateEmployeeDetails = require('../middlewares/employeeCredentials');
//const checkAuth = require('../middlewares/checkAuth')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.post('/employees', [verifyToken], validateEmployeeDetails, employeeController.createEmployee);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:employeeId', employeeController.getSingleEmployee);   
router.patch('/employees/:employeeId',employeeController.editEmployee);
router.delete('/employees/:employeeId', employeeController.deleteEmployee); 

module.exports = router;