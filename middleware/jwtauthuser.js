const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthUser = (req, res, next) => {

    // get user from jwt and add id it to req object
    const token = req.header('authtoken');
    console.log(req.header);
    if( ! token ){
        res.status(401).send({error: "please authenticate using a valid token"});
    }

    try{
        const tokenVerification = jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenVerification.user;
        next();
    } catch(error){
        res.status(401).send({error: "Invalid Token!"});
    }
}

module.exports = jwtAuthUser;