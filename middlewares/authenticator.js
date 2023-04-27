const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
require('dotenv').config();

const authenticator = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({msg:'You are not authorized'});
    }
    jwt.verify(token,process.env.key,async (err, decoded) => {
        if(err){
            return res.status(500).send({msg:'Access denied! ❌, Login again'});
        }
        const user = await userModel.findOne({email:decoded.email});
        if(!user){
            return res.status(401).send({msg:'Access denied! ❌'});
        }
        req.body.user = user;
        next();
    })
}

module.exports = {
    authenticator
}