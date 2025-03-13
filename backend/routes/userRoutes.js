const express = require("express");
const { createUser, getAllUsers } = require("../controllers/userController.js");

const router = express.Router();

// Routes
router.post("/", createUser); // Create user
router.get("/", getAllUsers); // Get all users

module.exports = router;