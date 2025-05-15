const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Create a new Todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: req.body.completed || false,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all Todos
// GET /api/todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos); // ✅ return array directly
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete a Todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
