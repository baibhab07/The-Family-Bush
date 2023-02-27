const express = require("express");
const {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../../controllers/todo/todoController");

const router = express.Router();

// get all task
router.get("/todos-all", getTask);
//create a new task
router.post("/todo/new", addTask);
// update a task
router.patch("/todo/:id", updateTask);
// delete a task
router.delete("/todo/:id", deleteTask);

module.exports = router;
