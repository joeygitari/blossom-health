import React, { useState } from "react";
import Line3 from "../assets/images/Line3.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <form className="max-w-xl mt-[2rem]">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    E-mail
                </label>
                <input type="email" id="email"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="Enter your email" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Password
                </label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} id="password"
                        className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                        placeholder="Enter your password"
                        required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            style={{
                                position: 'absolute',
                                right: '5%',
                                top: '30%',
                                cursor: 'pointer'
                            }}
                                onClick={togglePasswordVisibility}
                        />
                </div>
            </div>

            <div className="flex items-center justify-between mb-5">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value=""
                               className="w-4 h-4 border border-[#CFD9E0] rounded bg-white"
                               required/>
                    </div>

                    <div className="">
                        <label htmlFor="remember" className="ms-2 text-[16px] font-poppins font-normal text-[#718096]">
                            Remember me
                        </label>
                    </div>
                </div>
                <a href="/forgot-password"
                   className="text-[16px] font-poppins font-medium text-[#A19B9B] underline hover:no-underline dark:text-primary-500">
                    Forgot password?
                </a>
            </div>

            <button type="submit"
                    className="mt-[2rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                Sign in
            </button>

            <img src={Line3} className="mx-auto mt-[3rem]" alt="Line2"/>

            <button
                className="w-full mt-[3rem] h-14 px-6 border-2 border-[#CBD5E0] rounded-full transition duration-300 hover:border-blue-400">
                <div className="relative flex items-center space-x-4 justify-center">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                         className="absolute left-0 w-5" alt="google logo"/>
                    <span
                        className="block w-max font-poppins font-semibold tracking-wide text-[#67728A] text-[18px] transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with Google
                    </span>
                </div>
            </button>

            <button
                className="w-full mt-[3rem] h-14 px-6 border-2 border-[#CBD5E0] rounded-full transition duration-300 hover:border-blue-400">
                <div className="relative flex items-center space-x-4 justify-center">
                    <img src="https://www.svgrepo.com/show/448224/facebook.svg"
                         className="absolute left-0 w-5" alt="google logo"/>
                    <span
                        className="block w-max font-poppins font-semibold tracking-wide text-[#67728A] text-[18px] transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with Facebook
                    </span>
                </div>
            </button>
        </form>
    )
}

export default LoginForm;