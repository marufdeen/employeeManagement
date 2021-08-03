const  validation = require('../helpers/employerValidations') ;

exports.validateSignup = async (req, res, next) => {
  const errors = await validation.signupValidations(req.body);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
};

exports.validateSignin = async (req, res, next) => {
  const errors = await validation.signinValidations(req.body);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
};