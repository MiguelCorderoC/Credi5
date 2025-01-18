const conexion = require("../db/mysql.config");

const taskModel = {
  getAllTasks: () => {
    return new Promise((resolve, reject) => {
      conexion.query("CALL sp_get_all_tasks", (error, rows) => {
        error ? reject(error) : resolve(rows[0]);
      });
    });
  },

  deleteTask: (id) => {
    return new Promise((resolve, reject) => {
      conexion.query("CALL sp_delete_task (?)", [id], (error, rows) => {
        error ? reject(error) : resolve(rows);
      });
    });
  },

  insertTask: (name, description, date, status) => {
    return new Promise((resolve, reject) => {
      conexion.query(
        "CALL sp_create_task (?, ?, ?, ?)",
        [name, description, date, status],
        (error, row) => {
          error ? reject(error) : resolve(row);
        }
      );
    });
  },

  updateTask: (id, name, description, date, status) => {
    return new Promise((resolve, reject) => {
      conexion.query(
        "CALL sp_update_task (?, ?, ?, ?, ?)",
        [id, name, description, date, status],
        (error, row) => {
          error ? reject(error) : resolve(row);
        }
      );
    });
  },
};

module.exports = taskModel;
