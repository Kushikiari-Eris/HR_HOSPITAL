import React, { useEffect, useState } from 'react';

const ScheduleTraining = () => {
    const [formState, setFormState] = useState({
        programName: '',
        trainer: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        participants: '',
        remarks: ''
    });
    const [trainingSchedules, setTrainingSchedules] = useState([]);
    const [isEditing, setIsEditing] = useState(false); 
    const [editScheduleId, setEditScheduleId] = useState(null);

     
    
    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);

  
    const totalPages = Math.ceil(trainingSchedules.length / itemsPerPage);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSchedule = trainingSchedules.slice(startIndex, startIndex + itemsPerPage);


    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const fetchTrainingSchedules = async () => {
        try {
            const response = await fetch('http://localhost:7684/api/schedule');
            if (!response.ok) {
                throw new Error('Failed to fetch schedules');
            }
            const data = await response.json();
            setTrainingSchedules(data); 
        } catch (error) {
            console.error('Error fetching schedules:', error);
            
        }
    };

    useEffect(() => {
        fetchTrainingSchedules(); 
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(isEditing 
                ? `http://localhost:7684/api/schedule/${editScheduleId}` 
                : 'http://localhost:7684/api/schedule', {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (!response.ok) {
                throw new Error(isEditing ? 'Failed to update schedule' : 'Failed to create schedule');
            }

            const savedSchedule = await response.json();
            console.log('Saved Schedule:', savedSchedule);

            setFormState({ programName: '', trainer: '', date: '', time: '', duration: '', location: '', participants: '', remarks: '' });
            setIsEditing(false);
            setEditScheduleId(null);
            document.getElementById('my_modal_1').close();
            fetchTrainingSchedules();
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (schedule) => {
        if (!schedule._id) { // Ensure you're checking for _id
            console.error('Selected schedule has no ID:', schedule);
            return; // Handle error
        }
    
        // Convert the date to YYYY-MM-DD format
        const formattedDate = new Date(schedule.date).toISOString().split('T')[0];
    
        // Populate form state with the selected schedule's details
        setFormState({
            programName: schedule.programName,
            trainer: schedule.trainer,
            date: formattedDate, // Set formatted date for input
            time: schedule.time,
            duration: schedule.duration,
            location: schedule.location,
            participants: schedule.participants,
            remarks: schedule.remarks,
        });
        
        setIsEditing(true);
        setEditScheduleId(schedule._id); // Use _id here
        document.getElementById('my_modal_1').showModal();
    };

    const handleDelete = async (_id) => { // Use _id for consistency
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            try {
                const response = await fetch(`http://localhost:7684/api/schedule/${_id}`, { // Ensure correct endpoint here (schedules)
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete schedule');
                }
    
                fetchTrainingSchedules(); // Refresh after deletion
            } catch (error) {
                console.error('Error deleting schedule:', error);
            }
        }
    };

    return (
        <>
            <div className="p-4">
                {/* Breadcrumb and Other Code ... */}
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
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Schedule Training</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className=' border bg-white rounded-lg shadow'>
                <div>
                   <h2 className='text-2xl font-sans font-bold p-5'>Schedule Training</h2>
                   <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                   <div>
                   <div className="flex flex-col bg-white">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="border divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                                    <div className="py-3 px-4 flex justify-between items-center">
                                        <div className="relative max-w-xs">
                                            <div>
                                                <label className="sr-only">Search</label>
                                                <input type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search for items"/>
                                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                                <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <path d="m21 21-4.3-4.3"></path>
                                                </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <button className="border bg-emerald p-3 rounded-lg text-white" onClick={()=>document.getElementById('my_modal_1').showModal()}>Create Schedule</button>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead className="bg-gray-50 dark:bg-neutral-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Training Program</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Trainer/Facilitator</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Time</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Duration</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Location</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Participants</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Remarks</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 flex justify-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {currentSchedule.length > 0 ? (
                                            currentSchedule.map((schedule, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4">{schedule.programName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{schedule.trainer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{new Date(schedule.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{schedule.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{schedule.duration}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{schedule.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{schedule.participants}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{schedule.remarks}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                <button className="text-blue-600 hover:text-blue-300 dark:text-blue-500 dark:hover:text-blue-400 mr-2" onClick={() => handleEdit(schedule)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button className="text-red-600 hover:text-red-300 dark:text-red-500 dark:hover:text-red-400" onClick={() => handleDelete(schedule._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="px-6 py-4 text-center">No training schedules available.</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="py-1 px-4">
                                        <nav className="flex items-center space-x-1" aria-label="Pagination">
                                            <button 
                                                type="button" 
                                                className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" 
                                                aria-label="Previous"
                                                onClick={handlePreviousPage}
                                                disabled={currentPage === 1}
                                            >
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </button>

                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className={`min-w-[30px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-1 text-sm rounded disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700 ${
                                                        currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
                                                    }`}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                    aria-current={currentPage === index + 1 ? "page" : undefined}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}

                                            <button 
                                                type="button" 
                                                className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" 
                                                aria-label="Next"
                                                onClick={handleNextPage}
                                                disabled={currentPage === totalPages}
                                            >
                                                <span className="sr-only">Next</span>
                                                <span aria-hidden="true">»</span>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   </div>
                </div>
            </div>

                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{isEditing ? 'Edit' : 'Add'} Training Schedule</h3>
                        <form onSubmit={handleSubmit} className="py-4">
                            <div>
                                <label className="block mb-2">Program Name</label>
                                <input type="text" name="programName" value={formState.programName} onChange={handleInputChange} className="border rounded p-2 w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Trainer</label>
                                <input type="text" name="trainer" value={formState.trainer} onChange={handleInputChange} className="border rounded p-2 w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Date</label>
                                <input type="date" name="date" value={formState.date} onChange={handleInputChange} className="border rounded p-2 w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Time</label>
                                <input type="time" name="time" value={formState.time} onChange={handleInputChange} className="border rounded p-2 w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Duration</label>
                                <input type="text" name="duration" value={formState.duration} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="e.g., 2 hours" required />
                            </div>
                            <div>
                                <label className="block mb-2">Location</label>
                                <input type="text" name="location" value={formState.location} onChange={handleInputChange} className="border rounded p-2 w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Participants</label>
                                <input type="text" name="participants" value={formState.participants} onChange={handleInputChange} className="border rounded p-2 w-full" required />
                            </div>
                            <div>
                                <label className="block mb-2">Remarks</label>
                                <textarea name="remarks" value={formState.remarks} onChange={handleInputChange} className="border rounded p-2 w-full" rows={4}></textarea>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn">{isEditing ? 'Save Changes' : 'Save'}</button>
                                <button type="button" className="btn" onClick={() => {
                                    setIsEditing(false);
                                    setEditScheduleId(null);
                                    setFormState({ programName: '', trainer: '', date: '', time: '', duration: '', location: '', participants: '', remarks: '' });
                                    document.getElementById('my_modal_1').close();
                                }}>Close</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default ScheduleTraining;