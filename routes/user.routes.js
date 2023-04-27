const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userModel } = require('../models/user.model');
const { registrationValidator } = require('../middlewares/registration.validator');
const { loginValidator } = require('../middlewares/login.validator');
const { authenticator } = require('../middlewares/authenticator');
const saltRounds = process.env.saltRounds;

const userRouter = express.Router();

userRouter.post('/register',registrationValidator,async (req, res) => {
    const payload = req.body
    const exists = await userModel.findOne({email:payload.email});
    if(exists){
        return res.status(409).send({msg:"Account already exists"});
    }
    payload.password = await bcrypt.hash(payload.password,+saltRounds);
    const user = new userModel(payload);
    await user.save();
    res.status(201).send({msg:'Registration successful'});
});

userRouter.post('/login',loginValidator,async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send({msg:'Account does not exist'});
    }
    bcrypt.compare(password,user.password,(err, result) => {
        if(err){
            return res.status(500).send({msg:'Something went wrong on our side ☹️, please try again'});
        }
        const payload = {
            email:user.email,
            name:user.name,
            password:user.password
        }
        const token = jwt.sign(payload,process.env.key);
        res.status(202).send({msg:'Login successful', token});
    })
})

userRouter.get('/getProfile',authenticator,async (req, res) => {
    const {user} = req.body;
    res.send(user);
})

userRouter.patch('/editProfile/:id',authenticator,async (req, res) => {
    const data = {};
    for(let key in req.body){
        if(key !== 'password' && key !== "Password"){
            data[key] = req.body[key];
        }
    }
    const id = req.params.id;
    await userModel.findByIdAndUpdate(id,data);
    res.sendStatus(204);
})



module.exports = {
    userRouter
}