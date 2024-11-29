import React, { useEffect, useState } from 'react'

const ShiftScheduling = () => {
  const [shifts, setShifts] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [shiftDate, setShiftDate] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const [position, setPosition] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  // Fetch shifts from the backend
  const fetchShifts = async () => {
    try {
      const response = await fetch('http://localhost:7684/api/shift');
      const data = await response.json();
      setShifts(data);
    } catch (err) {
      console.error('Error fetching shifts:', err);
    }
  };

  // Create shift
  const createShift = async () => {
    try {
      const response = await fetch('http://localhost:7684/api/shift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName,
          shiftDate,
          shiftStartTime,
          shiftEndTime,
          position,
        }),
      });
      const newShift = await response.json();
      setShifts([...shifts, newShift]);
      resetForm();
    } catch (err) {
      console.error('Error creating shift:', err);
    }
  };

  // Update shift
  const updateShift = async () => {
    try {
      const response = await fetch(`http://localhost:7684/api/shift/${editingShiftId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName,
          shiftDate,
          shiftStartTime,
          shiftEndTime,
          position,
        }),
      });
      const updatedShift = await response.json();
      setShifts(shifts.map(shift => (shift._id === updatedShift._id ? updatedShift : shift)));
      resetForm();
    } catch (err) {
      console.error('Error updating shift:', err);
    }
  };

  // Delete shift
  const deleteShift = async (id) => {
    try {
      await fetch(`http://localhost:7684/api/shift/${id}`, {
        method: 'DELETE',
      });
      setShifts(shifts.filter(shift => shift._id !== id));
    } catch (err) {
      console.error('Error deleting shift:', err);
    }
  };

  // Handle form reset
  const resetForm = () => {
    setEmployeeName('');
    setShiftDate('');
    setShiftStartTime('');
    setShiftEndTime('');
    setPosition('');
    setEditing(false);
    setEditingShiftId(null);
  };
  
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
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
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Shift Scheduling</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="p-6 max-w-8xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">{editing ? 'Edit Shift' : 'Create Shift'}</h1>

            {/* Shift Form */}
            <form onSubmit={editing ? updateShift : createShift} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Employee Name</label>
                    <input
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className="p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Shift Date</label>
                    <input
                        type="date"
                        value={formatDate(shiftDate)}
                        onChange={(e) => setShiftDate(e.target.value)}
                        className="p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="time"
                        value={shiftStartTime}
                        onChange={(e) => setShiftStartTime(e.target.value)}
                        className="p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="time"
                        value={shiftEndTime}
                        onChange={(e) => setShiftEndTime(e.target.value)}
                        className="p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Position</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    {editing ? 'Update Shift' : 'Create Shift'}
                </button>
            </form>

            {/* Shift Schedules Table */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Shift Schedules</h3>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Shift Date</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Start Time</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">End Time</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Position</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(shifts) && shifts.length > 0 ? (
                                shifts.map((shift) => (
                                    <tr key={shift._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm">{shift.employeeName}</td>
                                        <td className="px-4 py-2 text-sm">{new Date(shift.shiftDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 text-sm">{shift.shiftStartTime}</td>
                                        <td className="px-4 py-2 text-sm">{shift.shiftEndTime}</td>
                                        <td className="px-4 py-2 text-sm">{shift.position}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <button
                                                onClick={() => {
                                                    setEditing(true);
                                                    setEditingShiftId(shift._id);
                                                    setEmployeeName(shift.employeeName);
                                                    setShiftDate(shift.shiftDate);
                                                    setShiftStartTime(shift.shiftStartTime);
                                                    setShiftEndTime(shift.shiftEndTime);
                                                    setPosition(shift.position);
                                                }}
                                                className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteShift(shift._id)}
                                                className="ml-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-500">
                                        No shifts available.
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

export default ShiftScheduling