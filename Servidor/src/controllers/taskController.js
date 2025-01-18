const taskModel = require("../models/taskModel");

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskModel.getAllTasks();
      res.send(tasks);
    } catch (error) {
      console.error(error);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const tasks = await taskModel.deleteTask(req.params.id);
      res.send(tasks);
    } catch (error) {
      console.error(error);
    }
  },

  insertTask: async (req, res) => {
    const { name, description, date, status } = req.body;
    console.log("Post");
    console.log(req.body);
    try {
      const task = await taskModel.insertTask(name, description, date, status);
      res.send(task);
    } catch (error) {
      console.error(error);
    }
  },

  updateTask: async (req, res) => {
    const id = req.params.id;
    const { name, description, date, status } = req.body;
    console.log("Put:");
    console.log(req.body);
    try {
      const task = await taskModel.updateTask(
        id,
        name,
        description,
        date,
        status
      );
      res.send(task);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = taskController;
