"use strict"

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: false}));

// mongodb config
const db = require('./config/keys').mongoURI;

const course = require('./routes/api/course');

// use route
app.use('/course', course);

// DB connection
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));