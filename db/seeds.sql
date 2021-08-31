INSERT INTO department(department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES("Lead Engineer", 175000, 1), ("Software Engineer", 135000, 1), ("Manager Sales", 145000, 2), ("Sales Associate", 65000, 2), 
("Chief Finance Officer", 265000, 3), ("Accountant", 200000, 3), ("Legal Team Lead", 290000, 4) ("Lawyer", 290000, 4),
("Marketing Manager", 190000, 5) ("Marketing Associate", 110000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Eduardo', 'Rodguize', 1, 1), ('Mirza', 'Awal', 2, null), ('Harry', 'Nebula', 3, 1), ('John', 'Nichuchi', 4, Null), 
('Andrew', 'Jones', 5, 1), ('Zersis', 'Minocher', 6, null), ('Evens', 'Alexandre', 7, 1), ('Kelly', 'Jones', 8, Null),
('Maria', 'kerry', 9, 1), ('Mustafa', 'Rusho', 10, Null); 