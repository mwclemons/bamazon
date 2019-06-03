# bamazon


**Assignment** 

Create a command line node program that mimicks a storefront. While the command line is used to interact with the user the store data should be stored in a MySQL database.  The database should have 2 tables and be accessed from javascript. 

**Solution** 

This app has 6 files:
1. schema.sql - This is the schema file that is used to create the MySQL database and the 2 tables (products and departments).
2. seed.sql - This is the seed file that is used to populate the database table with dummy data. 
3. queies.sql - This is a file that was used to store some of the queries used duirng development and testing of the applicaiton. 
4. bamazonCustomer.js - This file displays the list of available products and their prices.  It also, gets input from the user on which product they'd like to purchase. 

    **Bamazon Image - Customer Item Table** ![Customer Item Table](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-customer-itemtable.png)

    **Bamazon Image - Customer Purchase** ![Customer Purchase](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-customer-completepurchase.png)

5. bamazonManager.js - This file allows the user to act as the manager of the storefront and see inventory levels, increase inventory and add new products.  

    **Bamazon Image - Manager List** ![Manager List](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-manager-list.png)

    **Bamazon Image - Manager View Products** ![Manager View Products](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-manager-viewproducts.png)

    **Bamazon Image - Manager View Low Inventory** ![Manager View Low Inventory](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-manager-viewlowinventory.png)

    **Bamazon Image - Manager Add Inventory** ![Manager Add Inventory](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-manager-addtoinventory.png)

    **Bamazon Image - Manager Add Product** ![Manager Add Product](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-manager-addnewproduct.png)

6. bamazonSupervisor.js - This file allows the user to act as the store supervisor and view product sales by department, view department profit, and create new departments.  

    **Bamazon Image - Supervisor View Sales** ![Manager Add Inventory](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-supervisor-viewsales.png)
    
    **Bamazon Image - Supervisor Create Department** ![Manager Add Product](https://github.com/mwclemons/bamazon/raw/master/images/bamazon-supervisor-createdepartment.png)






