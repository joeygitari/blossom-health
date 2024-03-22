import React, { useState } from "react";
import Line3 from "../assets/images/Line3.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [userType, setUserType] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <form className="max-w-xl mt-[2rem]">
             <div className="mb-5">
                <label htmlFor="user" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Who are you?
                </label>
                <select type="text" id="user"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       required
                       onChange={handleUserTypeChange}
                >
                    <option value="">Select</option>
                    <option value="medicalPractitioner">Medical Practitioner</option>
                    <option value="patient">Patient</option>
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="fullNames" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Full Names
                </label>
                <input type="text" id="fullNames" autoComplete="off"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="eg Jane Doe" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    E-mail
                </label>
                <input type="email" id="email" autoComplete="off"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="eg email@gmail.com" required/>
            </div>
            {userType === "medicalPractitioner" && (
                <div className="mb-5">
                    <label htmlFor="specialization" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                        Specialization
                    </label>
                    <input
                        type="text"
                        id="specialization"
                        className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                        placeholder="eg Gynaecology"
                        required
                    />
                </div>
            )}
            {userType === "patient" && (
                <div>
                    <div className="mb-5">
                        <label htmlFor="gender" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Gender
                        </label>
                        <select
                            type="text"
                            id="gender"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non binary</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="age" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            placeholder="Enter current age"
                            required
                        />
                    </div>
                </div>
            )}
            <div className="mb-5">
                <label htmlFor="text" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Location
                </label>
                <input type="text" id="text" autoComplete="off"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="eg Nairobi" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Password
                </label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="Enter password"
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
                        {/* <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button> */}
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="confirmPassword"
                       className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Confirm Password
                </label>
                <div className="relative">
                <input type={showRepeatPassword ? "text" : "password"} id="confirmPassword"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="Repeat password"
                       required
                />
                <FontAwesomeIcon
                    icon={showRepeatPassword ? faEye : faEyeSlash}
                    style={{
                        position: 'absolute',
                        right: '5%',
                        top: '30%',
                        cursor: 'pointer'
                    }}
                        onClick={toggleRepeatPasswordVisibility}
                />
                </div>
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