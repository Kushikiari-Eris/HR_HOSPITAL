import React, { useEffect, useState } from 'react'

const UserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [reportDetails, setReportDetails] = useState("");

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    


    useEffect(() => {
      const fetchReports = async () => {
        try {
          const response = await fetch('http://localhost:7684/api/reports');
          if (!response.ok) {
            throw new Error('Failed to fetch reports');
          }
          const data = await response.json();
          setReports(data);
        } catch (error) {
          console.error('Error fetching reports:', error);
          setError('Failed to fetch reports');
        } finally {
          setLoading(false);
        }
      };
  
      fetchReports();
    }, []);

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

      const handleAddReportClick = (taskId) => {
        setCurrentTaskId(taskId);
        setReportModalOpen(true);
      };
    
      const handleSubmitReport = async () => {
        if (!reportDetails.trim()) {
          alert("Please enter report details!");
          return;
        }
      
        try {
          // Submit the report
          const response = await fetch("http://localhost:7684/api/reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              taskId: currentTaskId,
              reportDetails,
            }),
          });
      
          if (response.ok) {
            alert("Report added successfully!");
      
            // Update task status
            const statusUpdateResponse = await fetch(`http://localhost:7684/api/task/${currentTaskId}/update`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                status: "Completed", // Change this to the desired status
              }),
            });
      
            if (statusUpdateResponse.ok) {
              alert("Task status updated successfully!");
            } else {
              console.error("Failed to update task status:", await statusUpdateResponse.text());
              alert("Failed to update task status. Please try again.");
            }
      
            // Reset modal and form
            setReportDetails("");
            setReportModalOpen(false);
          } else {
            console.error("Failed to submit report:", await response.text());
            alert("Failed to submit report. Please try again.");
          }
        } catch (error) {
          console.error("Error submitting report:", error);
          alert("An error occurred. Please try again.");
        }
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
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Quiz</span>
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
                      </div>
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                          <thead className="bg-gray-50 dark:bg-neutral-700">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Task Name</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Assigned To</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Start Date</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Due Date</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                          {currentTask.map((task, index) => (
                              <tr key={task._id}>
                                <td className="px-6 py-3 text-sm text-gray-900">{task.taskName}</td>
                                <td className="px-6 py-3 text-sm text-gray-900">{task.assignedTo}</td>
                                <td className="px-6 py-3 text-sm text-gray-900"> {new Date(task.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3 text-sm text-gray-900"> {new Date(task.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3 text-sm text-gray-900">{task.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                  {task.status === "Not Started" && (
                                    <button className="text-blue-600 hover:text-blue-300 dark:text-blue-500 dark:hover:text-blue-400 mr-2" onClick={() => handleAddReportClick(task._id)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    )}
                                    {task.status === "Completed" && (
                                    <button className="text-emerald hover:text-green-300 dark:text-emerald dark:hover:text-emerald mr-2" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                      </svg>
                                    </button>
                                    )}
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

          {/* Add Report Modal */}
            {isReportModalOpen && (
              <div 
              className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div 
                className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-xl transform transition-transform duration-300 scale-95"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                  <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
                    Add Report
                  </h3>
                  <button
                    onClick={() => setReportModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
            
                {/* Modal Body */}
                <div className="mt-4">
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Enter report details"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring focus:ring-blue-300 focus:outline-none resize-none h-32"
                  />
                </div>
            
                {/* Modal Footer */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={handleSubmitReport}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* View Details of Reports */}
            <dialog id="my_modal_1" className="modal">
              <div
                className="modal-box w-full max-w-5xl"
                style={{
                  width: '85%', // Wider for a professional look
                  maxWidth: '1000px', // Maximum width for larger screens
                }}
              >
                <h3 className="font-bold text-2xl mb-6 text-center">Task Reports</h3>
                <div className="max-h-[70vh] overflow-y-auto">
                  {/* Scrollable content with document styling */}
                  {reports.map((report) => (
                    <div
                      key={report._id}
                      className="bg-gray-50 shadow-lg p-6 rounded-lg border border-gray-200 mb-6"
                    >

                      {/* Details Section */}
                      <section className="mb-4">
                        <h5 className="text-lg font-medium text-gray-700">Report Details</h5>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{report.reportDetails}</p>
                      </section>

                      {/* Footer Section */}
                      <footer className="border-t pt-3 text-sm text-gray-500">
                        <p>Submitted on: {new Date(report.createdAt).toLocaleDateString()}</p>
                      </footer>
                    </div>
                  ))}
                </div>
                <div className="modal-action mt-4">
                  <form method="dialog">
                    <button className="btn btn-primary px-6 py-2">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
        </div>
    </>
  )
}

export default UserTask