# bamazon


**Assignment** 

Create a command line node program that mimicks a storefront. While the command line is used to interact with the user the store data should be stored in a MySQL database.  The database should have 2 tables and be accessed from javascript. 

**Solution** 

This app has 6 files:
1. schema.sql - This is the schema file that is used to create the MySQL database and the 2 tables (products and departments).
2. seed.sql - This is the seed file that is used to populate the database table with dummy data. 
3. queies.sql - This is a file that was used to store some of the queries used duirng development and testing of the applicaiton. 
4. bamazonCustomer.js - This file displays the list of available products and their prices.  It also, gets input from the user on which product they'd like to purchase. 
5. bamazonManager.js - This file allows the user to act as the manager of the storefront and see inventory levels, increase inventory and add new products.  
6. bamazonSupervisor.js - This file allows the user to act as the store supervisor and view product sales by department, view department profit, and create new departments.  

* The javascript files use the following:
    *   mysql connections
    *   inquirer to interact with the user
    *   switch statements 
    *   database interaction using SELECT, WHERE, UPDATE, GROUP BY and INSERT


**Game Image #1:** ![guess-a-letter](https://github.com/mwclemons/commandline-wordguess/raw/master/images/guess-a-letter.png)

**Game Image #2:** ![incorrect-guess](https://github.com/mwclemons/commandline-wordguess/raw/master/images/incorrect-guess.png)