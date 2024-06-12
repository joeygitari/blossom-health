import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import LoginImg from "../assets/images/Signin.png";
import {Link} from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/reset/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message, {
                    onClose: () => {
                        navigate("/login");  // Redirect to login page
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <section>
            <div className="min-h-screen grid md:grid-cols-2">
                <div className="p-10 bg-[#F7FAFC]">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img className="h-16" alt="Logo" src={Logo}/>
                        <p className="font-bold font-poppins py-4 text-[20px]">BlossomHealth</p>
                    </Link>

                    <p className="font-poppins font-bold text-[48px] text-[#172048] mt-[2rem]">New Password</p>
                    

                    <form className="max-w-xl mt-[2rem]" onSubmit={handleSubmit} noValidate>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                New Password
                            </label>
                            <input type="password" id="password" autoComplete="off" name="password"
                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                placeholder="Enter your new password" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit"
                                className="mt-[1.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                            Reset Password
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
                </div>
                <div className="hidden sm:hidden md:block">
                    <img className="h-full w-full" alt="Login" src={LoginImg}/>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
