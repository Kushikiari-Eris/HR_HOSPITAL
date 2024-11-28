import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import user from './pages/user/user';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import React, { lazy, useContext } from 'react';
import AdminPanel from './pages/admin/AdminPanel';
import { CartProvider, useCartContext } from './context/CartContext';
import Dashboard from './pages/admin/Dashboard';
import AllCourses from './pages/admin/Learning Management/AllCourses';
import Lessons from './pages/admin/Learning Management/Lessons';



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
      <Route path='/' element={<Home />} />

      {/**Auth */}
      <Route path='/register' element={!loggedIn ? <Register /> : role === 'admin' ? <Navigate to='/admin/dashboard' /> : role === 'auditor' ? <Navigate to='/auditor/dashboard' /> : <Navigate to='/market' />} />
      <Route path='/login' element={!loggedIn ? <Login /> : role === 'admin' ? <Navigate to='/admin/dashboard' /> : role === 'auditor' ? <Navigate to='/auditor/dashboard' /> : <Navigate to='/market' />} />

      {/**MarketPage */}
      <Route path='/market' element={loggedIn && role === 'user' ? <Market /> : <Navigate to='/login' />}/>
    

      {/**AdminPage */}
      <Route path='/admin' element={loggedIn && role === 'admin' ? <AdminPanel /> : <Navigate to='/login' />}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='all-courses' element={<AllCourses/>}/>
        <Route path='lesson/:courseId' element={<Lessons/>}/>
      </Route>

    </Routes>
  );
}

export default App;
