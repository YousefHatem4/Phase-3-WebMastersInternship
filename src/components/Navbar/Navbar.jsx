// src/components/Navbar/Navbar.jsx
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/userContext'
import { supabase } from '../../supabaseClient'

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Get user data from context
    const { userToken, user, isAdmin, setUserToken, setUser } = useContext(userContext);

    // Static cart data
    const cartItemsCount = 3; // Static number of items in cart

    // Check if user is logged in
    const isUserLoggedIn = userToken !== null;

    async function logOut() {
        try {
            // Sign out from Supabase
            await supabase.auth.signOut();

            // Clear local state
            setUserToken(null);
            setUser(null);
            localStorage.removeItem('userToken');

            // Navigate to home
            navigate('/');

            // Close mobile menu if open
            setMenuOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return <>
        <div className='bg-gradient-to-r from-blue-600 to-teal-500 py-3 text-center'>
            <p className='font-serif text-white'>Summer Sale For All Sportswear And Free Express Delivery - OFF 50%! <Link to={'products'} className='ms-2 underline font-medium'>ShopNow</Link></p>
        </div>

        <nav className="bg-white sticky w-full z-30 top-0 start-0 border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={''} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">SportFlex</span>
                </Link>

                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {isUserLoggedIn && <>
                        <Link to={'wishlist'}><i className={`${currentPath === '/wishlist' ? 'fa-solid fa-heart bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'fa-regular fa-heart'} text-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all duration-300 text-2xl`}></i></Link>
                        <Link to={'cart'}><i className={`${currentPath === '/cart' ? 'fa-solid fa-cart-shopping bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'fa-solid fa-cart-shopping'} relative md:ms-2 text-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all duration-300 text-2xl`}></i>
                            {cartItemsCount > 0 && <>
                                <span className='absolute right-15 top-3 md:top-2 md:right-32 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium text-sm px-1.5 rounded-full'>
                                    {cartItemsCount}
                                </span>
                            </>}
                        </Link>
                    </>}

                    <button onClick={() => setMenuOpen(!menuOpen)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                        <span className="sr-only">Open main menu</span>
                        {menuOpen ? <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg></> : <> <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg></>}
                    </button>
                </div>

                <div className={`items-center ${menuOpen ? 'block' : 'hidden'} justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col md:gap-5 p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 text-center md:text-left">
                        <li>
                            <Link to={''} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                Home
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'products'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/products' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                Products
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                     
                        <li>
                            <Link to={'category'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/category' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                Categories
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'about'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/about' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                About
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'contact'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/contact' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                Contact
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>

                        {/* Show Admin link only for admin users */}
                        {isAdmin && (
                            <li>
                                <Link to={'admin'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/admin' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                    Admin Panel
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        )}

                        <li>
                            {!isUserLoggedIn && (
                                <Link to={'login'} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 ${currentPath === '/login' ? 'bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent' : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent'} rounded md:p-0 relative group transition-all duration-300`}>
                                    Sign in
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-600 md:duration-300 group-hover:w-full"></span>
                                </Link>
                            )}
                            {isUserLoggedIn && (
                                <span onClick={logOut} className="cursor-pointer font-bold text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent text-sm transition-all duration-300">
                                    Logout
                                </span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}