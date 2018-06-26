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
        res.status(200).json({ msg: 'courses added successfully'});
    })
    .catch(err => {
        res.status(400).send('unable to save the course into database');
    });
});

router.route('/').get((req, res) => {
  Course.find((err, courses) => {
    if(err){
      console.log(err);
    }
    else {
      res.json(courses);
    }
  });
});

// update course 
router.post('/update/:id', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
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


//delete post  
router.delete('/:id', (req, res) => { 
  Course.findById(req.params.id)
  .then(course => {
    // Delete
    course.remove().then(() => res.json({ msg: 'successfully deleted'}));
  })
  .catch(err => res.status(404).json({ coursenotfound: 'No post found'}));
});

module.exports = router;