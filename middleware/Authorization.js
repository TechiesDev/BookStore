
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: "Unauthorized: Invalid token" });
        }
        req.user = decoded; 

        // Check if the decoded token has an admin role
        if (decoded.role  === 'admin') {
            next();
        } else {
            return res.status(403).json({ error: "Unauthorized: You are not an admin" });
        }
    });
};

module.exports = { authenticateToken };
