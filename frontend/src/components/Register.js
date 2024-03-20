import React from 'react';
import Logo from "../assets/images/logo.png"
import RegisterForm from "./RegisterForm";
import RegisterImg from "../assets/images/Signup.png";

const Register = () => {
    return(
        <section>
            <div className="min-h-screen grid md:grid-cols-2">
                <div className="p-10">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img className="h-16" alt="Logo" src={Logo}/>
                        <p className="font-bold font-poppins py-4 text-[20px]">BlossomHealth</p>
                    </a>

                    <p className="font-poppins font-bold text-[48px] text-[#172048] mt-[1rem]">Sign up</p>

                    <p className="font-poppins font-normal text-[18px] text-[#718096] mt-[1rem]">
                        Already have an account? <a href="/login"
                                                    className="text-[#FF0000] font-medium underline hover:no-underline">
                        Sign in</a>
                    </p>

                    <RegisterForm/>
                </div>

                <div className="hidden sm:hidden md:block">
                    <img className="h-auto w-full" alt="RegisterImg" src={RegisterImg}/>
                </div>
            </div>
        </section>
    );
}

export default Register;