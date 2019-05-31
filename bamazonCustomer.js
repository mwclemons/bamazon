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
    console.log("connected as id " + connection.threadId);
    
});

function displayProducts(callback) {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      callback();
  
    });
}

function askQuestions() {
    inquirer
    .prompt([
        {
            name: "itemNumber",
            type: "number",
            message: "\nPlease enter the item_id of the product you'd like to buy:",
            validate: function(value) {
                if ((isNaN(value) === true)) {
                    return "That is not a valid entry. Please select from the list above.";
                } else if (value < 0 || value > 10) {
                    return "That is not a valid entry. Please select from the list above.";
                }
                return true;
            }
        },{
            name: "amount",
            type: "number",
            message: "\nPlease enter how many you'd like to buy:",
            validate: function(value) {
                if (isNaN(value) === true) {
                    return "That is not a valid entry. Please enter how many you'd like to buy:";
                }
                return true;
            }
        }
    ]).then(function(answer) {
      
        // console.log(answer.itemNumber, answer.amount)
        checkQuantity(answer.itemNumber, answer.amount);
      
    });
}

function checkQuantity(item, quantity) {
    connection.query("SELECT * FROM products WHERE item_id = " + item, function(err, res) {
        if (err) throw err;
        if (res[0].stock_quantity < quantity) {
            console.log("Insufficient quantity!")
        } else {
            executePurchase(item, quantity, res[0].stock_quantity, res[0].price, res[0].product_sales);
        }
       
    });
}

function executePurchase(item, quantity, stock, price, sales) {
    stock = stock - quantity;
    sales = sales + (quantity * price);
    connection.query("UPDATE products SET stock_quantity = "+ stock +" WHERE item_id = " + item, function(err, res) {
        if (err) throw err;

        console.log("The total cost of your purchase was: $" + (price * quantity).toFixed(2));
        connection.query("UPDATE products SET product_sales = "+ sales +" WHERE item_id = " + item, function(err, res) {
            if (err) throw err;
            connection.end();
        });
        
    });
}

displayProducts(askQuestions);

