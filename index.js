const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// body parser middleqware
app.use(bodyParser.json());
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