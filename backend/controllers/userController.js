const User = require("../models/usermodels.js");
const bcrypt = require("bcrypt");

// 🔹 Create a New User
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received Data:", req.body); // ✅ Check incoming data

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hashing password
    console.log("Hashed Password:", hashedPassword);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error creating user:", error); // ✅ Log the full error
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};


// 🔹 Fetch All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("tasks"); // Populate tasks
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// 🔹 Export the controller functions
module.exports = { createUser, getAllUsers };
