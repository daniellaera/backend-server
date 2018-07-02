const course = require('./api/course');
const auth   = require('./api/auth');
const users  = require('./api/users');

module.exports = (app) => {
    // use route
    app.use('/api', auth);
    app.use('/api/users', users);
    app.use('/api/courses', course);   
};