DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(30),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Proactiv Acne Solution", "Skincare", 30.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("IPhoneXR", "Eletronics", 800.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("First Aid Supplies", "Health", 20.00, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("POP Games: Charmander", "Toys", 9.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Massage Recliner Chair with Remote Control", "Furniture", 299.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("PF Flyers", "Shoes", 59.95, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Cat Washroom Litter Box", "Pets", 62.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Dyson Cool Link Purifier", "Furniture", 599.00, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Popsockets Phone Stand", "Phone Accessories", 9.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Cannon Mirrorless Camera", "Electronics", 2999.99, 4);