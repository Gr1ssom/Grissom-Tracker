const mysql = require('mysql');
const util = require('util');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'your user',
  password: 'your password',
  database: 'GrissomTrackerDB'
});

// Promisify the connection query method
const query = util.promisify(connection.query).bind(connection);

// Function to find all departments
const findAllDepartments = () => {
  return query('SELECT * FROM department');
};

// Function to find all roles
const findAllRoles = () => {
  return query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
  `);
};

// Function to find all employees
const findAllEmployees = () => {
  return query(`
    SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department,
           role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
};

// Function to create a department
const createDepartment = (name) => {
  return query('INSERT INTO department (name) VALUES (?)', [name]);
};

// Function to create a role
const createRole = (title, salary, department_id) => {
  return query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
};

// Function to create an employee
const createEmployee = (first_name, last_name, role_id, manager_id) => {
  return query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [first_name, last_name, role_id, manager_id]);
};

// Function to update an employee role
const updateEmployeeRole = (employee_id, role_id) => {
  return query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);
};

module.exports = {
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  updateEmployeeRole
};
