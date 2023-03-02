const router = require("express").Router();

const Expense = require("../../models/expenseSchema");

// GET EXPENSE
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// ADD AN EXPENSE
router.post("/", async (req, res) => {
  try {
    const { name, amount } = req.body;

    const expense = await Expense.create(req.body);

    return res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
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
