const bcrypt = require("bcrypt");
const User = require("../models/usermodels.js");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config.js");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup success", success: true });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message, success: false });
        }
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const errmsg = "Auth failed email or password is incorrect";

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(409).json({ message: errmsg , success:false});
        }
        const isPassEqual = await bcrypt.compare(password, existingUser.password);
        if (!isPassEqual) {
            return res.status(409).json({ message: errmsg , success:false}); 
        }
        const jwtToken = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        // console.log(jwtToke);   
        res.status(200)
        .json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: existingUser.name
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message, success: false });
        }
        res.status(500).json({ message: error.message , success: false });
    }
};

module.exports = { signup , login };
