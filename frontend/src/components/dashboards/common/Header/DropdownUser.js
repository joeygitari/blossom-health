import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DropdownUser = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    // Logout function
    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('userData');
        // Redirect the user to the login page
        // navigate('/login');
        toast.success("Logout successful.", {
            onClose: () => {
                navigate('/');
            }
        });
    };

    return (
        <div className="relative font-poppins">
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                to="#"
            >
            {currentUser && (
            <>
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-poppins font-medium text-black dark:text-white">
                        {currentUser.name}
                    </span>
                    <span className="block text-xs font-poppins">{currentUser.specialization}</span>
                </span>

                {/* <span className="h-12 w-12 rounded-full"> */}
                    {/* <img src={UserSeven} alt="User" /> */}
                    {/* <UserCircleIcon /> */}
                {/* </span> */}

                <svg
                    className="hidden fill-current sm:block"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                        fill=""
                    />
                </svg>
            </>
            )}
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                    dropdownOpen === true ? 'block' : 'hidden'
                }`}
            >
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    <li>
                        <Link
                            to="/profile"
                            className="flex items-center gap-3.5 text-black text-sm font-medium duration-300 ease-in-out dark:text-bodydark1 dark:hover:text-white"
                        >
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                                    fill=""
                                />
                                <path
                                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                                    fill=""
                                />
                            </svg>
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            onClick={handleLogout}
                            className="flex items-center gap-3.5 text-black text-sm font-medium duration-300 ease-in-out dark:text-bodydark1 dark:hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                            <span>Log out</span>
                        </Link>
                    </li>
                </ul>
                {/* <button className="block w-full px-6 py-3.5 text-sm font-medium text-left text-primary bg-transparent duration-300 ease-in-out dark:hover:text-white lg:text-base">
                    Log Out
                </button> */}
            </div>
            {/* <!-- Dropdown End --> */}
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </div>
    );
};

export default DropdownUser;
