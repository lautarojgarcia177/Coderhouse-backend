# Consigna 1
CREATE DATABASE prueba CHARACTER SET utf8;

# Consigna 2
CREATE TABLE items(
	nombre varchar(255) NOT NULL,
    categoria varchar(255) NOT NULL,
    stock int UNSIGNED,
    id INT NOT NULL AUTO_INCREMENT,
    primary key(id) 
);

# Consigna 3
INSERT INTO items (nombre, categoria, stock)
VALUES 
	("Fideos", "Harina", 20),
    ("Leche", "Lácteos", 30),
    ("Crema", "Lácteos", 15);

# Consigna 4
SELECT * FROM items;

# Consigna 5
DELETE FROM items WHERE id = 1;

# Consigna 6
UPDATE items 
SET	stock = 45
WHERE id = 2;

# Consigna 7
SELECT * FROM items;
