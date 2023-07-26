const inquirer = require('inquirer');
const db = require('./db.js'); // import database functions

// prompt user to select an action
const mainPrompt = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        process.exit(); // exit the application
    }
  });
};

const viewAllDepartments = () => {
  db.findAllDepartments()
    .then(rows => {
      console.table(rows);
      mainPrompt();
    })
    .catch(err => {
      console.log(err);
      mainPrompt();
    });
};

const viewAllRoles = () => {
  db.findAllRoles()
    .then(rows => {
      console.table(rows);
      mainPrompt();
    })
    .catch(err => {
      console.log(err);
      mainPrompt();
    });
};

const viewAllEmployees = () => {
  db.findAllEmployees()
    .then(rows => {
      console.table(rows);
      mainPrompt();
    })
    .catch(err => {
      console.log(err);
      mainPrompt();
    });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?'
    }
  ]).then(answer => {
    db.createDepartment(answer.name)
      .then(() => {
        console.log(`Added ${answer.name} to the database`);
        mainPrompt();
      })
      .catch(err => {
        console.log(err);
        mainPrompt();
      });
  });
};

const addRole = () => {
  db.findAllDepartments()
    .then(departments => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does the role belong to?',
          choices: departments.map(department => ({
            name: department.name,
            value: department.id
          }))
        }
      ]).then(answer => {
        db.createRole(answer.title, answer.salary, answer.department_id)
        .then(() => {
            console.log(`Added ${answer.title} to the database`);
            mainPrompt();
          })
          .catch(err => {
            console.log(err);
            mainPrompt();
          });
      });
    })
    .catch(err => {
      console.log(err);
      mainPrompt();
    });
};

const addEmployee = () => {
  db.findAllRoles()
    .then(roles => {
      const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }));

      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?"
        },
        {
          type: 'list',
          name: 'role_id',
          message: "What is the employee's role?",
          choices: roleChoices
        },
        {
          type: 'number',
          name: 'manager_id',
          message: "What is the employee's manager's ID?",
          default: null
        }
      ]).then(answer => {
        db.createEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id)
          .then(() => {
            console.log(`Added ${answer.first_name} ${answer.last_name} to the database`);
            mainPrompt();
          })
          .catch(err => {
            console.log(err);
            mainPrompt();
          });
      });
    })
    .catch(err => {
      console.log(err);
      mainPrompt();
    });
};

const updateEmployeeRole = () => {
  db.findAllEmployees()
    .then(employees => {
      const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));

      db.findAllRoles()
        .then(roles => {
          const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
          }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'employee_id',
              message: "Which employee's role do you want to update?",
              choices: employeeChoices
            },
            {
              type: 'list',
              name: 'role_id',
              message: "What is the employee's new role?",
              choices: roleChoices
            }
          ]).then(answer => {
            db.updateEmployeeRole(answer.employee_id, answer.role_id)
              .then(() => {
                console.log('Employee role updated successfully');
                mainPrompt();
              })
              .catch(err => {
                console.log(err);
                mainPrompt();
              });
          });
        })
        .catch(err => {
          console.log(err);
          mainPrompt();
        });
    })
    .catch(err => {
      console.log(err);
      mainPrompt();
    });
};

// start the application
mainPrompt();
