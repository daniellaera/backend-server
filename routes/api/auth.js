const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load model
const User = require('../../models/User');

// register user
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(400).json({error: err});
        } else {
            const newUser= new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            newUser.save().then(user => {
                res.status(200).json({success: 'User added with success', user});
            })
            .catch(err => {
                res.status(400).send('coudn\'t add the user');
            });
        }
    });
});

// login user
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
    .then(user => {
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) {
                return res.status(400).json({ failed: 'Unauthorized Access'});
            }
            if(result) {
                const JWTToken = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, 'secret', { expiresIn: '2h' });
                return res.status(200).json({
                    success: 'Welcome to the JWT Auth',
                    token: JWTToken
                });
            }
            return res.status(400).json({ failed: 'Unauthorized Access' });
        });
    })
    .catch(error => {
        res.status(500).json({ error: error})
    });
});

module.exports = router;