INSERT INTO department(department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing"), ("Adminstration");

INSERT INTO role(title, salary, department_id)
VALUES ("CEO", 400000, 1), ("President Technology Operation", 140000, 1), ("Lead Engineer", 175000, 2), ("Software Engineer", 135000, 2), 
("Manager Sales", 145000, 3), ("Sales Associate", 65000, 3), ("Chief Finance Officer", 265000, 4), ("Accountant", 200000, 4), 
("Legal Team Lead", 290000, 5), ("Lawyer", 290000, 5),("Marketing Manager", 190000, 6), ("Marketing Associate", 110000, 6);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Eduardo', 'Rodguize', 1, 11), ('Mirza', 'Awal', 2, 1), ('Harry', 'Nebula', 3, 11), ('John', 'Nichuchi', 4, 3), 
('Andrew', 'Jones', 5, 11), ('Zersis', 'Minocher', 6, 5), ('Evens', 'Alexandre', 7, 11), ('Kelly', 'Jones', 8, 7),
('Maria', 'kerry', 9, 11), ('Mustafa', 'Rusho', 10, 9), ('Jasus', 'Pazmino', 11, 11), ('Ehsan', 'Ahmed', 12, 11); 