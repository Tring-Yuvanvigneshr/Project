const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req) => {
    const authHeader = req.headers.authorization;
    console.log(req)
    if (!authHeader){
        throw Error("Token not found.Please provide token");
    } 
    
    const token = authHeader.split(" ")[1];
    if (!token){
        throw Error("Token format is incorrect");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }
};

module.exports = authenticateUser;
