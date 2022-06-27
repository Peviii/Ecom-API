const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res) => {
    
    try{
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashPass
        });
        const user = await newUser.save();
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error);
    }
});
router.post('/login', async (req, res) => {
    
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        !user && res.status(400).json("Wrong credentials");

        const validated = await bcrypt.compare(password, user.password);
        !validated && res.status(422).json("Incorrect password");

        const { ...others } = user._doc;
        res.status(200).json(others);
    }catch(error){
        res.status(500).json(error)
    }
});

module.exports = router;