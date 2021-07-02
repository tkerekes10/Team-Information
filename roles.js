const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, role, id, email, special) {
    super(name, role, id, email);
    this.special = special;
  }

  getGithub() {
    return `Github: ${this.special}`;
  }
}

class Manager extends Employee {
  constructor(name, role, id, email, special) {
    super(name, role, id, email);
    this.special = special;
  }

  getOfficeNumber() {
    return `Office Number: ${this.special}`;
  }
}

class Intern extends Employee {
  constructor(name, role, id, email, special) {
    super(name, role, id, email);
    this.special = special;
  }

  getSchool() {
    return `School Attended: ${this.special}`;
  }
}

module.exports = { Engineer, Manager, Intern };
