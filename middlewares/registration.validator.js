const registrationValidator = (req, res, next) => {
    const {name, email, password, phone, bio, profile} = req.body;
    let payload = {
        name, email, password, phone, bio, profile
    }
    for(let key in payload){
        if(!payload[key]){
            return res.send({msg:`Please provide ${key}`});
        }
    }
    if(name.length < 2){
        return res.status(402).send({msg:'Invalid name'});
    }
    let arr = email.split("");
    if(!arr.includes('@') || !arr.includes('.')){
        return res.status(402).send({msg:'Invalid email'});
    }
    if(password.length < 5){
        return res.status(402).send({msg:'Password should have minimum 5 characters'});
    }
    if(phone.length < 7){
        return res.status(402).send({msg:'Inavlid Phone No.'});
    }
    req.body = payload;
    next();
}

module.exports = {
    registrationValidator
}