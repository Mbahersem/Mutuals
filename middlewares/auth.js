require('dotenv').config({path: "../.env"});

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token == undefined) {
        res.status(401).send();
        return;
    } 
        

    jwt.verify(token, process.env.SECRET, (err, email) => {
        if(req.params.email) {
            if(email === req.params.email) {
                req.params.email = email;
                next();
                return;
            }
        }
        next();
        if(err) next(err);
    });
}

module.exports = authenticateToken;