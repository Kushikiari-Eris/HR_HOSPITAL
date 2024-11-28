import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserQuiz = () => {
    const { lessonId } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({}); 

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:7684/api/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }
                const data = await response.json();
                console.log('Fetched data:', data); 

                const selectedCourse = data?.data?.find(course => 
                    course.lessons.some(lesson => lesson._id === lessonId)
                );
                
                if (selectedCourse) {
                    const selectedLesson = selectedCourse.lessons.find(lesson => lesson._id === lessonId);
                    if (selectedLesson) {
                        setQuizzes(selectedLesson.quizzes);
                    }
                } else {
                    setQuizzes([]);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchQuizzes();
        }
    }, [lessonId]);

    const handleOptionClick = (quizIndex, optionIndex) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [quizIndex]: optionIndex 
        }));
    };

    if (loading) {
        return <div>Loading quizzes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Quiz</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className='p-4'>
                <div className='bg-white border shadow rounded-lg'>
                    <h2 className='text-2xl font-sans font-bold p-4'>Quizzes</h2>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz, quizIndex) => (
                            <div key={quizIndex} className='px-8 py-4'>
                                <div className='p-4 bg-white border rounded-lg'>
                                    <strong>{quiz.question}</strong> 
                                    <ul className="list-inside">
                                        {quiz.options.map((option, optionIndex) => (
                                            <li 
                                                key={optionIndex} 
                                                className={`text-gray-900 px-4 py-2 cursor-pointer ${selectedAnswers[quizIndex] === optionIndex ? 'bg-blue-200' : ''}`}
                                                onClick={() => handleOptionClick(quizIndex, optionIndex)} 
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='p-8'>No Quizzes Available.</div>
                    )}
                    <div className='px-8 py-5'>
                    <div className='my-4 flex border rounded-lg cursor-pointer bg-emerald font-sans font-bold '>
                        <div className=' py-4 px-4'>
                            <div className='flex items-center mr-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                            </svg>

                                Finish Attempt
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserQuiz;