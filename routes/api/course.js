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

router.route('/').get(function (req, res) {
    Course.find(function (err, courses){
      if(err){
        console.log(err);
      }
      else {
        res.json(courses);
      }
    });
  });

  router.post('/update/:id',function (req, res) {
    Course.findById(req.params.id, function(err, course) {
      if (!course)
        return next(new Error('Could not load Document'));
      else {
        course.course_name = req.body.course_name;
        course.course_price = req.body.course_price;
  
        course.save().then(course => {
            res.json('Successfully Updated');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });

module.exports = router;