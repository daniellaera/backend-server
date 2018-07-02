const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load model
const User = require('../../models/User');

router.get('/', (req, res, next) => {
    User.find().catch(next).then(results => res.send(results));
});

// get current user
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

module.exports = router;