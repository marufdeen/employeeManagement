const mongoose = require('mongoose'); 

const employeeSchema = new mongoose.Schema({ 
    employerEmail: String,
    firstName: String,
    LastName: String,    
    email: String,
    phoneNumber: String,
    role: String,
    salary: String,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
