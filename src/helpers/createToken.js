const jwt = require("jsonwebtoken");

const secret = process.env.JWT_KEY;

const createToken = (employerData) => {
  const token = jwt.sign(
    {
      emploerId: employerData._id, 
      email: employerData.email, 
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
module.exports = createToken;
