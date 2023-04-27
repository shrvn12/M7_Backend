const loginValidator = (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(402).send({msg:'Please provide name email and passowrd'});
    }
    let arr = email.split("");
    if(!arr.includes('@') || !arr.includes('.')){
        return res.status(402).send({msg:'Invalid email'});
    }
    if(password.length < 5){
        return res.status(402).send({msg:'Password should have minimum 5 characters'});
    }
    next();
}

module.exports = {
    loginValidator
}