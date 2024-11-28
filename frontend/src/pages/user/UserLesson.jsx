import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const UserLesson = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openLessons, setOpenLessons] = useState({}); // Manage open state for each lesson

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

    const handleToggle = (lessonId) => {
        setOpenLessons(prevState => ({
            ...prevState,
            [lessonId]: !prevState[lessonId], // Toggle the state for the clicked lesson
        }));
    };

  return (
    <>
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

            <div className='bg-white rounded-lg border shadow'>
                <div className='p-4'>
                    <h2 className='font-sans text-2xl font-bold'>Lessons</h2>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    
                {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                <div key={lesson._id} className='p-8'>
                    <div className="collapse collapse-plus bg-base-200">
                        <input 
                            type="radio" 
                            name="my-accordion-3" 
                            checked={openLessons[lesson._id] || false}  
                            onChange={() => handleToggle(lesson._id)} 
                        />
                        <div className="collapse-title text-xl font-medium" onClick={() => handleToggle(lesson._id)}>
                            {lesson.title}
                        </div>
                        {openLessons[lesson._id] && ( // Only render content if this lesson is open
                            <div className="collapse-content">
                                <p className='p-8 indent-8 whitespace-pre-line bg-white rounded-lg border border-gray-900'>{lesson.description}</p>
                                <div className=' py-5'>
                                    <Link to={`/user/quiz/${lesson._id}`}>
                                        <div className='p-4 border bg-emerald rounded-lg cursor-pointer'>
                                            <div className='flex items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                                <h2 className='font-sans font-bold text-1xl'>Attemp Quiz</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                 ))
                ) : (
                  <div className='p-8'>No lessons available</div>
                )}
                
            </div>
        </div>
    </>
  )
}

export default UserLesson
