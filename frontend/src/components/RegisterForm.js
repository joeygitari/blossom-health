import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [userType, setUserType] = useState("");
    const [otpStep, setOtpStep] = useState(false);
    const [otp, setOtp] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Submitting OTP:", otp);
            const response = await fetch("/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ otp })
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("User registered successfully. Redirecting to login...", {
                    onClose: () => {
                        navigate("/login");
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to verify OTP");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const form = event.target;
            const formData = new FormData(form);

            const emptyFields = [];
            form.querySelectorAll('input, select').forEach((input) => {
                if (!input.value) {
                    emptyFields.push(input.name);
                }
            });

            if (emptyFields.length > 0) {
                toast.error(`Please fill in the following fields: ${emptyFields.join(", ")}`);
                return;
            }

            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");

            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            const response = await fetch("/register", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("OTP sent to your email");
                setOtpStep(true);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to register user");
        }
    };

    return (
        <>
            {otpStep ? (
                <form className="max-w-xl mt-[2rem]" onSubmit={handleOtpSubmit} noValidate>
                    <div className="mb-5">
                        <label htmlFor="otp" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Enter OTP <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="otp"
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            placeholder="Enter OTP"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-[2rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center"
                    >
                        Verify OTP
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
            ) : (
                <form className="max-w-xl mt-[2rem]" onSubmit={handleSubmit} noValidate>
                    <div className="mb-5">
                        <label htmlFor="userType" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Who are you? <span className="text-red-500">*</span>
                        </label>
                        <select
                            type="text"
                            id="userType"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            required
                            onChange={handleUserTypeChange}
                            name="userType"
                        >
                            <option value="">Select</option>
                            <option value="medicalPractitioner">Medical Practitioner</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="fullNames" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullNames"
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            placeholder="eg Jane Doe"
                            name="fullNames"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            E-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            placeholder="eg email@gmail.com"
                            name="email"
                            required
                        />
                    </div>

                    {userType === "medicalPractitioner" && (
                        <div className="mb-5">
                            <label htmlFor="specialization" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Specialization <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="specialization"
                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                placeholder="eg Gynaecology"
                                name="specialization"
                                autoComplete="off"
                                required
                            />
                        </div>
                    )}

                    {userType === "patient" && (
                        <div>
                            <div className="mb-5">
                                <label htmlFor="gender" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    autoComplete="off"
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
                                    Age <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    autoComplete="off"
                                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                    placeholder="Enter current age"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="mb-5">
                        <label htmlFor="text" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="text"
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            placeholder="eg Nairobi"
                            name="location"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                placeholder="Enter password"
                                name="password"
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

                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
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
                    <button
                        type="submit"
                        className="mt-[2rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center"
                    >
                        Create Account
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
            )}
        </>
    );
};

export default RegisterForm;
