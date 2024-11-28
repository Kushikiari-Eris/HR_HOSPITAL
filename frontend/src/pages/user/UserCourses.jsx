import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:7684/api/courses');
                if (response.data && response.data.success) {
                    setCourses(response.data.data);
                } else {
                    console.error('No course data received or response not successful');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);
  return (
    <>
        <div className="p-4 ">
            <nav className="flex mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-900">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                    </a>
                    </li>
                    <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Courses</span>
                    </div>
                    </li>
                </ol>
            </nav>

            <div className='bg-white rounded-lg shadow'>
                <h2 className='text-2xl font-sans font-bold p-4'>Courses</h2>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {Array.isArray(courses) && courses.map(course => (
                        <div key={course._id} className='p-4'>
                            <div className="card bg-base-100 image-full w-full shadow-xl">
                                <figure>
                                    <img
                                        src={`http://localhost:7684/${course.image}`} 
                                        alt={course.title} 
                                        className="object-cover h-48 w-full" 
                                    />
                                </figure>
                                <div className="card-body">
                                    <Link to={`/user/lesson/${course._id}`}>
                                        <h2 className="card-title hover:text-emerald">{course.title}</h2>
                                    </Link>
                                    <p>{course.category}</p>
                                    <div className="card-actions justify-end">
                                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-45">
                                                45%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default UserCourses