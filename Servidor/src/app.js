const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(require("./routes/taskRoute"));

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
