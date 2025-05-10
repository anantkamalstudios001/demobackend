const express = require('express');

const router = express.Router();

// router.post('/register', async (req,res) => {
//     const {name,email,password} = req.body;
//     res.send('registration page');
// })

router.post('/login' , async (req,res) => {
    try {
        const {email,password} = req.body;
        if(email && password) {
            const [registeredUserEmail] = 'kunal@gmail.com';
            const [registeredUserpass] = '123';
            if (registeredUser !== null) {
                if (email === registeredUserEmail && password === registeredUserpass) {
                    res.status(200).send({message : 'Login Success'});
                } else {
                    res.status(400).send({message : 'Email or Password is invalid'});
                }
            } else {
                res.status(409).send({message : 'You are not registered user'});
            }
        }
        else {
            res.status(400).send({message : 'All fields are required'});
        }
    } catch (error) {
        res.send({message : 'Unable to login'});
    }
})

module.exports = router;