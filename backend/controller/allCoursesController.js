const Course = require('../models/allCoursesModel');
const mongoose = require('mongoose')

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

const editLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: `Invalid courseId: ${courseId}` });
    }
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({ error: `Invalid lessonId: ${lessonId}` });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const course = await Course.findOneAndUpdate(
      { _id: courseId, 'lessons._id': lessonId },
      {
        $set: {
          'lessons.$.title': title,
          'lessons.$.description': description,
        },
      },
      { new: true } // Return the updated course
    );

    if (!course) {
      return res.status(404).json({ error: 'Course or lesson not found' });
    }

    const updatedLesson = course.lessons.id(lessonId);
    res.status(200).json(updatedLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteLesson = async (req, res) => {
  // Extract courseId and lessonId from the route parameters
  const { courseId, lessonId } = req.params;

  try {
    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Find the lesson index within the course lessons array
    const lessonIndex = course.lessons.findIndex(lesson => lesson._id.toString() === lessonId);
    if (lessonIndex === -1) {
      return res.status(404).json({ error: 'Lesson not found in course' });
    }

    // Remove the lesson from the lessons array
    course.lessons.splice(lessonIndex, 1);

    // Save the updated course document
    await course.save();

    // Return success response
    res.status(200).json({ message: 'Lesson deleted successfully' });

  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    addQuizToLesson,
    editLesson,
    deleteLesson
}