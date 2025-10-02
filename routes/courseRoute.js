const express = require('express')
const { createCourse, getCourses, getCourseById } = require('../controller/course')

const router = express.Router()

router.post('/', createCourse)
router.get('/get-course', getCourses)
router.get('/get-course-details', getCourseById)



module.exports = router
