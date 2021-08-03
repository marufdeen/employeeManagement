const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({ 
  email: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model("Employer", employerSchema);
