class Employee {
  constructor(name, role, id, email) {
    this.name = name;
    this.role = role;
    this.id = id;
    this.email = email;
  }

  getName() {
    return `${this.name}`;
  }
  getId() {
    return `${this.id}`;
  }
  getEmail() {
    return `${this.email}`;
  }
  getRole() {
    return `${this.role}`;
  }
}

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

// const { roles } = require("./roles");

const employee = new Employee("Tom", 10, "tkerekes10@gmail.com");

console.log(employee.getName());

let employeeDataArray = [];

// let newEmployee = new Employee(
//   answers.name,
//   answers.id,
//   answers.email,
//   answers.role,
//   answers.special
// );

function fillOutEmployee(answers) {
  for (let i = 0; i < answers.length; i++) {
    let newEmployee = new Employee(
      answers[i].name,
      answers[i].id,
      answers[i].email,
      answers[i].role,
      answers[i].special
    );
    employeeDataArray.push(newEmployee);
  }

  console.log(employeeDataArray);
}

const array = [
  {
    name: "Tom",
    id: "4",
    email: "tkeree",
    role: "Manager",
    special: "5",
    new: "Yes",
  },
  {
    name: "Nat",
    id: "78",
    email: "nadams",
    role: "Engineer",
    special: "nadams",
    new: "Yes",
  },
  {
    name: "Frida",
    id: "9'",
    email: "fridak",
    role: "Intern",
    special: "UGA",
    new: "No",
  },
];

fillOutEmployee(array);

let testString = `TEST`;

function addToList(el) {
  document.body.innerHTML += `<li class="list-group-item">Name: ${el.name}
    <span class="ml-4">Price: ${el.id}</span></li>
    <span class="ml-4">Price: ${el.email}</span></li>
    <span class="ml-4">Price: ${el.role}</span></li>
    <span class="ml-4">Price: ${el.special}</span></li>
    `;

  testString += `<li class="list-group-item">Name: ${el.name}
    <span class="ml-4">Price: ${el.id}</span></li>
    <span class="ml-4">Price: ${el.email}</span></li>
    <span class="ml-4">Price: ${el.role}</span></li>
    <span class="ml-4">Price: ${el.special}</span></li>
    `;
}

console.log(array);

const { ...employees } = array;

console.log(employees);

array.forEach((el) => {
  console.log(el);
  addToList(el);
});

console.log(testString);

function createEmployeeCard(el) {
  `<li class="list-group-item">Name: ${el.name}
    <span class="ml-4">Price: ${el.id}</span></li>
    <span class="ml-4">Price: ${el.email}</span></li>
    <span class="ml-4">Price: ${el.role}</span></li>
    <span class="ml-4">Price: ${el.special}</span></li>
    `;
}

const employeeCard = function (answers) {
  answers.forEach((el) => {
    return createEmployeeCard(el);
  });
};

employeeCard(array);

// console.log(employeeCard);
