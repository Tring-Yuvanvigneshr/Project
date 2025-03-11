const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req) => {
    const authHeader = req.headers.authorization;
    console.log(req)
    if (!authHeader) return null; 
    
    const token = authHeader.split(" ")[1];
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }
};

module.exports = authenticateUser;
