const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('Unauthorized');
        return res.sendStatus(401); // Unauthorized if token is missing
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Forbidden");
            return res.sendStatus(403);
        }
        
        req.user = user;

        // Continue with the next middleware or route handler
        next();
    });
}

module.exports = authenticateToken ;
