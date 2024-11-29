import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import React, { lazy, useContext } from 'react';
import AdminPanel from './pages/admin/AdminPanel';
import { CartProvider, useCartContext } from './context/CartContext';
import Dashboard from './pages/admin/Dashboard';
import AllCourses from './pages/admin/Learning Management/AllCourses';
import Lessons from './pages/admin/Learning Management/Lessons';
import UserPanel from './pages/user/UserPanel';
import UserHome from './pages/user/UserHome';
import UserCourses from './pages/user/UserCourses';
import UserLesson from './pages/user/UserLesson';
import UserQuiz from './pages/user/UserQuiz';
import ScheduleTraining from './pages/admin/Training Management/ScheduleTraining';
import EmployeeProgress from './pages/admin/Training Management/EmployeeProgress';
import Task from './pages/admin/Training Management/Task';
import UserTask from './pages/user/UserTask';
import EmployeeTimeLog from './pages/admin/TimeAndAttendance/EmployeeTimeLog';
import ShiftScheduling from './pages/admin/TimeAndAttendance/ShiftScheduling';



function App() {
  return (
    <AuthContextProvider>
      <CartProvider> 
          <RoutesWrapper />
      </CartProvider>
    </AuthContextProvider>
  );
}

function RoutesWrapper() {
  const { loggedIn, role, loading } = useContext(AuthContext);
  const { cartItemCount } = useCartContext();

  // If still loading the auth state, show a loading screen
  if (loading) {
    return<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
            </div>
        </div>
    </div>
  </div>;  // Replace with a proper loading component if you want
  }

  return (
    <Routes>
      {/**Auth */}
      <Route path='/register' element={!loggedIn ? <Register /> : role === 'admin' ? <Navigate to='/admin/dashboard' /> : <Navigate to='/user/home' />} />
      <Route path='/login' element={!loggedIn ? <Login /> : role === 'admin' ? <Navigate to='/admin/dashboard' />  : <Navigate to='/user/home' />} />

      {/**UserPage */}
      <Route path='/user' element={loggedIn && role === 'user' ? <UserPanel /> : <Navigate to='/login' />}>
        <Route path='home' element={<UserHome/>}/>
        <Route path='courses' element={<UserCourses/>}/>
        <Route path='lesson/:courseId' element={<UserLesson/>}/>
        <Route path='quiz/:lessonId' element={<UserQuiz/>}/>
        <Route path='usertask' element={<UserTask/>}/>
      </Route>
    

      {/**AdminPage */}
      <Route path='/admin' element={loggedIn && role === 'admin' ? <AdminPanel /> : <Navigate to='/login' />}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='all-courses' element={<AllCourses/>}/>
        <Route path='lesson/:courseId' element={<Lessons/>}/>
        <Route path='scheduleTraining' element={<ScheduleTraining/>}/>
        <Route path='employeeProgress' element={<EmployeeProgress/>}/>
        <Route path='task' element={<Task/>}/>
        <Route path='log' element={<EmployeeTimeLog/>}/>
        <Route path='shift' element={<ShiftScheduling/>}/>
      </Route>

      <Route path="*" element={<Navigate to={loggedIn ? (role === 'admin' ? '/admin/dashboard' : '/user/home') : '/login'} />} />
    </Routes>
  );
}

export default App;
