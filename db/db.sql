



CREATE SEQUENCE myseq_1
As INT
START WITH 125
INCREMENT BY -1
MINVALUE 0
MAXVALUE 200;

DROP TABLE product;

CREATE TABLE product 
(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    product_description VARCHAR(250),
    price float NOT NULL,
    picture VARCHAR(800)

);

--Phone # 1
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('Iphone 6S','A Sleek Iphone with an attitude.', 99.99 ,'images/phone.jpg');


--Phone # 2
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('Iphone 7S','A Sleek Iphone with a BIG attitude.', 199.99 ,'images/phone1.jpg');


--Phone # 3
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Z Fold','A dynamically designed smart phone', 1999.99 ,'images/phone3.jpeg');


--Phone # 4
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Rollable Phone','A phone that can roll open a bigger screen', 2999.99 ,'images/phone4.jpg');


--Phone # 5
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Dark Knight','A Sleekly designed phone that is sly.', 999.99 ,'images/phone5.jpg');

--Phone # 6
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Space Phone','A Phone that is out of this world.', 4999.99 ,'images/phone7.jpg');

--Phone # 7
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Simple Phone','A Phone that meets your basic needs.', 19.99 ,'images/phone8.jpg');

--Phone # 8
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The BlackBerry','A phone that tastes yummy like a fruit.', 99.99 ,'images/phone9.jpg');

--Phone # 9
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Nokia 15','A phone that doubles as a camera.', 599.99 ,'images/phone10.jpg');

--Phone # 10
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Stylish Flip','A stylishly polished flip phone.', 39.99 ,'images/phone11.jpg');

--Phone # 11
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Classic Flip','A Classic yet essential flip phone.', 34.99 ,'images/phone12.jpg');

--Phone # 12
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Minimalist Phone','A phone that meets your minimum.', 9.99 ,'images/phone15.jpeg');

--Phone # 13
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Revolution','A design that is revolutionary to the normal phone.', 799.99 ,'images/phone16.jpg');

--Phone # 14
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Sky Cloud','A phone that has no notch.', 899.99 ,'images/phone17.jpg');

--Phone # 15
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Motorola 1500','A phone that is best on the market.', 999.99 ,'images/phone18.png');

--Phone # 16
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Clear Crystal','A phone that is clear all the way through.', 1999.99 ,'images/phone19.jpg');

--Phone # 17
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Beautiful Flip','A phone that gives you all you need.', 59.99 ,'images/phone20.png');

--Phone # 18
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Indestructible Child','A phone that does not break.', 45.99 ,'images/phone21.jpg');

--Phone # 19
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The Clear Crystal Fold','A foldable clear crystal phone.', 2199.99 ,'images/phone22.png');

--Phone # 20
INSERT INTO product (product_name,product_description,price,picture)
VALUES ('The 2 Screen Phone','A phone that doubles what you had before.', 799.99 ,'images/phone23.jpg');







-- CREATE TABLE person
-- (
--     person_id SERIAL PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     date_of_birth DATE NOT NULL
    


-- );

-- CREATE TABLE relationship
-- (
--     person_id INT REFERENCES person(person_id),
--     relationship_id SERIAL PRIMARY KEY,
--     related_to VARCHAR(30) NOT NULL,
--     related_from VARCHAR(30) NOT NULL,
--     relation VARCHAR(30) NOT NULL



-- );

-- INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('Momma Bear', 'Smith', NOW());
-- INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('Pappa Bear', 'Smith', NOW());
-- INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('baby boy Bear', 'Smith', NOW());
-- INSERT INTO person (first_name,last_name,date_of_birth) VALUES ('baby girl Bear', 'Smith', NOW());


-- INSERT INTO relationship (person_id,related_to,related_from,relation) VALUES (1,3,"baby boy bear","Momma Bear","Parent");