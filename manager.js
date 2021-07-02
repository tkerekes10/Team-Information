const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, role, id, email, officeNumber) {
    super(name, role, id, email);
    this.officeNumber = officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
