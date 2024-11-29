import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EmployeeTimeLog = () => {
    const [timeLogs, setTimeLogs] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    date: '',
    clockIn: '',
    clockOut: '',
    breakTime: 0,
    totalHoursWorked: 0,
    overtimeHours: 0,
    status: 'Present',
    remarks: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    fetchTimeLogs();
  }, []);

  // Fetch all time logs
  const fetchTimeLogs = async () => {
    try {
      const response = await axios.get('http://localhost:7684/api/log');
      setTimeLogs(response.data.data);
    } catch (error) {
      console.error('Error fetching time logs:', error);
    }
  };
  

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create a new time log
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const dataToSubmit = {
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        department: formData.department,
        date: formData.date,
        clockIn: formData.clockIn,
        clockOut: formData.clockOut,
        breakTime: formData.breakTime,
        totalHoursWorked: formData.totalHoursWorked,
        overtimeHours: formData.overtimeHours,
        status: formData.status,
        remarks: formData.remarks,
      };
  
      if (isEditing) {
        // Update existing time log
        await axios.put(`http://localhost:7684/api/log/${currentId}`, dataToSubmit);
      } else {
        // Create new time log
        await axios.post('http://localhost:7684/api/log', dataToSubmit);
      }
  
      fetchTimeLogs();  // Refresh the list after submission
  
      setFormData({
        employeeId: '',
        employeeName: '',
        department: '',
        date: '',
        clockIn: '',
        clockOut: '',
        breakTime: 0,
        totalHoursWorked: 0,
        overtimeHours: 0,
        status: 'Present',
        remarks: ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting time log:', error);
    }
  };
  

  // Handle edit
  const handleEdit = (timeLog) => {
    setIsEditing(true);
    setCurrentId(timeLog._id);
  
    // Pre-fill formData with the selected timeLog's data
    setFormData({
      employeeId: timeLog.employeeId || '',
      employeeName: timeLog.employeeName || '',
      department: timeLog.department || '',
      date: timeLog.date ? new Date(timeLog.date).toISOString().substring(0, 10) : '',
      clockIn: timeLog.clockIn || '',
      clockOut: timeLog.clockOut || '',
      breakTime: timeLog.breakTime || 0,
      totalHoursWorked: timeLog.totalHoursWorked || 0,
      overtimeHours: timeLog.overtimeHours || 0,
      status: timeLog.status || 'Present',
      remarks: timeLog.remarks || ''
    });
  };
  

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7684/api/log/${id}`);
      fetchTimeLogs();  
    } catch (error) {
      console.error('Error deleting time log:', error);
    }
  };

  return (
    <>
       <div className=" p-4">
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
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Employee Time log</span>
                        </div>
                    </li>
                </ol>
            </nav>

        {/* Time Log Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200"
        >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {isEditing ? 'Edit Employee Log' : 'Add Employee Time Log'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-600 font-medium mb-1">Employee ID</label>
                <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Employee Name</label>
                <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Department</label>
                <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Date</label>
                <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Clock In</label>
                <input
                type="time"
                name="clockIn"
                value={formData.clockIn}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Clock Out</label>
                <input
                type="time"
                name="clockOut"
                value={formData.clockOut}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Break Time (hrs)</label>
                <input
                type="number"
                name="breakTime"
                value={formData.breakTime}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Total Hours Worked</label>
                <input
                type="number"
                name="totalHoursWorked"
                value={formData.totalHoursWorked}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Overtime Hours</label>
                <input
                type="number"
                name="overtimeHours"
                value={formData.overtimeHours}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-1">Status</label>
                <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                </select>
            </div>
            <div className="md:col-span-2">
                <label className="block text-gray-600 font-medium mb-1">Remarks</label>
                <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="p-2 w-full border rounded-lg focus:outline-blue-500"
                />
            </div>
            </div>
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg mt-4"
            >
            {isEditing ? 'Update Employee Log' : 'Add Employee Log'}
            </button>
        </form>

        {/* Time Log List */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Employee Logs</h2>
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
                <div className="overflow-auto rounded-lg shadow-lg border border-gray-200 ">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className='bg-gray-50 dark:bg-neutral-700'>
                        <tr className="bg-gray-100">
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Employee Id</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Employee Name</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Department</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Clock In</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Clock Out</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Break Time</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Total Hours</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Over Time</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {timeLogs.length > 0 ? (
                        timeLogs.map((log) => (
                            <tr key={log._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.employeeId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.employeeName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.clockIn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.clockOut}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{new Date(log.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.breakTime}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.overtimeHours}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.totalHoursWorked}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{log.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                <button onClick={() => handleEdit(log)} className="text-blue-600 hover:text-blue-300 dark:text-blue-500 dark:hover:text-blue-400 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(log._id)} className="text-red-600 hover:text-red-300 dark:text-red-500 dark:hover:text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td
                            colSpan="6"
                            className="text-center text-gray-500 py-4"
                            >
                            No Employee logs found.
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>

    </>
  )
}

export default EmployeeTimeLog