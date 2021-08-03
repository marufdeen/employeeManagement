const employerModel = require('../models/employerModel');

const checkAuth = async ({ decoded: { employerId } }, res, next) => {
  const userFound = await employerModel.findById(employerId);
  if (userFound) {
    return next();
  }
  return res.send('Login First');
}; 

module.exports =  checkAuth;