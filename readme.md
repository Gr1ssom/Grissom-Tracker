# Employee Management System

This command-line application allows you to manage departments, roles, and employees in a company.

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.

## Database Setup

1. Make sure you have MySQL installed on your machine.
2. In your MySQL client, run the contents of the `schema.sql` file to create the necessary database schema.

## Usage

1. Open a terminal or command prompt.
2. Navigate to the project directory.
3. run `npm install`
4. Change credentials to your mysql credentials in db.js.
5. Login to mysql using -u (username) -p
6. Enter password
7. Once in the shell, use  `source schema.sql`
8. Exit the mysql shell
9. Run `npm start` to start the application.
10. Follow the prompts to perform various actions, such as viewing departments, roles, and employees, adding departments, roles, and employees, and updating employee roles.

*see walkthrough if struggling

## Dependencies

- inquirer: ^8.1.0
- mysql: ^2.18.1

## Database Schema

The application uses the following database schema:

### Department

- id: INT PRIMARY KEY
- name: VARCHAR(30) to hold department name

### Role

- id: INT PRIMARY KEY
- title: VARCHAR(30) to hold role title
- salary: DECIMAL to hold role salary
- department_id: INT to hold reference to department role belongs to

### Employee

- id: INT PRIMARY KEY
- first_name: VARCHAR(30) to hold employee first name
- last_name: VARCHAR(30) to hold employee last name
- role_id: INT to hold reference to employee role
- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the GitHub repository.

# Walkthrough

<video src="PROJECT12WT.mp4" controls title="Walkthrough"></video>
## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any inquiries or questions, feel free to contact me at github.com/Gr1ssom.
