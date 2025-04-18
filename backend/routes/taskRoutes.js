const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/TaskValidation");
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");

// Create a new task
router.post("/",authMiddleware ,createTask);

// Get all tasks
router.get("/", authMiddleware ,getTasks);

// Get a single task by ID
router.get("/:id", authMiddleware ,getTaskById);

// Update a task
router.put("/:id",  authMiddleware ,updateTask);

// Delete a task
router.delete("/:id",  authMiddleware ,deleteTask);

module.exports = router;
