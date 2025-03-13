const Task = require("../models/taskmodels.js");
const User = require("../models/usermodels.js");
// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, startDate, endDate, userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Sign in before adding a new task , "});

    // Create the task
    const newTask = new Task({ title, startDate, endDate, user: userId });
    await newTask.save();

    // Add task to the user's task list
    await User.findByIdAndUpdate(userId, { $push: { tasks: newTask._id } });

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "name email"); 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user", "name email");
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, startDate, endDate, status, priority } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, startDate, endDate, status, priority },
      { new: true } // Return updated task
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Remove task reference from user's task list
    await User.findByIdAndUpdate(task.user, { $pull: { tasks: task._id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
