const express = require('express'); 
const employeeController = require('../controllers/employeeController');
const  {validateEmployeeDetails, validateEditEmployee} = require('../middlewares/employeeCredentials'); 
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.post('/employees', [verifyToken, validateEmployeeDetails], employeeController.createEmployee);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:employeeId', employeeController.getSingleEmployee);   
router.patch('/employees/:employeeId', validateEditEmployee, employeeController.editEmployee);
router.delete('/employees/:employeeId', employeeController.deleteEmployee); 

module.exports = router;