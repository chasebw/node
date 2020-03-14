



CREATE SEQUENCE myseq_1
As INT
START WITH 125
INCREMENT BY -1
MINVALUE 0
MAXVALUE 200;

CREATE TABLE product 
(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    product_description VARCHAR(250),
    price float NOT NULL,
    picture VARCHAR(800)

);


INSERT INTO product (product_name,product_description,price,picture)
VALUES ('Iphone 6S','A Sleek Iphone with an attitude.', 99.99 ,'images/phone.jpg');

INSERT INTO product (product_name,product_description,price,picture)
VALUES ('Iphone 7S','A Sleek Iphone with a BIG attitude.', 199.99 ,'images/phone1.jpg');




CREATE TABLE person
(
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL
    


);

CREATE TABLE relationship
(
    person_id INT REFERENCES person(person_id),
    relationship_id SERIAL PRIMARY KEY,
    related_to VARCHAR(30) NOT NULL,
    related_from VARCHAR(30) NOT NULL,
    relation VARCHAR(30) NOT NULL



);

INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('Momma Bear', 'Smith', NOW());
INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('Pappa Bear', 'Smith', NOW());
INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('baby boy Bear', 'Smith', NOW());
INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('baby girl Bear', 'Smith', NOW());


INSERT INTO relationship (person_id,related_to,related_from,relation) VALUES (1,3,"baby boy bear","Momma Bear","Parent");