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

function showManagerList() {
    inquirer
    .prompt(
        {
            name: "task",
            type: "list",
            message: "\nWhich manager task would you like to execute:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        }
    ).then(function(answer) {
        switch (answer.task) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                promptAddToInventory();
                break;
            case "Add New Product":
                promptAddProduct();
                break;
            case "EXIT":
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      showManagerList();
  
    });
}

function viewLowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res) {
      if (err) throw err;
      console.table(res);
      showManagerList();
  
    });
}

function promptAddToInventory() {
    var myProducts = [];
    connection.query("SELECT product_name FROM products", function(err, res) {
      if (err) throw err;
      for (x = 0; x < res.length; x++) {
        myProducts.push(res[x].product_name)
      }
      inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "\nWhich product would you like to add inventory to?",
                choices: myProducts
            },
            {
                name: "quantity",
                type: "number",
                message: "\nBy how many units would you like to increase the stock by?",
                validate: function(value) {
                    if ((isNaN(value) === true)) {
                        return "That is not a valid entry. Please enter only an integer.";
                    }
                    return true;
                }
            }
        ]).then(function(answer) {
            addToInventory(answer.item, answer.quantity);
        });
      
    });
}

function addToInventory(item, quantity) {
    var currentStock = 0;
    connection.query("SELECT stock_quantity FROM products WHERE product_name = '" + item + "'", function(err, res) {
        if (err) throw err;
        currentStock = res[0].stock_quantity + quantity
        connection.query("UPDATE products SET stock_quantity = "+ currentStock +" WHERE product_name = '" + item + "'", function(err, res) {
            if (err) throw err;
            console.log("You have increased the number of " + item + "(s) in stock to "+ currentStock + ".")
            showManagerList();
        });
    });
}

function promptAddProduct() {
    inquirer
    .prompt([
        {
            name: "newitem_name",
            type: "input",
            message: "\nWhat is the name of the product you'd like to add?",
        },
        {
            name: "newitem_department",
            type: "input",
            message: "\nWhat department will the new product be in?",
        },
        {
            name: "newitem_price",
            type: "number",
            message: "\nHow much will the new product sell for?",
            validate: function(value) {
                if ((isNaN(value) === true)) {
                    return "That is not a valid entry. Please enter a dollar amount.";
                }
                return true;
            }
        },
        {
            name: "newitem_quantity",
            type: "number",
            message: "\nWhat will be the initial quantity in inventory?",
            validate: function(value) {
                if ((isNaN(value) === true)) {
                    return "That is not a valid entry. Please enter only an integer.";
                }
                return true;
            }
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('"+answer.newitem_name+"','"+answer.newitem_department+"',"+answer.newitem_price+","+answer.newitem_quantity+")", function(err, res) {
            if (err) throw err;
            showManagerList();
        });
    });
      

}


showManagerList();