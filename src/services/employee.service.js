const Employee = require('../models/employee.model');

function findEmployeeByName(firstName, lastName) {
  return Employee.findOne({
    firstName,
    lastName,
  });
}

module.exports = {
  findEmployeeByName,
};
