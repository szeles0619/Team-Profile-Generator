const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let newEmployeesArr = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const generateManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What's the manager's name? ",
            name: 'name'
        },
        {
            type: 'input',
            message: "What's the manager's ID number? ",
            name: 'id'
        },
        {
            type: 'input',
            message: "What's the manager's email address? ",
            name: 'email'
        },
        {
            type: 'input',
            message: "What's the manager's office number? ",
            name: 'office'
        }
    ])
        .then((info) => {
            const { name, id, email, office } = info;

            const manager = new Manager(name, id, email, office);
            newEmployeesArr.push(manager);
            teamEditMenu();
        }
        )
}

const generateEngineer = (info) => {
    const { name, id, email, github } = info;
    const engineer = new Engineer(name, id, email, github);
    employeesArr.push(engineer);
}

const getEngineerInfo = () => {
    inquirer.prompt([
            {
                type: 'input',
                message: "What's the engineer's name? ",
                name: 'name',
            },
            {
                type: 'input',
                message: "What's the engineer's ID number? ",
                name: 'id'
            },
            {
                type: 'input',
                message: "What's the engineer's email address? ",
                name: 'email'
            },
            {
                type: 'input',
                message: "What's the engineer's github username? ",
                name: 'github'
            }
        ])
        .then((info) => {
            generateEngineer(info);
            teamEditMenu();
        })
}

const generateIntern = (info) => {
    const { name, id, email, school } = info;
    const intern = new Intern(name, id, email, school);
    employeesArr.push(intern);
}

const getInternInfo = () => {
    inquirer.prompt([
            {
                type: 'input',
                message: "What's the intern's name? ",
                name: 'name'
            },
            {
                type: 'input',
                message: "What's the intern's ID number: ",
                name: 'id'
            },
            {
                type: 'input',
                message: "What's the intern's email address? ",
                name: 'email'
            },
            {
                type: 'input',
                message: "What's the intern's school? ",
                name: 'school'
            }
        ])
        .then((info) => {
            generateIntern(info);
            teamEditMenu();
        })
}

const teamEditMenu = () => {
    inquirer.
    prompt([
    {
        type: 'list',
        message:'What do you want to do next?',
        name: 'choice',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    }
    ])
    .then((response) => {
        if (response.choice === 'Add an engineer') {
            getEngineerInfo();
        } else if (response.choice === 'Add an intern') {
            getInternInfo();
        } else {
            console.log('Finish team build');
            const teamInfo = render(newEmployeesArr);
            completeTeam(teamInfo);
        }
    })
}

const completeTeam = (teamInfo) => {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdir((OUTPUT_DIR), (err) => {
            if (err) {
                return console.error(err);
            }
        })
    }

    fs.writeFile(outputPath, teamInfo, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('The team page has been created.');
        }
    })
}


const init = () => {
    generateManager();
}

init();
