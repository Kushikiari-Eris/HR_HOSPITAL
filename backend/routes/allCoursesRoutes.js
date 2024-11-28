const express = require('express')
const allCoursesController = require('../controller/allCoursesController')
const router = express.Router()
const multer = require('multer')
const path = require('path')


// Set up storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/') // Directory where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)) // Rename file with timestamp to avoid collisions
    },
  })

const upload = multer({ storage: storage })

router.get('/courses', allCoursesController.getAllCourses)
router.get('/courses/:id', allCoursesController.getCourseById)
router.post('/courses', upload.single('image'), allCoursesController.createCourse)
router.put('/courses/:id', upload.single('image'), allCoursesController.updateCourse)
router.delete('/courses/:id', allCoursesController.deleteCourse)


router.put('/courses/:courseId/lessons', allCoursesController.addLesson);
router.put('/courses/:courseId/lessons/:lessonId/quizzes', allCoursesController.addQuizToLesson);
router.put('/courses/:courseId/lessons/:lessonId', allCoursesController.editLesson); 
router.delete('/courses/:courseId/lessons/:lessonId', allCoursesController.deleteLesson); 

module.exports = router
