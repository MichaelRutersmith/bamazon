drop table products;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id int NOT NULL,
product_name varchar(50) NOT NULL,
department_name varchar(50) NOT NULL,
price DECIMAL(4,2) NOT NULL,
stock_quantity int NOT NULL);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
50001,
'Red Fireworks',
'Entertainment',
25.99,
100);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
50002,
'Blue Fireworks',
'Entertainment',
22.99,
45);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
50003,
'White Fireworks',
'Entertainment',
18.99,
22);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
10001,
'Swimming Trunks',
'Clothing',
25.99,
35);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
10002,
'Bikini',
'Clothing',
55.21,
76);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
10003,
'Cat Themed Light Up Suit',
'Clothing',
25.05,
18);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
30001,
'Juicer',
'Kitchenware',
5.01,
51);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
30002,
'Can Opener',
'Kitchenware',
85.26,
87);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
30003,
'Butcher Knife',
'Kitchenware',
58.37,
16);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
40001,
'Phone Charger Adapter',
'Car accessories',
10.27,
7);

INSERT INTO products (item_id, product_name, department_name,price, stock_quantity)  VALUES (
40002,
'Self Starter',
'Car accessories',
98.79,
31);
