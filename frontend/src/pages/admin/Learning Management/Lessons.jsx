import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For route parameters (optional)

const Lessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');


  const [selectedLesson, setSelectedLesson] = useState(null);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('http://localhost:7684/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();

        // Find the specific course using courseId and get its lessons
        const selectedCourse = data?.data?.find(course => course._id === courseId);
        if (selectedCourse) {
          setLessons(selectedCourse.lessons);
        } else {
          setLessons([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchLessons();
    }
  }, [courseId]);

  const handleDeleteLesson = async (lessonId) => {
    console.log("courseId:", courseId); // Check courseId
    console.log("lessonId:", lessonId); // Check lessonId
    try {
      await axios.delete(`http://localhost:7684/api/courses/${courseId}/lessons/${lessonId}`);
      setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== lessonId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  
  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setEditedTitle(lesson.title);
    setEditedDescription(lesson.description);
    document.getElementById('edit_modal').showModal();
  };
  
  const handleSaveEdit = async () => {
    if (!editingLesson) return;
  
    const updatedLessonData = {
      title: editedTitle,
      description: editedDescription,
    };
  
    try {
      const response = await fetch(
        `http://localhost:7684/api/courses/${courseId}/lessons/${editingLesson._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedLessonData),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }
  
      const updatedLesson = await response.json();
  
      // Update the lessons state with the updated lesson
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson._id === editingLesson._id ? { ...lesson, ...updatedLessonData } : lesson
        )
      );
  
      // Close the modal and reset editing state
      document.getElementById('edit_modal').close();
      setEditingLesson(null);
      setEditedTitle('');
      setEditedDescription('');
    } catch (error) {
      console.error('Error updating lesson:', error.message);
    }
  };

  const handleAddQuiz = async () => {
    if (!quizQuestion || quizOptions.some((opt) => !opt) || !correctAnswer) {
      alert('Please fill all the fields');
      return;
    }
  
    if (!selectedLesson) {
      alert('No lesson selected');
      return;
    }
  
    const quizData = {
      question: quizQuestion,
      options: quizOptions,
      answer: correctAnswer,
    };
  
    try {
      await axios.put(`http://localhost:7684/api/courses/${courseId}/lessons/${selectedLesson._id}/quizzes`, quizData);
      alert('Quiz added successfully!');
      setQuizQuestion('');
      setQuizOptions(['', '', '', '']);
      setCorrectAnswer('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding quiz:', error);
      alert('Failed to add quiz. Please try again.');
    }
  };
  
  // Handle option change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...quizOptions];
    updatedOptions[index] = value;
    setQuizOptions(updatedOptions);
  };
  
  // Handle correct answer change
  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };



  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error}</div>
  
  return (
    <div className="p-4">
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-900">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Lessons</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="space-y-4">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <div key={lesson._id} className="border p-4 rounded-lg shadow-md ">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-600 p-2 indent-8 whitespace-pre-line ">{lesson.description}</p>

              {lesson.quizzes.length > 0 ? (
                <div>
                  <h3 className="font-medium text-blue-500">Quizzes:</h3>
                  <ul className="list-disc pl-5">
                    {lesson.quizzes.map((quiz, index) => (
                      <li key={index} className="text-gray-600">
                        <strong>Question {index + 1}: </strong>{quiz.question}
                        <ul className="list-inside">
                          {quiz.options.map((option, i) => (
                            <li key={i} className="text-gray-500">Option {i + 1}: {option}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 p-8">No quizzes available for this lesson.</p>
              )}

              <div className="flex space-x-2 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(lesson)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDeleteLesson(lesson._id)}
                >
                  Delete
                </button>
                <button
                  className="btn bg-green-500"
                  onClick={() => {
                    setSelectedLesson(lesson);
                    document.getElementById('quiz_modal').showModal();
                  }}
                >
                  Add Quiz
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No lessons available</div>
        )}
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Lesson</h3>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="btn" onClick={() => document.getElementById('edit_modal').close()}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

       {/* Add Quiz Modal */}
       <dialog id="quiz_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Quiz to Lesson</h3>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={quizQuestion}
              onChange={(e) => setQuizQuestion(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">Options</label>
            {quizOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                className="input input-bordered w-full my-2"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <label className="block text-sm font-medium text-gray-700 mt-4">Correct Answer</label>
            <select
              className="select select-bordered w-full"
              value={correctAnswer}
              onChange={handleCorrectAnswerChange}
            >
              <option value="">Select the correct answer</option>
              {quizOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleAddQuiz}>
              Save Quiz
            </button>
            <button className="btn" onClick={() => document.getElementById('quiz_modal').close()}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Lessons;
