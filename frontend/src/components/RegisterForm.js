import React from "react";
import Line3 from "../assets/images/Line3.png";

const RegisterForm = () => {
    return (
        <form className="max-w-xl mt-[2rem]">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Full Names
                </label>
                <input type="text" id="fullNames"
                       className="bg-white border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="eg Jane Doe" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    E-mail
                </label>
                <input type="email" id="email"
                       className="bg-white border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="eg email@gmail.com" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Password
                </label>
                <input type="password" id="password"
                       className="bg-white border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="@#*%"
                       required/>
            </div>

            <div className="mb-5">
                <label htmlFor="confirmPassword"
                       className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Confirm Password
                </label>
                <input type="confirmPassword" id="confirmPassword"
                       className="bg-white border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="@#*%"
                       required/>
            </div>

            <button type="submit"
                    className="mt-[2rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                Create Account
            </button>

            <img src={Line3} className="mx-auto mt-[3rem]" alt="Line2"/>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
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
                </div>

                <div>
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
                </div>
            </div>
        </form>
    )
}

export default RegisterForm;