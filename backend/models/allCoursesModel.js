// models/Course.js
const mongoose = require('mongoose');



const quizSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    answer: {
      type: String,
      required: true,
    },
  });
  
  const lessonSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quizzes: [quizSchema], // Array of quizzes for each lesson
  });


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // e.g., "3 hours" or "4 weeks"
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the course image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lessons: [lessonSchema],
});

module.exports = mongoose.model('Course', courseSchema);
