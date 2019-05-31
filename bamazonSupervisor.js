var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "snizz11bre",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});

function showSupervisorList() {
    inquirer
    .prompt(
        {
            name: "task",
            type: "list",
            message: "\nWhich supervisor task would you like to execute:",
            choices: ["View Product Sales by Department", "Create New Department", "EXIT"]
        }
    ).then(function(answer) {
        switch (answer.task) {
            case "View Product Sales by Department":
                viewProductSales();
                break;
            case "Create New Department":
                createNewDepartment();
                break;
            case "EXIT":
            connection.end();
            break;
        }
    });
}

function viewProductSales() {
    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales)" + 
    "as product_sales, (sum(products.product_sales) - departments.over_head_costs) as total_profit FROM products, departments "+
    "WHERE products.department_name=departments.department_name GROUP BY departments.department_name,departments.over_head_costs", 
    function(err, res) {
      if (err) throw err;
      console.table(res);
      showSupervisorList();
  
    });
}


function createNewDepartment() {
    inquirer
    .prompt([
        {
            name: "newdept_name",
            type: "input",
            message: "\nWhat is the name of the new department?",
        },
        {
            name: "newdept_overhead",
            type: "num",
            message: "\nWhat will the new department over head costs be?",
            validate: function(value) {
                if ((isNaN(value) === true)) {
                    return "That is not a valid entry. Please enter a dollar amount.";
                }
                return true;
            }
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO departments (department_name,over_head_costs) VALUES ('"+answer.newdept_name+"',"+answer.newdept_overhead+")", function(err, res) {
            if (err) throw err;
            console.log("New Department Added");
            showSupervisorList();
        });
    });
      

}
showSupervisorList();