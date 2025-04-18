const Task = require("../models/taskmodels.js");
const User = require("../models/usermodels.js");
// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, startDate, endDate } = req.body;
    const userId = req.user.id; // Extract userId from token

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
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId }).populate("user", "name email"); 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.findOne({ _id: req.params.id, user: userId }).populate("user", "name email");

    if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, startDate, endDate, status, priority } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId }, // Ensure user owns the task
      { title, startDate, endDate, status, priority },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const task = await Task.findOneAndDelete({ _id: req.params.id, user: userId });

    if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });

    // Remove task reference from user's task list
    await User.findByIdAndUpdate(userId, { $pull: { tasks: task._id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };