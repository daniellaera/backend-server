const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');

//const PORT = process.env.PORT || 3000;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

app.use(morgan('dev'));

// mongodb config
const db = require('./config/keys').mongoURI;

const course = require('./routes/api/course');
const users = require('./routes/api/users');

// use route
app.use('/api', users);
app.use('/api', course);


// DB connection
mongoose
.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.send('Hello world');
});

//app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

module.exports = app;