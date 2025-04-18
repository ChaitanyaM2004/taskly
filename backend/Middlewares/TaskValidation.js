const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the actual token

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
