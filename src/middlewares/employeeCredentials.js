const validate  = require('../helpers/employeeValidations') ;

 const validateEmployeeDetails = async (req, res, next) => {
  const errors = await validate.validateEmployeeCreation(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(401).json({
      errors
    });
  }
  return next();
};

const validateEditEmployee = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  const errors = await validate.validateEmployeeEdit(req.body, employeeId);
  if (Object.keys(errors).length > 0) {
    return res.status(401).json({
      errors
    });
  }
  return next();
};
 
 
 module.exports =  {validateEmployeeDetails, validateEditEmployee};
