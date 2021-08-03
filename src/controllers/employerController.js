const bcrypt = require("bcryptjs");
const createToken = require("../helpers/createToken");
const employerModel = require("../models/employerModel"); 

const saltRounds = 10;
/**
 * @description user controller
 * class user
 */
class Employer {
  /**
   * @description signup an Employer into database
   * @method POST
   * @param {*} req
   * @param {*} res
   */
  static async register(req, res) {
    const { email, password } = req.body;
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      const createEmployer = new employerModel({ 
        email: email.toLowerCase(),
        password: hash,
      });
      const newEmployer = await createEmployer.save();
      return res.status(201).json({
        message: "Employer successfully created",
        token: await createToken(newEmployer),
      });
    });
  }

  /**
   * @description login Employer from database
   * @method POST
   * @param {*} req
   * @param {*} res
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const employerFound = await employerModel.findOne({ email: email.toLowerCase()});
    if (employerFound) {
      await bcrypt.compare(password, employerFound.password, (error, result) => {
        if (result) {
          return res.status(200).send({
            message: "Access granted!",
            token: createToken(employerFound),
          });
        }
        return res.send('Email and password don\'t match!');
      });
    } else {
      return res.send('Access denied!');

    }
  } 
 
}

module.exports = Employer;
