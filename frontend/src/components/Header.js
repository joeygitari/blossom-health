import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

  return (
    <nav className="container  mx-auto bg-white border-gray-200 ">
        <div className=" flex flex-wrap items-center justify-between py-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <img className="h-16" alt="Logo" src={Logo}/>
                <p className="font-bold font-baloo py-4 text-[20px]">BlossomHealth</p>
            </a>

            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {/* <button type="button"
                            className="text-[#FF8585] rounded-[10px] font-poppins font-semibold px-4 py-2 text-center cursor-pointer text-[18px]  md:block hidden">
                        <a href="/signup">Sign up</a>
                    </button> */}
                <div
                    className="font-poppins bg-[#FF8585] -pr-40 w-[147px] h-[50px] font-normal rounded-full text-white text-[16px] text-center px-4 py-3 cursor-pointer md:block hidden">
                    <a href="/register">Register</a>
                </div>
            </div>

            <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 mr-2 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded={isMobileMenuOpen}
            >
                <span className="sr-only">Open main menu</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-deep"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 6h16"/>
                    <path d="M7 12h13"/>
                    <path d="M10 18h10"/>
                </svg>
            </button>

            <div
                className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                    isMobileMenuOpen ? "flex" : "hidden"
                }`}
                id="navbar-cta"
            >
                <ul className="flex flex-col font-normal p-4 md:p-0 mt-2 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li className="block py-2 px-3 md:p-0 font-poppins font-normal text-[18px]">
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? "text-[#FF8585]" : ""}>
                            Home
                        </NavLink>
                    </li>
                    <li className="block py-2 px-3 md:p-0 font-poppins font-normal text-[18px]">
                        <NavLink
                            to="/about"
                            className={({isActive}) => isActive ? "text-[#FF8585]" : ""}>
                            About
                        </NavLink>
                    </li>
                    <li className="block py-2 px-3 md:p-0 font-poppins font-normal text-[18px]">
                        <NavLink
                            to="/services"
                            className={({isActive}) => isActive ? "text-[#FF8585]" : ""}>
                            Services
                        </NavLink>
                    </li>
                    <li className="block py-2 px-3 md:p-0 font-poppins font-normal text-[18px]">
                        <NavLink
                            to="/contact"
                            className={({isActive}) => isActive ? "text-[#FF8585]" : ""}>
                            Contact
                        </NavLink>
                    </li>
                    <li className="md:hidden block">
                        <button type="button"
                                className="text-white bg-[##FF8585]  w-[111px] h-[49px] rounded-[10px] font-poppins font-semibold px-4 py-2 text-center cursor-pointer text-[18px]">
                            <a href="/register">Register</a>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
};

export default Header;

