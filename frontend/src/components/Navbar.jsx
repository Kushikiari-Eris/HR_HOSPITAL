import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import logo from '../assets/image/logo.png'
import { useCartContext } from '../context/CartContext.jsx';

function Navbar() {
    const { loggedIn, role } = useContext(AuthContext);
    const { cartItemCount } = useCartContext();

    return (
        <>
            <div className="w-full p-5 bg-emerald text-black/70 h-[85px] rounded-l-sm sticky top-0 z-50 shadow-md">
                <div className="flex justify-between max-md:flex max-md:justify-end">
                        <a href="/market" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="flex flex-shrink-0 items-center">
                                {/* Conditional rendering of logo or text */}
                                {loggedIn && role === 'admin' ? (
                                    <span className=" text-lg font-extrabold leading-none  text-gray-900 md:text-1xl dark:text-gray-900"></span>
                                ) : (
                                    <img
                                        className="h-12 w-auto"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                )}
                            </div>
                        </a>
                    <div className="flex gap-5 items-center w-[600px] max-md:hidden">
                    {/* Sidebar toggle button */}


                    </div>
                    {/* Right-side icons and user profile */}
                    <div className="flex gap-3 items-center">
                    {/* Menu for non-logged-in users */}
                    {loggedIn === false && (
                        <>
                            <Link to="/login" className="btn btn-outline btn-accent">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-outline btn-accent">
                                Register
                            </Link>
                        </>
                    )}
                    
                    {/* Menu for logged-in admins */}
                    {loggedIn === true && role === 'admin' && (
                        <>
                            <Profile />
                        </>
                    )}

                    {/* Menu for logged-in users */}
                    {loggedIn === true && role === 'user' && (
                        <>
                           
                            <Profile />
                        </>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;