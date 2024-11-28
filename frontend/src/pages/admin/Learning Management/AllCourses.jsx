import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        instructor: '',
        category: '',
        image: null,
      });

    const [editingCourseId, setEditingCourseId] = useState(null); 
    const [existingImage, setExistingImage] = useState(null);
    const [message, setMessage] = useState('');
    const [lessonData, setLessonData] = useState({
        title: '',
        description: '',
    });


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = new FormData();
        courseData.append('title', formData.title);
        courseData.append('description', formData.description);
        courseData.append('duration', formData.duration);
        courseData.append('instructor', formData.instructor);
        courseData.append('category', formData.category);
        if (formData.image) {
            courseData.append('image', formData.image);
        }

        try {
            if (editingCourseId) {
                // Update course
                await axios.put(`http://localhost:7684/api/courses/${editingCourseId}`, courseData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setMessage('Course updated successfully!');
            } else {
                // Create new course
                await axios.post('http://localhost:7684/api/courses', courseData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setMessage('Course created successfully!');
            }
            setFormData({
                title: '',
                description: '',
                duration: '',
                instructor: '',
                category: '',
                image: null,
            });
            setExistingImage(null);
            setEditingCourseId(null);
            document.getElementById('my_modal_1').close();
            window.location.reload();
        } catch (error) {
            console.error(error.response || error.message);
            setMessage(error.response?.data?.message || 'Failed to save course.');
        }
    };

    const handleEdit = (course) => {
        setFormData({
            title: course.title,
            description: course.description,
            duration: course.duration,
            instructor: course.instructor,
            category: course.category,
            image: null, 
        });
        setExistingImage(`http://localhost:7684/${course.image}`); 
        setEditingCourseId(course._id);
        document.getElementById('my_modal_1').showModal();
    };

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`http://localhost:7684/api/courses/${courseId}`);
            setCourses(courses.filter(course => course._id !== courseId));
            setMessage('Course deleted successfully!');
        } catch (error) {
            console.error('Error deleting course:', error);
            setMessage('Failed to delete course.');
        }
    };

    const handleLessonChange = (e) => {
        const { name, value } = e.target;
        setLessonData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const openLessonModal = (courseId) => {
        setEditingCourseId(courseId);
        document.getElementById('lesson_modal').showModal();
    };

    const closeModal = () => {
        document.getElementById('lesson_modal').close();
        setLessonData({ title: '', description: '' });
    };
    

    const handleAddLesson = async (courseId) => {
        if (!courseId) {
            console.error('No courseId provided');
            return;
        }
    
        const lesson = {
            title: lessonData.title,
            description: lessonData.description,
        };
    
        try {
            await axios.put(`http://localhost:7684/api/courses/${courseId}/lessons`, lesson);
            alert('Lesson added successfully!');
            setLessonData({ title: '', description: '' }); // Reset form
            document.getElementById('lesson_modal').close();
        } catch (error) {
            console.error('Error adding lesson:', error);
            alert('Failed to add lesson.');
        }
    };
    

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
                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">All Courses</span>
                    </div>
                    </li>
                </ol>
            </nav>
            
            <div className='bg-white rounded-lg p-4 border'>
                <div className='p-2 flex justify-between items-center'>
                    <h2 className='font-sans font-bold text-lg'>
                        All-Courses
                    </h2>
                    <button type="button" onClick={()=>document.getElementById('my_modal_1').showModal()} className="focus:outline-none text-white bg-emerald hover:bg-emerald  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">
                        Add courses
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {Array.isArray(courses) && courses.map(course => (
                    <div key={course._id} className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="rounded-t-lg" src={`http://localhost:7684/${course.image}`} alt={course.title} />
                        <div  className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.description}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.instructor}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.category}</p>
                            <div className='flex flex-wrap justify-between items-center'>
                                <button onClick={() => handleEdit(course)} className="text-white bg-blue-700 rounded-lg px-3 py-2 w-full sm:w-auto">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(course._id)} className="text-white bg-red-700 rounded-lg px-3 py-2 w-full sm:w-auto">
                                    Delete
                                </button>
                                <button onClick={() => openLessonModal(course._id)} className="text-white bg-orange-700 rounded-lg px-3 py-2 w-full sm:w-auto">
                                    AddLesson
                                </button>
                                <Link to={`/admin/lesson/${course._id}`}>
                                    <button className="text-white bg-orange-700 rounded-lg px-3 py-2 w-full sm:w-auto">
                                        ViewLesson
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>




            {/* Add Courses Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                <h3 className="font-bold text-lg">{editingCourseId ? 'Edit Course' : 'Add New Course'}</h3>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Instructor</label>
                        <input
                        type="text"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        {existingImage && <img src={existingImage} alt="Existing" className="mb-2 h-20" />}
                        <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full mt-4"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn">{editingCourseId ? 'Update' : 'Submit'}</button>
                        <button type="button" onClick={() => {
                    setEditingCourseId(null);
                    setFormData({
                      title: '',
                      description: '',
                      duration: '',
                      instructor: '',
                      category: '',
                      image: null,
                    });
                    document.getElementById('my_modal_1').close();
                  }} className="btn">Close</button>
                    </div>
                </form>
                </div>
            </dialog>

             {/* Modal to add lesson and quiz */}
              {/* Lesson Modal */}
            <dialog id="lesson_modal" className='modal'>
                <div className='modal-box'>
                    <h2 className='font-bold text-lg'>Add Lesson</h2>
                    <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Lesson Title</label>
                        <input
                        type="text"
                        name="title"
                        value={lessonData.title}
                        onChange={handleLessonChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Lesson Description</label>
                        <textarea
                        name="description"
                        value={lessonData.description}
                        onChange={handleLessonChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className='flex justify-end mt-2 gap-2'>
                        <button
                            type="button"
                            onClick={() => handleAddLesson(editingCourseId)}
                            className="text-white bg-green-700 rounded-lg px-3 py-2"
                        >
                            Add Lesson
                        </button>
                        <button type="button" onClick={() => closeModal()} className="text-white bg-red-700 rounded-lg px-3 py-2">
                            Close
                        </button>
                    </div>
                    </form>
                </div>
            </dialog>
        </div>
    </>
  )
}

export default AllCourses