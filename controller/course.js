const mongoose = require('mongoose')
const Course = require('../modles/course')
const { handleError } = require('../handler/handleError')

// Create Course
const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body)
        return res.status(201).json({ success: true, message: 'Course Created Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}


const getCourses = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page || '1', 10), 1)
        const limit = Math.max(parseInt(req.query.limit || '10', 10), 1)
        const search = req?.query?.search
        const skip = (page - 1) * limit

        let query = {}
        if (typeof search === 'string' && search.trim()) {
            query.courseName = { $regex: new RegExp(search.trim(), 'i') };
        }

        const [courses, totalItems] = await Promise.all([
            Course.find(query).skip(skip).limit(limit).select('courseName price discount level').sort({ createdAt: -1 }),
            Course.countDocuments(query)
        ])

        const totalPages = Math.ceil(totalItems / limit) || 1

        return res.status(200).json({
            success: true,
            courses,
            totalPages,
            // pagination: { page, limit, totalPages, totalItems }
        })
    } catch (error) {
        handleError(error, res)
    }
}

// Get Course Details by ID
const getCourseById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid course id' })
        }

        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' })
        }

        return res.status(200).json({ success: true, data: course })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = { createCourse, getCourses, getCourseById }


