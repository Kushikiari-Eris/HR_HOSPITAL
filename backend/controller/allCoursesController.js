const Course = require('../models/allCoursesModel');


const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const createCourse = async (req, res) => {
    try {
      const { title, description, duration, instructor, category } = req.body;
  
      // Validate image
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Image is required' });
      }
  
      const newCourse = new Course({
        title,
        description,
        duration,
        instructor,
        category,
        image: req.file.path, // Save the uploaded image path
      });
  
      const savedCourse = await newCourse.save();
      res.status(201).json({ success: true, data: savedCourse });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  const updateCourse = async (req, res) => {
    try {
      const updatedData = req.body;
  
      if (req.file) {
        updatedData.image = req.file.path; // Update image path if a new image is uploaded
      }
  
      const course = await Course.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });
  
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      res.status(200).json({ success: true, data: course });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };


const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create the new lesson
        const newLesson = {
            title,
            description,
            quizzes: [], // Initialize with an empty array for quizzes
        };

        // Add lesson to the course
        course.lessons.push(newLesson);
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Lesson added successfully',
            lesson: newLesson,
        });
    } catch (error) {
        console.error('Error adding lesson:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addQuizToLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const { question, options, answer } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the lesson
        const lesson = course.lessons.id(lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Create the new quiz
        const newQuiz = {
            question,
            options,
            answer,
        };

        // Add quiz to the lesson
        lesson.quizzes.push(newQuiz);
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Quiz added successfully to the lesson',
            quiz: newQuiz,
        });
    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    addLesson,
    addQuizToLesson
}