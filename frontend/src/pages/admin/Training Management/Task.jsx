import React, { useEffect, useState } from 'react';

const Task = () => {
    const [taskName, setTaskName] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);

  
    const totalPages = Math.ceil(tasks.length / itemsPerPage);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTask = tasks.slice(startIndex, startIndex + itemsPerPage);


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
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await fetch('http://localhost:7684/api/task'); // Replace with your API endpoint
          const data = await response.json();
          setTasks(data); // Store fetched tasks in state
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      fetchTasks();
    }, []);
    
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'taskName') setTaskName(value);
      if (name === 'assignedTo') setAssignedTo(value);
      if (name === 'startDate') setStartDate(value);
      if (name === 'dueDate') setDueDate(value);
    };
  
    // Handle task creation
    const handleCreateTask = async (e) => {
      e.preventDefault();
      const newTask = {
        taskName,
        assignedTo,
        startDate,
        dueDate,
      };
  
      try {
        const response = await fetch('http://localhost:7684/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Task created:', result);
          // Close the modal after successful submission
          document.getElementById('my_modal_1').close();
          setTasks([...tasks, result]); // Add new task to the tasks list
          resetForm();
          window.location.reload()
        } else {
          console.error('Failed to create task');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };
  
    // Handle task edit
    const handleEditTask = async (e) => {
      e.preventDefault();
      const updatedTask = {
        taskName,
        assignedTo,
        startDate,
        dueDate,
      };
  
      try {
        const response = await fetch(`http://localhost:7684/api/task/${editingTaskId}/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Task updated:', result);
          setTasks(tasks.map(task => (task._id === editingTaskId ? result : task))); // Update task in the list
          document.getElementById('my_modal_1').close();
          resetForm();
          window.location.reload()
        } else {
          console.error('Failed to update task');
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
  
    // Handle task delete
    const handleDeleteTask = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:7684/api/task/${taskId}/delete`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Task deleted');
          setTasks(tasks.filter(task => task._id !== taskId)); // Remove task from the list
        } else {
          console.error('Failed to delete task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
    // Reset the form inputs
    const resetForm = () => {
      setTaskName('');
      setAssignedTo('');
      setStartDate('');
      setDueDate('');
      setEditingTaskId(null);
    };
  
    // Open edit modal and set the current task data for editing
    const handleOpenEditModal = (task) => {
      setTaskName(task.taskName);
      setAssignedTo(task.assignedTo);
      setStartDate(task.startDate);
      setDueDate(task.dueDate);
      setEditingTaskId(task._id);
      document.getElementById('my_modal_1').showModal();
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero for single digit months
        const day = String(d.getDate()).padStart(2, '0'); // Add leading zero for single digit days
        return `${year}-${month}-${day}`;
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
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Task</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className='border bg-white rounded-lg shadow'>
          <div>
            <h2 className='text-2xl font-sans font-bold p-5'>Task</h2>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div>
              <div className="flex flex-col bg-white">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                      <div className="py-3 px-4 flex justify-between items-center">
                        <div div className="relative max-w-xs">
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
                          <button className="border bg-emerald p-3 rounded-lg text-white" onClick={() => document.getElementById('my_modal_1').showModal()}>Create Task</button>
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                          <thead className="bg-gray-50 dark:bg-neutral-700">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Task ID</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Task Name</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Assigned To</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Start Date</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Due Date</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                          {currentTask.map((task, index) => (
                              <tr key={task._id}>
                                <td className="px-6 py-3 text-sm text-gray-900">{task._id}</td>
                                <td className="px-6 py-3 text-sm text-gray-900">{task.taskName}</td>
                                <td className="px-6 py-3 text-sm text-gray-900">{task.assignedTo}</td>
                                <td className="px-6 py-3 text-sm text-gray-900"> {new Date(task.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3 text-sm text-gray-900"> {new Date(task.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    <button className="text-blue-600 hover:text-blue-300 dark:text-blue-500 dark:hover:text-blue-400 mr-2" onClick={() => handleOpenEditModal(task)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button className="text-red-600 hover:text-red-300 dark:text-red-500 dark:hover:text-red-400" onClick={() => handleDeleteTask(task._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                              </tr>
                            ))}
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
            <h3 className="font-bold text-lg">{editingTaskId ? 'Edit Task' : 'Add A Task'}</h3>
            <form className="py-4"  onSubmit={editingTaskId ? handleEditTask : handleCreateTask}>
              <div>
                <label className="block mb-2">Task Name</label>
                <input type="text" name="taskName" value={taskName} onChange={handleInputChange} className="border rounded p-2 w-full" required />
              </div>
              <div>
                <label className="block mb-2">Assigned To</label>
                <input type="text" name="assignedTo" value={assignedTo} onChange={handleInputChange} className="border rounded p-2 w-full" required />
              </div>
              <div>
                <label className="block mb-2">Start Date</label>
                <input type="date" name="startDate" value={startDate ? formatDate(startDate) : ''} onChange={handleInputChange} className="border rounded p-2 w-full" required />
              </div>
              <div>
                <label className="block mb-2">Due Date</label>
                <input type="date" name="dueDate" value={dueDate ? formatDate(dueDate) : ''} onChange={handleInputChange} className="border rounded p-2 w-full" required />
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Task</button>
                <button type="button" className="ml-2 bg-red-500 text-white p-2 rounded" onClick={() => document.getElementById('my_modal_1').close()}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Task;
