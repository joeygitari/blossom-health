import React, { useState } from "react";
// import Line3 from "../assets/images/Line3.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
     const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");

        try {
            const response = await fetch("/login", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Login successful. Redirecting to dashboard...", {
                    onClose: () => {
                        if (data.role === "patient") {
                            navigate("/patient-dashboard");
                        } else if (data.role === "practitioner") {
                            navigate("/medic-dashboard");
                        }
                        console.log("Session started:", data);
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <form className="max-w-xl mt-[2rem]" onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    E-mail
                </label>
                <input type="email" id="email" autoComplete="off" name="email"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                       placeholder="Enter your email" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                    Password
                </label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} id="password" name="password"
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
        </form>
    )
}

export default LoginForm;