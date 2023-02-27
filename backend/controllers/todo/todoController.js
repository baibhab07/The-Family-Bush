const mongoose = require("mongoose");

const Todo = require("../../models/todoSchema");
const User = require("../../models/userSchema");
const Family = require("../../models/familySchema");

const getTask = async (req, res) => {
  const familyId = await User.findById(req.user._id).select("family");
  const userIds = await Family.findById(familyId).select("userIds");
  const todos = await Todo.find({ userId: { $in: userIds } });
  res.json(todos);
};

const addTask = async (req, res) => {
  const user = await User.findById(req.user._id).select("family");

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const todo = new Todo({
    title: req.body.title,
    userId: req.user._id,
  });

  try {
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const updateTask = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.userId.toString() != req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    todo.title = req.body.title;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.userId.toString() != req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await todo.remove();
    res.json({ msg: "Todo removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getTask = getTask;
exports.addTask = addTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
