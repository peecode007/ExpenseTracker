import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/themeProvider';
import toast from 'react-hot-toast';
import { CiLogout } from "react-icons/ci";

const SideNavbar = () => {
    const location = useLocation();
    const { theme } = useTheme();
    const navigate = useNavigate()

    const isActive = (pathname) => location.pathname === pathname ? 'bg-indigo-400 text-white' : '';

    const handleLogout = async () => {
        const host = import.meta.env.VITE_API_URI;
        try {
            const response = await fetch(`${host}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Include credentials to allow cookies
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                // Handle successful logout
                navigate('/api/auth/login');
                toast.success("Logged Out Successfully.")
            } else {
                // Handle unsuccessful logout
                console.error('Logout failed:', data.message);
            }

        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        <div className={`p-5 h-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-50 text-black'}`}>
            <Link to="/">
                <div className="logo rounded-lg">
                    <img src={theme === 'dark' ? '/logo2.svg' : '/logo.svg'} alt="Logo" width={190} height={150} className="bg-transparent" />
                </div>
            </Link>
            <div className="flex flex-col py-3 gap-5 h-[90vh] justify-between">
                <Link to="/dashboard">
                    <div className={`flex items-center p-5 hover:bg-indigo-400 cursor-pointer shadow-sm rounded-md gap-2 ${theme === 'dark' ? 'border-2 border-white shadow-md' : 'bg-blue-50 text-black border-2 border-gray-200'} ${isActive('/dashboard')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
                        </svg>
                        <h2 className="text-xl">Dashboard</h2>
                    </div>
                </Link>
                <Link to="/dashboard/budgets">
                    <div className={`flex items-center p-5 hover:bg-indigo-400 cursor-pointer shadow-sm rounded-md gap-2 ${theme === 'dark' ? 'border-2 border-white shadow-md' : 'bg-blue-50 text-black border-2 border-gray-200'} ${isActive('/dashboard/budgets')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
                        </svg>
                        <h2 className="text-xl">Budgets</h2>
                    </div>
                </Link>
                <Link to="/dashboard/expenses">
                    <div className={`flex items-center p-5 hover:bg-indigo-400 cursor-pointer shadow-sm rounded-md gap-2 ${theme === 'dark' ? 'border-2 border-white shadow-md' : 'bg-blue-50 text-black border-2 border-gray-200'} ${isActive('/dashboard/expenses')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M240-360h280l80-80H240v80Zm0-160h240v-80H240v80Zm-80-160v400h280l-80 80H80v-560h800v120h-80v-40H160Zm756 212q5 5 5 11t-5 11l-36 36-70-70 36-36q5-5 11-5t11 5l48 48ZM520-120v-70l266-266 70 70-266 266h-70ZM160-680v400-400Z" />
                        </svg>
                        <h2 className="text-xl">Expenses</h2>
                    </div>
                </Link>
                <div className="mt-auto ">
                    <button
                        className={`flex items-end p-3 hover:bg-indigo-400 cursor-pointer shadow-sm rounded-md gap-2 
        ${theme === 'dark' ? 'border-2 border-white shadow-md' : 'bg-blue-50 text-black border-2 border-gray-200'}`}
                        onClick={handleLogout}
                        style={{ fontSize: '0.75rem' }}
                    >

                        <CiLogout />

                        <h2 className="text-md font-bold">Logout</h2>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;
