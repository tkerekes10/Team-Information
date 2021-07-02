const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Employee = require("./employee");
const { roles } = require("./roles");

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

let employeeDataArray = [];

//The start of the HTML
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

//Prompt Questions
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
];

//Exmaple Data that is being passed into the createEmployeeCard to show that it works (just that I ran into a roadblock in getting the correct info from the prompt)
let array = [
  {
    name: "Tom",
    id: "4",
    email: "tkerekes10",
    role: "Engineer",
    special: "UGA",
  },
];

//Create the cards that will go into the HTML file
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

//This is what fills out the createEmployeeCard
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

//This is to check if the inquirer needs to move on to another employee or not
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

//This is the ending of the HTML file
const endHTML = `</div>
</div>
</body>
</html>`;

// This is to add the employeecards to the HTML with the start and end parts
function generateHTML(answers) {
  return employeeCardData + createEmployeeCard(answers) + endHTML;
}

// Bonus using writeFileAsync as a promise

//This is what starts the whole process off
const init = () => {
  promptUser(questions)
    .then((answers) => writeFileAsync("index.html", generateHTML(array)))
    .then(() => console.log("Successfully wrote to index.html"))
    .catch((err) => console.error(err));
};

init();
