const jsonwebtoken = require('jsonwebtoken');
function checkAuth(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json("Please login to use this feature");
        
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
         next();

    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Your session has expired please re-login");
    }
}
module.exports = checkAuth;