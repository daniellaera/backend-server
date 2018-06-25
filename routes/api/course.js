const express = require('express');
const app = express();
const router = express.Router();

const Course = require('../../models/Course');

router.post('/add',(req, res) => {
    const course = new Course({
        course_name: req.body.course_name,
        course_price: req.body.course_price
    });
    course.save().then(course => {
        res.status(200).json({ msg: 'courses added succesyfully'});
    })
    .catch(err => {
        res.status(400).send('unable to save the course into database');
    });
});

module.exports = router;