const router = require("express").Router();

const authenticate = require("../../middleware/authenticate");
const Expense = require("../../models/expenseSchema");
const User = require("../../models/userSchema");

// GET EXPENSE
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // Get the family Id of the user
    const familyId = user.family;
    // Find all the users that belong to the given familyId
    const users = await User.find({ family: familyId });
    // Extract the user IDs from the user documents
    const userIds = users.map((user) => user._id);
    // Find all the todos that were created by the extracted user IDs
    const expenses = await Expense.find({ createdBy: { $in: userIds } });
    return res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ADD AN EXPENSE
router.post("/", authenticate, async (req, res) => {
  const { name, amount } = req.body;

  const newExpense = new Expense({
    name,
    amount,
    createdBy: req.userId,
  });
  try {
    await newExpense.save();
    return res.status(201).json(newExpense);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// DELETE AN EXPENSE
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await expense.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;
