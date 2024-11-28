import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For route parameters (optional)

const Lessons = () => {
  const { courseId } = useParams();  // Using route parameter if course ID is part of the URL
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Lessons for {courseId}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="space-y-4">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <div key={lesson._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-600">{lesson.description}</p>

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
                <p className="text-gray-500">No quizzes available for this lesson.</p>
              )}
            </div>
          ))
        ) : (
          <div>No lessons available</div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
