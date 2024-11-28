import { useContext, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import jjm from '../assets/image/jjm.jpg';
import AuthContext from "../context/AuthContext";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

const Sidebar = () => {

    const { role } = useContext(AuthContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };


   

    return (
        <div className={`flex flex-col h-screen bg-emerald text-black py-4 border-r-2 sticky top-0 max-md:hidden transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-72 lg:w-80"
          }`}
          aria-label="Sidebar">
             {/* Toggle Button */}
            <div className="flex justify-end">
                <button
                    onClick={toggleSidebar}
                    className={`mb-4 p-1 text-black border border-gray-300 rounded-md hover:bg-gray-200 transition duration-200  ${
                    isCollapsed ? "w-11" : "w-11 "
                    }`}
                    aria-expanded={!isCollapsed}
                    aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? "▶" : "◀"}
                </button>
            </div>
            {/* Logo */}
            <div
                className="flex items-center gap-2 cursor-pointer mb-8 justify-center"
                aria-label="Dashboard Logo"
            >
               
               
               {!isCollapsed && <div className="flex items-center gap-1"><p className="text-bold font-sans text-3xl text-orange-500">HR</p><p className="text-bold font-sans text-3xl text-white">HOSPITAL</p></div>}
            </div>

       
            <div className="h-full px-3 py-4 overflow-y-auto bg-emerald dark:bg-white  ">
                

                {/* Admin Section */}
                {role === 'admin' && (
                <ul className="space-y-2 font-medium">
                    {!isCollapsed &&<h2 className="font-semibold text-gray-800 text-sm py-3">MENU</h2>}
                    <li>
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => `font-bold flex items-center p-2 py-3 text-white rounded-lg dark:text-white ${isActive ? 'bg-gray-900 dark:bg-gray-700' : 'hover:bg-gray-900 dark:hover:bg-gray-700'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                            </svg>

                            {!isCollapsed &&<span className="ms-3 text-sm">Dashboard</span>}
                        </NavLink>
                    </li>

                    

                    {!isCollapsed && <h2 className="font-bold text-gray-800 font-sans text-sm py-3">LEARNING MANAGEMENT</h2>}

                    <li>
                        <ul>
                            <NavLink to="/admin/all-courses" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">All Courses</span>}
                            </NavLink>
                        </ul>
                    </li> 

                    {!isCollapsed && <h2 className="font-bold text-gray-800 font-sans text-sm py-3">TRAINING MANAGEMENT</h2>}
                    
                    <li>
                        <ul>
                            <NavLink to="/admin/scheduleTraining" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Schedule Training</span>}
                            </NavLink>
                        </ul>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Employee Progress</span>}
                            </NavLink>
                        </ul>
                    </li>
                    
                    {!isCollapsed && <h2 className="font-bold text-gray-800 font-sans text-sm py-3">SUCCESS PLANNING</h2>}
                    
                    <li>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Talent Pool</span>}
                            </NavLink>
                        </ul>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Succession PLan</span>}
                            </NavLink>
                        </ul>
                    </li>
                    {!isCollapsed && <h2 className="font-bold text-gray-800 font-sans text-sm py-3">TIME AND ATTENDANCE</h2>}
                    
                    <li>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Employee Time Log</span>}
                            </NavLink>
                        </ul>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Shift Scheduling</span>}
                            </NavLink>
                        </ul>
                    </li>

                    {!isCollapsed && <h2 className="font-bold text-gray-800 font-sans text-sm py-3">CLAIM AND REIMBURSTMENT</h2>}
                    
                    <li>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Pending Claims</span>}
                            </NavLink>
                        </ul>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Reimbursement Status</span>}
                            </NavLink>
                        </ul>
                    </li>

                    {!isCollapsed && <h2 className="font-bold text-gray-800 font-sans text-sm py-3">LEAVE MANGEMENT</h2>}
                    
                    <li>
                        <ul>
                            <NavLink to="/admin/productTracking" className={({ isActive }) => `font-bold flex items-center w-full p-2 py-3 text-white transition duration-75 rounded-lg  group hover:bg-gray-900  dark:hover:bg-gray-700 ${isActive ? 'bg-gray-900 dark:bg-gray-700' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            {!isCollapsed && <span className="ms-3 text-sm">Leave Approvals</span>}
                            </NavLink>
                        </ul>
                    </li>
                </ul>
                )}

                 {/* User Section */}
                 {role === 'user' && (
                    <ul className="space-y-2 font-medium">
                        {!isCollapsed &&<h2 className="font-semibold text-gray-800 text-sm py-3">MENU</h2>}
                        <li>
                            <NavLink 
                                to="/user/home" 
                                className={({ isActive }) => `font-bold flex items-center p-2 py-3 text-white rounded-lg dark:text-white ${isActive ? 'bg-gray-900 dark:bg-gray-700' : 'hover:bg-gray-900 dark:hover:bg-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                                </svg>


                                {!isCollapsed &&<span className="ms-3 text-sm">Home</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/user/courses" 
                                className={({ isActive }) => `font-bold flex items-center p-2 py-3 text-white rounded-lg dark:text-white ${isActive ? 'bg-gray-900 dark:bg-gray-700' : 'hover:bg-gray-900 dark:hover:bg-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>


                                {!isCollapsed &&<span className="ms-3 text-sm">Courses</span>}
                            </NavLink>
                        </li>
                    </ul>
                 )}
            </div>
        </div>
    );
};

export default Sidebar;
