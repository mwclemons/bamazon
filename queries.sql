SELECT * FROM products;
SELECT * FROM departments;
SELECT departments.department_id, departments.department_name, departments.over_head_costs,sum(products.product_sales) AS product_sales, (sum(products.product_sales) - departments.over_head_costs) as total_profit  
FROM products, departments
WHERE products.department_name=departments.department_name
GROUP BY departments.department_name,departments.over_head_costs;

SELECT * FROM products, departments
WHERE products.department_name=departments.department_name;

SELECT department_name,sum(product_sales) FROM products
GROUP BY department_name;