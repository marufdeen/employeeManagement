const employerModel = require('../models/employerModel');
const employeeModel = require('../models/employeeModel');
const bcrypt = require("bcryptjs");

const saltRounds = 10;

class Employee {
  /**
   * @description Create  Employee
   * @method Employee
   * @param {*} req
   * @param {*} res
   */
  static async createEmployee(req, res) { 
    const employerEmail = req.decoded.email;  
    const { firstName, lastName, phoneNumber, role, salary, email, password} = req.body;
   
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      const createEmployee = new employeeModel({ 
        email: email.toLowerCase(),
        password: hash,
        employerEmail, firstName, lastName, phoneNumber, role, salary,
      });
      const newEmployee = await createEmployee.save();
      return res.status(201).json({
        message: "Employee successfully created",
        newEmployee
      });
    });
  }
  
  
  /**
   * @description fetch all Employees from database
   * @method GET
   * @param {*} req
   * @param {*} res
   */
   static async getAllEmployees(req, res) {
    const allEmployees= await employeeModel.find();
    if (allEmployees.length > 0) {
      return res.send(allEmployees);
    }
    return res.send('No employee created yet!, be the first person to create one ... 😊');
  }
  
  /**
   * @description fetch a single Employee from database
   * @method GET/:employeeId
   * @param {*} req
   * @param {*} res
   */
   static async getSingleEmployee(req, res) {
    const employeeId = req.params.employeeId;
    const employeeFound = await employeeModel.findById(employeeId);
    if (employeeFound) { 
      return res.send({
        employeeFound, 
      });
    }

    return res.send('Employee not found!') ;
  }

  /**
   * @description Edit Employee details
   * @method PATCH/:employeeId
   * @param {*} req
   * @param {*} res
   */
   static async editEmployee(req, res) {
    const employeeId = req.params.employeeId;
    const employeeFound = await employeeModel.findById(employeeId);
    const { firstName, lastName, phoneNumber, role, salary, email}  = req.body;
    if (employeeFound) {
      employeeFound.set({
        firstName: firstName || employeeFound.firstName,
        lastName: lastName || employeeFound.lastName,
        phoneNumber: phoneNumber || employeeFound.phoneNumber,
        role: role || employeeFound.role,
        salary: salary || employeeFound.salary,
        email: email || employeeFound.email,
      });
      employeeFound.save();

      return res.send({
        message: 'Employee updated successfully!',
        employeeFound,
      });
    }
    return res.send('Employee not found');

  }

  
  /**
   * @description Delete Employee from userDB dummy database
   * @method DELETE/:employeeId
   * @param {*} req
   * @param {*} res
   */
   static async deleteEmployee(req, res) {
    const employeeId = req.params.employeeId; 
    const employeeFound = await employeeModel.findById(employeeId);
    if (employeeFound) { 
      await employeeModel.deleteOne({_id: employeeId});
      return res.send('Employee successfully deleted!');
    }
    return res.send('Employee not found!');
  } 
}

module.exports = Employee; 