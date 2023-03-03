const router = require("express").Router();
const authenticate = require("../../middleware/authenticate");
const Todo = require("../../models/todoSchema");
const User = require("../../models/userSchema");

// add todo to database
router.post("/", authenticate, async (req, res) => {
  console.log(req.userId);

  const { title } = req.body;
  const newTodo = new Todo({
    title: title,
    createdBy: req.userId,
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// get todos for a user's family
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    console.log("Request body User:", user);
    // Get the family Id of the user
    const familyId = user.family;
    console.log("Family ID of the user:", familyId);
    // Find all the users that belong to the given familyId
    const users = await User.find({ family: familyId });
    console.log("Users that belong to the FamilyId:", users);
    // Extract the user IDs from the user documents
    const userIds = users.map((user) => user._id);
    console.log("Every user with the same family id:", userIds);
    // Find all the todos that were created by the extracted user IDs
    const todos = await Todo.find({ createdBy: { $in: userIds } });
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// update todos
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params.id;
    const { title } = req.body;
    // Find todo by ID
    const todo = await Todo.findById(id);
    // Update the todo properties
    todo.title = title;
    // Save the updated todo to the database
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// delete todos
router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndRemove(id);
    res.status(202).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
