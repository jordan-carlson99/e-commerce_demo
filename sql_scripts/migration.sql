DROP TABLE IF EXISTS customer_product;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS product;
CREATE TABLE customer(
    username varchar(256) unique,
    full_name varchar(256),
    email varchar(256),
    password varchar(256),
    PRIMARY KEY (username)
);
CREATE TABLE product (
    id serial unique,
    price decimal,
    product_name text,
    PRIMARY KEY (id)
);
CREATE TABLE customer_product (
    user_id varchar,
    product_id int,
    quantity int,
    FOREIGN KEY (user_id) REFERENCES customer(username),
    FOREIGN KEY (product_id) REFERENCES product(id)
);