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
 
 module.exports =  validateEmployeeDetails;
