const employerModel = require("../models/employerModel");
const  { validEmail } = require('./regEx') ;

// Check if email already in the database
const checkEmail = (email) => employerModel.findOne({ email : email.toLowerCase() });
 
/**
 * @description validate user details
 * @class Validations
 */
class validations {
  /**
   * @description validate user details
   * @function signupValidations
   * @param {object} body
   * @returns {Array} signupErrors
   */
  static async signupValidations(body) {
    const { email, password, confirmPassword } = body; 
    const signupErrors = {};
    const emailAlreadyExist = await checkEmail(email); 
  
    if (!email || !validEmail.test(email)) {
      signupErrors.message = 'Invalid Email Format';
    }

    if (emailAlreadyExist) {
      signupErrors.message = 'Employer with this email already exist';
    }

    if (!password || password.length < 3) {
      signupErrors.message = 'Password is required, with at least three characters';
    }

    if (!confirmPassword || confirmPassword !== password) {
      signupErrors.message = 'Passwords don\'t match';
    }
    return signupErrors;
  }

  /**
   * @description validate user details
   * @function signinValidations
   * @param {object} body
   * @returns {Array} signinErrors
   */
  static signinValidations(body) {
    const { email, password } = body;
    const signinErrors = {};

    if (!email || !validEmail.test(email)) {
      signinErrors.message = 'Invalid Email Format';
    }

    if (!password || password.length < 2) {
      signinErrors.message = 'Password must be at least three characters';
    }

    return signinErrors;
  } 
}
module.exports = validations