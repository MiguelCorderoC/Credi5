const taskController = require("../controllers/taskController");
const { Router } = require("express");
const router = Router();

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.insertTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.put("/tasks/:id", taskController.updateTask);

module.exports = router;
