const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connection } = require('./configs/db');
const { userRouter } = require('./routes/user.routes');

const { passport } = require('./configs/google.oauth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req, res) => {
    res.status(202).send({msg:'Basic API endpoint'});
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.use('/user',userRouter);

app.listen(process.env.port,async () => {
    try {
        await connection
        console.log('Connected to DB 🌿');
    } catch (error) {
        console.log('Error while connecting with DB');
        console.log(error);
    }
    console.log(`Running at port ${process.env.port} 🎯`);
});