INSERT INTO customer(username,full_name, email, password)
VALUES 
('guest', 'guest', 'guest@email.com', NULL),
('admin', 'jordan', 'jordan@email.com', 'cGFzc3dvcmQK'),
('richard0123', 'richard', 'rich@hotspace.mil', 'dGVzdAo=');

INSERT INTO product(price, product_name)
VALUES 
(24.99, 'Acme T-Shirt'),
(15.49, 'Wireless Headphones'),
(49.99, 'Stainless Steel Water Bottle'),
(99.99, 'Smartwatch'),
(12.99, 'LED Desk Lamp'),
(39.99, 'Bluetooth Speaker'),
(89.99, 'Gaming Mouse'),
(29.99, 'Travel Backpack'),
(79.99, 'Wireless Keyboard'),
(149.99, 'High-Performance Laptop');

INSERT INTO customer_product (user_id, product_id, quantity)
VALUES
('richard0123', 1, 1),
('richard0123', 3, 1),
('richard0123', 2, 8);