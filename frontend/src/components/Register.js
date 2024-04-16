import React from 'react';
import Logo from "../assets/images/logo.png"
import RegisterForm from "./RegisterForm";
import RegisterImg from "../assets/images/Signup.png";
import {Link} from "react-router-dom";

const Register = () => {
    return(
        <section>
            <div className="min-h-screen grid md:grid-cols-2">
                <div className="p-10 bg-[#F7FAFC]">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img className="h-16" alt="Logo" src={Logo}/>
                        <p className="font-bold font-poppins py-4 text-[20px]">BlossomHealth</p>
                    </Link>

                    <p className="font-poppins font-bold text-[48px] text-[#172048] mt-[1rem]">Sign up</p>

                    <p className="font-poppins font-normal text-[18px] text-[#718096] mt-[2rem]">
                        Don't have an account? <Link to="/register" className="text-[#FF0000] font-medium underline hover:no-underline">Create now</Link>
                    </p>

                    <RegisterForm/>
                </div>

                <div className="hidden sm:hidden md:block">
                    <img className="h-full w-full" alt="RegisterImg" src={RegisterImg}/>
                </div>
            </div>
        </section>
    );
}

export default Register;
