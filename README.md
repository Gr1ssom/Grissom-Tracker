# Grissom-Tracker

Employee Tracker
Description
Employee Tracker is a command-line application that allows users to manage employee data, including departments, roles, and employees. Users can view all departments, roles, and employees, as well as add new departments, roles, and employees. Users can also update an employee's role.

Table of Contents
Installation
Usage
Credits
License
Installation
To install Employee Tracker, clone the GitHub repository and run npm install to install the dependencies.

Employee Tracker requires a MySQL database to store employee data. Create a database using the included schema.sql file and add data to the database using the seed.sql file.

Employee Tracker uses environment variables to store the database connection information. Create a .env file in the root directory of the project and add the following variables:

makefile
Copy code
DB_HOST=<database hostname>
DB_USER=<database username>
DB_PASSWORD=<database password>
DB_NAME=<database name>
Usage
To run Employee Tracker, enter npm start in the command line. Select from the available options to view data or add new data to the database.

Credits
Employee Tracker was created by Dylan Grissom.

Employee Tracker uses the following open source packages:

Inquirer.js
mysql2
console.table
License
Employee Tracker is licensed under the MIT License.
