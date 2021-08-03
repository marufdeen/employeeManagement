const employeeModel = require("../models/employeeModel");
const  { validName, validEmail, validPhoneNumber, validNumber } = require('./regEx') ;

// Check if email already in the database
const checkEmail = (email) => employeeModel.findOne({ email : email.toLowerCase() });

// Check if phoneNumber already in the database
const checkPhoneNumber = (phoneNumber) => employeeModel.findOne({ phoneNumber }); 
/**
 * @description validate user details
 * @class Validations
 */
class validations {
  /**
   * @description validate user details
   * @function validateEmployeeCreation
   * @param {object} body
   * @returns {Array} creationErrors
   */
  static async validateEmployeeCreation(body) {
    const { firstName, lastName, phoneNumber, role, salary, email, password, confirmPassword} = body;
    const creationErrors = {};
    const emailAlreadyExist = await checkEmail(email); 
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber);

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      creationErrors.message =  'First name is required, with at least three alphabetical characters';
    }
   
    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      creationErrors.message = 'Last name is required, with at least three alphabetical characters';
    } 
    
    if (!email || !validEmail.test(email)) {
      creationErrors.message = 'Invalid Email Format';
    }

    if (emailAlreadyExist) {
      creationErrors.message = 'Employee with this email already exist';
    }
    if (!password || password.length < 3) {
      creationErrors.message = 'Password is required, with at least three characters';
    }

    if (!confirmPassword || confirmPassword !== password) {
      creationErrors.message = 'Passwords don\'t match';
    }

    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      creationErrors.message = 'Phone Number is required and must be up to 11 digits';
    }

    if(!salary) {
      creationErrors.message = 'Salary is required and must be in digits';
    }

    if(!role) {
      creationErrors.message = 'Role is required';
    }

    if (phoneNumberAlreadyExist) {
      creationErrors.message = 'Employee with this phone number already exist';
    }
 
    return creationErrors;
  }
 

  /**
   * @description validate user details
   * @function editValidations
   * @param {object} body
   * @returns {Array} editErrors
   */
  static async validateEmployeeEdit(body, employeeId) {
    const { firstName, lastName, role, salary, email } = body;
    const editErrors = {};
    const emailAlreadyExist = await checkEmail(email);
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber);

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      editErrors.message = 'First name is required, with at least three alphabetical characters';
    }
   
    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      editErrors.message = 'Last name is required, with at least three alphabetical characters';
    }
    if (!email || !validEmail.test(email)) {
      editErrors.message = 'Invalid Email Format';
    }
   
    if (emailAlreadyExist !== null && emailAlreadyExist.email.length > 0 && emailAlreadyExist.id !== employeeId
      ) {
        editErrors.message = 'Employee with this email already exist';
      }
    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      editErrors.message = 'Phone Number is required and must be up to 11 digits';
    }

    if (phoneNumberAlreadyExist !== null
      && phoneNumberAlreadyExist.phoneNumber.length > 0
      && phoneNumberAlreadyExist.id !== employeeId
    ) {
      editErrors.message = 'Employee with this phone number already exist';
    }
    return editErrors;
  }
}
module.exports = validations