CREATE DATABASE  task_management;

USE task_management;

CREATE TABLE tasks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30),
    description TEXT,
    due_date DATE,
    status ENUM ('pending', 'in_progress', 'completed')
);

DELIMITER //

CREATE PROCEDURE sp_get_all_tasks ()
BEGIN
    SELECT * FROM tasks;
END 

// DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_delete_task (IN task_id INT)
BEGIN
    DELETE FROM tasks WHERE id = task_id;
END 

// DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_create_task (IN task_name VARCHAR(30),
								 IN task_description TEXT,
								 IN task_due_date DATE,
                                 IN task_status ENUM('pending', 'in_progress', 'completed'))
BEGIN
	INSERT INTO tasks (name, description, due_date, status) 
    VALUES (task_name, task_description, task_due_date, task_status);
END

// DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE sp_update_task (
    IN task_id INT,
    IN task_name VARCHAR(30),
    IN task_description TEXT,
    IN task_due_date DATE,
    IN task_status ENUM('pending', 'in_progress', 'completed')
)
BEGIN
    UPDATE tasks
    SET 
        name = task_name,
        description = task_description,
        due_date = task_due_date,
        status = task_status
    WHERE id = task_id;
END //

DELIMITER ;

