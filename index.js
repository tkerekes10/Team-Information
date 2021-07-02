const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Employee = require("./employee");
const { roles } = require("./roles");

const employee = new Employee("Tom", 10, "tkerekes10@gmail.com", roles);

console.log(employee.getName());

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

let employeeDataArray = [];

let employeeCardData = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">`;

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your ID number?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
  {
    type: "list",
    name: "role",
    message: "What is your role in the company?",
    choices: ["Manager", "Engineer", "Intern"],
    default: "Engineer",
  },
  {
    type: "input",
    name: "special",
    message: "What is your office number?",
    when: (answers) => answers.role === "Manager",
  },
  {
    type: "input",
    name: "special",
    message: "What is your github username?",
    when: (answers) => answers.role === "Engineer",
  },
  {
    type: "input",
    name: "special",
    message: "What school did/do you attend?",
    when: (answers) => answers.role === "Intern",
  },
  {
    type: "list",
    name: "new",
    message: "Would you like to add another employee?",
    choices: ["Yes", "No"],
    default: "Yes",
  },

  //This is all I will ask in the beginning in order to add the if statement depending on the role

  // {
  //   type: "input",
  //   name: "github",
  //   message: "Enter your GitHub Username",
  // },
  // {
  //   type: "input",
  //   name: "linkedin",
  //   message: "Enter your LinkedIn URL.",
  // },
];

let array = [
  {
    name: "Tom",
    id: "4",
    email: "tkerekes10",
    role: "Engineer",
    special: "UGA",
  },
];

function createEmployeeCard(array) {
  for (let i = 0; i < array.length; i++) {
    return `<li class="list-group-item">Name: ${array[i].name}
    <span class="ml-4">${array[i].id}</span></li>
    <span class="ml-4">${array[i].email}</span></li>
    <span class="ml-4">${array[i].role}</span></li>
    <span class="ml-4">${array[i].special}</span></li>
    `;
  }
}

// const employeeCard = function (answers) {
//   console.log(answers);
//   employeeDataArray.forEach((el) => {
//     console.log(el);
//     return createEmployeeCard(el);
//   });
// };

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
}

const promptUser = (questions) => {
  return inquirer.prompt(questions).then(function (answers) {
    if (answers.new === "Yes") {
      fillOutEmployee(answers);
      return promptUser(questions);
    } else {
      fillOutEmployee(answers);
      return employeeDataArray;
    }
  });
};

// promptUser(questions);

const endHTML = `</div>
</div>
</body>
</html>`;

function generateHTML(answers) {
  return employeeCardData + createEmployeeCard(answers) + endHTML;
}

// Bonus using writeFileAsync as a promise

const init = () => {
  promptUser(questions)
    .then((answers) => writeFileAsync("index.html", generateHTML(array)))
    .then(() => console.log("Successfully wrote to index.html"))
    .catch((err) => console.error(err));
};

init();
