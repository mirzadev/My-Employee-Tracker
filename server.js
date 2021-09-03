// import mysql2 package (2)
const mysql = require('mysql2');
// import express and port (1)
const express = require ('express');
const PORT = process.env.PORT || 3001;
const inquirer = require ('inquirer'); 
const app = express();

const chalk = require('chalk');
const figlet = require ('figlet');
const consoleTable = require('console.table');

const inputCheck = require('./utils/inputCheck');
const validate = require('./javascript/validate');

// Adding Express middleware (1)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connecting the mysql database (2)
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',  // this is mysql user name
        password: 'Shaon3512', // my sql password
        database: 'my_employee_db'
       },
       console.log('Connected to the my_employee_db database')
);

// Database Connect and Starter Title
db.connect((err) => {
    if (err) throw err;
    console.log(chalk.yellow.bold(`==================================================================================================`));
    console.log(``);
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('My Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.greenBright.bold('Created By: Mirza A. Awal'));
    console.log(``);
    console.log(``);
    console.log(chalk.yellow.bold(`==================================================================================================`));
    promptUser();
  });

const promptUser = () =>{
    inquirer.prompt(
        [
            {
                name: 'choices',
                type: 'list',
                message: 'Please select an option:',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    'Update Employee Manager',
                    'View Employees by Manager',
                    'View All Employees By Department',
                    'Remove Department',
                    'Remove Role',
                    'Remove Employees',
                    'View Total Budget of Departments',
                    'Exit'
                ]
            }
        ])
        .then((answers) => {
            const {choices} = answers; 
            if (choices === 'View All Departments') {
              viewAllDepartments();
            }
            if (choices === 'View All Roles') {
              viewAllRoles();
            }
            if (choices === 'View All Employees') {
              viewAllEmployees();
            }
            if (choices === 'Add a Department') {
              addDepartment();
            }
            if (choices === 'Add a Role') {
              addRole();
            }
            if (choices === 'Add an Employee') {
              addEmployee();
            }
            if (choices === 'Update an Employee Role') {
              updateEmployeeRole();
            }
            if (choices === 'Update Employee Manager') {
              updateEmployeeManager();
            }
            if (choices === 'View Employees by Manager'){
                viewEmployeesByManager();
            }
            if (choices === 'View All Employees By Department') {
              viewEmployeesByDepartment();
            }
            if (choices === 'Remove Department') {
              removeDepartment();
            }
            if (choices === 'Remove Role'){
                removeRole();
            }
            if (choices === 'Remove Employees') {
              removeEmployee();
            }
            if (choices === 'View Total Budget of Departments'){
                viewDepartmentBudget();
            }
            if (choices === 'Exit'){
                quit();
            }
    });    
};

// View All Department
const viewAllDepartments = () => {
    
    console.log(chalk.green.bold(`=================================================================================================`));
    console.log(`                                ` + chalk.green.bold(`All Departments: `));
    console.log(chalk.green.bold(`=================================================================================================`));
    const sql =   `SELECT department.id AS id, department.department_name AS department FROM department`; 
    db.query(sql, (err, res) => {
      if (err) throw err;
    console.table(res);

    console.log(chalk.green.bold(`=================================================================================================`));
    promptUser();
    });
};

// View All Roles
const viewAllRoles = () => {
    console.log(chalk.green.bold(`=================================================================================================`));
    console.log(`                                ` + chalk.green.bold(`Employee Rolls: `));
    console.log(chalk.green.bold(`=================================================================================================`));
const sql = ` SELECT role.id, role.title, department.department_name AS department
              FROM role INNER JOIN department ON role.department_id = department.id`;
db.query(sql, (err, res) => {
    if (err) throw err;
    res.forEach((role) => {console.table(role.title);});
    console.log(chalk.green.bold(`=================================================================================================`));
    promptUser;
});
    
};

// View All Employees
const viewAllEmployees = () => {
    console.log(chalk.green.bold(`=================================================================================================`));
    console.log(`                              ` + chalk.green.bold(`Current Employees:`));
    console.log(chalk.green.bold(`=================================================================================================`));
    let sql =       `SELECT employee.id, employee.first_name, employee.last_name, 
                    role.title, department.department_name AS 'department',role.salary
                    FROM 
                    employee, role, department 
                    WHERE 
                    department.id = role.department_id 
                    AND 
                    role.id = employee.role_id
                    ORDER BY employee.id ASC`;
    db.query(sql, (err, res) => {
      if (err) throw err;      
      
      console.table(res);
      console.log(chalk.green.bold(`=================================================================================================`));
      promptUser();
    });
  };

  // Add a new department
  const addDepartment = () => {
      inquirer.prompt(
          [
              {
                  name: 'newDepartment',
                  type: 'input',
                  message: 'What is the name of the new Department?',
                  validate: validate.validateString
              }
          ])
          .then((answer) => {
              let sql = `INSERT INTO department(department_name) VALUES(?)`;
              db.query(sql, answer.newDepartment, (err, res) => {
                  if (err) throw err;                 
                  viewAllDepartments();
                  console.log(``);
                  console.log(chalk.greenBright(answer.newDepartment + ` Department has been successfully created!`));
                  console.log(``);
                  promptUser();
              });
          });    
  };

  // Add a new role
const addRole =() => {
    const sql = 'SELECT * FROM department'
    db.query(sql, (err, res) => {
        if (err) throw err;
        let deptNamesArray = [];
        res.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');

        inquirer
        .prompt([
          {
            name: 'departmentName',
            type: 'list',
            message: 'Which is the department for new role ?',
            choices: deptNamesArray
          }
        ])
        .then((answer) => {
            if (answer.departmentName === 'Create Department') {
              this.addDepartment();
            } else {
              addRoleResume(answer);
            }
        });
        const addRoleResume = (departmentData) => {
            inquirer.prompt(
                [
                    {
                        name: 'newRole',
                        type: 'input',
                        message: 'What is the name of this new role ?',
                        validate: validate.validateString
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the salary of this new role ?',
                        validate: validate.validateSalary
                    }
            ])
            .then((answer) => {
                let createRole = answer.newRole;
                let departmentId;

                res.forEach((department) => {
                    if(departmentData.departmentName === department.department_name){departmentId = department.id;}
                });

                let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            let crit = [createRole, answer.salary, departmentId];

            db.query(sql, crit, (err) => {
              if (err) throw err;
              console.log(chalk.green.bold(`====================================================================================`));
              console.log(chalk.greenBright(`           ` + `New Role successfully Created!`));
              console.log(chalk.green.bold(`====================================================================================`));
              
              promptUser();
            });
        });
    };
  });
};

// Add a New Employee
const addEmployee = () => {
    inquirer.prompt(
    [
      {
        type: 'input',
        name: 'fistName',
        message: "What is the employee's first name?",
        validate: addFirstName => {
          if (addFirstName) {
              return true;
          } else {
              console.log("Please enter employee's first name");
              return false;
          }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: addLastName => {
          if (addLastName) {
              return true;
          } else {
              console.log("Please enter employee's last name");
              return false;
          }
        }
      }
    ])
      .then(answer => {
      const crit = [answer.fistName, answer.lastName]
      const roleSql = `SELECT role.id, role.title FROM role`;
      db.query(roleSql, (err, data) => {
        if (err) throw err; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql =  `SELECT * FROM employee`;
                db.query(managerSql, (err, data) => {
                  if (err) throw err;
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      db.query(sql, crit, (err) => {
                      if (err) throw err;
                      console.log(chalk.green.bold(`====================================================================================`));
                      console.log(chalk.greenBright(`           ` + `New Employee successfully Added!`));
                      console.log(chalk.green.bold(`====================================================================================`));
                      viewAllEmployees();
                });
              });
            });
          });
       });
    });
  };
  

// Update an Employee's Role

const updateEmployeeRole = () =>{
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
             FROM
             employee, role, department WHERE department.id = role.department_id 
             AND 
             role.id = employee.role_id`;
  
  db.query(sql, (err, res) => {
    if (err) throw err;
    let employeeNamesArray = [];
    res.forEach((employee) => {
      employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    let sql = `SELECT role.id, role.title FROM role`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      let rolesArray = [];
      res.forEach((role) => {
        rolesArray.push(role.title);
      });

      inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let newTitleId, employeeId;

            res.forEach((role) => {
              if (answer.chosenRole === role.title) {
                newTitleId = role.id;
              }
            });

            res.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeId = employee.id;
              }
            });

            let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            db.query(sqls, [newTitleId, employeeId], (err) => {
              if (err) throw err;
              console.log(chalk.greenBright.bold(`====================================================================================`));
              console.log(chalk.greenBright(`                   `+
              `Employee Role Updated`));
              console.log(chalk.greenBright.bold(`====================================================================================`));
              promptUser();
              }
            );
          });
      });
    });
  };


// Update Employee Manager
const updateEmployeeManager = () => {
  let sql =  `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
                  FROM employee`;
   db.query(sql, (err, res) => {
     if (err) throw err;
    let employeeNamesArray = [];
    res.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

    inquirer
      .prompt([
        {
          name: 'chosenEmployee',
          type: 'list',
          message: 'Which employee has a new manager?',
          choices: employeeNamesArray
        },
        {
          name: 'newManager',
          type: 'list',
          message: 'Who is their manager?',
          choices: employeeNamesArray
        }
      ])
      .then((answer) => {
        let employeeId, managerId;
        res.forEach((employee) => {
          if (
            answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }

          if (
            answer.newManager === `${employee.first_name} ${employee.last_name}`
          ) {
            managerId = employee.id;
          }
        });

        if (validate.isSame(answer.chosenEmployee, answer.newManager)) {
          console.log(chalk.redBright.bold(`====================================================================================`));
          console.log(chalk.redBright(`                 `+`Invalid Manager Selection`));
          console.log(chalk.redBright.bold(`====================================================================================`));
          promptUser();
        } else {
          let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;

          db.query(sql,[managerId, employeeId],(err) => {
              if (err) throw err;
              console.log(chalk.greenBright.bold(`====================================================================================`));
              console.log(chalk.greenBright(`                   `+`Employee Manager Updated`));
              console.log(chalk.greenBright.bold(`====================================================================================`));
              promptUser();
            }
          );
        }
      });
  });
};


// View Employees By Manager








// View Employees By Department
const viewEmployeesByDepartment = () => {
  const sql =     `SELECT employee.first_name, employee.last_name, department.department_name AS department                 
                  FROM employee 
                  LEFT JOIN role ON employee.role_id = role.id 
                  LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
      console.log(chalk.yellow.bold(`====================================================================================`));
      console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
      console.log(chalk.yellow.bold(`====================================================================================`));
      console.table(res);
      console.log(chalk.yellow.bold(`====================================================================================`));
      promptUser();
    });
};

// Remove Department
const removeDepartment = () => {
  let sql =   `SELECT department.id, department.department_name FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    let departmentNamesArray = [];
    res.forEach((department) => {departmentNamesArray.push(department.department_name);});

    inquirer
      .prompt([
        {
          name: 'chosenDept',
          type: 'list',
          message: 'Which department would you like to remove?',
          choices: departmentNamesArray
        }
      ])
      .then((answer) => {
        let departmentId;

        res.forEach((department) => {
          if (answer.chosenDept === department.department_name) {
            departmentId = department.id;
          }
        });

        let sql =     `DELETE FROM department WHERE department.id = ?`;
        db.query(sql, [departmentId], (error) => {
          if (error) throw error;
          console.log(chalk.redBright.bold(`====================================================================================`));
          console.log(chalk.redBright(`                     `+`Department Successfully Removed`));
          console.log(chalk.redBright.bold(`====================================================================================`));
          promptUser();
        });
      });
  });
};


// Remove Roles
const removeRole = () => {
  let sql = `SELECT role.id, role.title FROM role`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    let roleNamesArray = [];
    res.forEach((role) => {roleNamesArray.push(role.title);});

    inquirer
      .prompt([
        {
          name: 'chosenRole',
          type: 'list',
          message: 'Which role would you like to remove?',
          choices: roleNamesArray
        }
      ])
      .then((answer) => {
        let roleId;

        res.forEach((role) => {
          if (answer.chosenRole === role.title) {
            roleId = role.id;
          }
        });

        let sql =   `DELETE FROM role WHERE role.id = ?`;
        db.query(sql, [roleId], (err) => {
          if (err) throw err;
          console.log(chalk.redBright.bold(`====================================================================================`));
          console.log(chalk.greenBright(`                         `+`Role Successfully Removed`));
          console.log(chalk.redBright.bold(`====================================================================================`));
          promptUser();
        });
      });
  });
};


// Remove Employees
const removeEmployee = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    let employeeNamesArray = [];
    res.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
    inquirer
      .prompt([
        {
          name: 'chosenEmployee',
          type: 'list',
          message: 'Which employee would you like to remove?',
          choices: employeeNamesArray
        }
      ])
      .then((answer) => {
        let employeeId;

        res.forEach((employee) => {
          if (
            answer.chosenEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }
        });

        let sql = `DELETE FROM employee WHERE employee.id = ?`;
        db.query(sql, [employeeId], (err) => {
          if (err) throw err;
          console.log(chalk.redBright.bold(`====================================================================================`));
          console.log(chalk.redBright(`                     `+`Employee Successfully Removed`));
          console.log(chalk.redBright.bold(`====================================================================================`));
          promptUser();
        });
      });
  });
};


// View Total Budget of a Department
const viewDepartmentBudget = () => {
  console.log(chalk.green.bold(`====================================================================================`));
  console.log(`                              ` + chalk.green.bold(`Total Budget of Departments:`));
  console.log(chalk.green.bold(`====================================================================================`));
  const sql =     `SELECT department_id AS id, 
                  department.department_name AS department,
                  SUM(salary) AS budget
                  FROM  role  
                  INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
      console.table(res);
      console.log(chalk.green.bold(`====================================================================================`));
      promptUser();
  });
};











// Exit function
function quit() {
    process.exit();
}


// Listening the Port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
