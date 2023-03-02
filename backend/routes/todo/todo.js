const router = require("express").Router();

const Todo = require("../../models/todoSchema");
const User = require("../../models/userSchema");
const Family = require("../../models/familySchema");
// add a task
// add todo to database
router.post("/", async (req, res) => {
  try {
    const { title, userId, familyId } = req.body;
    console.log("todo body", req.body);
    // create new todo
    const todo = new Todo({
      title,
      user: userId,
      family: familyId,
    });

    await todo.save();

    res.status(201).json({ message: "Todo added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// get todos for a user's family
router.get("/", async (req, res) => {
  console.log(req.headers.authorization);
  res.send(200).json({ message: "True" });
  try {
    const user = req.user;

    // find user's family
    const family = await Family.findById(user.family);

    // find todos for all users in family
    const todos = await Todo.find({ user: { $in: family.users } });

    res.status(200).json({ todos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
