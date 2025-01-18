const mysql = require("mysql");

const conexion = mysql.createConnection({
  database: "task_management",
  port: 3306,
  user: "root",
  password: "",
});

conexion.connect((error) => {
  error ? console.error(error) : console.log("Conectado a la base de datos");
});

module.exports = conexion;
