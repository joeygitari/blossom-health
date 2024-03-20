import React from 'react';
import Logo from "../assets/images/logo.png";
import LoginImg from "../assets/images/Signin.png";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <section>
            <div className="min-h-screen grid md:grid-cols-2">
                <div className="p-10 bg-[#F7FAFC]">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img className="h-16" alt="Logo" src={Logo}/>
                        <p className="font-bold font-poppins py-4 text-[20px]">BlossomHealth</p>
                    </a>

                    <p className="font-poppins font-bold text-[48px] text-[#172048] mt-[2rem]">Sign in</p>

                    <p className="font-poppins font-normal text-[18px] text-[#718096] mt-[2rem]">
                        Don't have an account? <a href="/register"
                                                  className="text-[#FF0000] font-medium underline hover:no-underline">Create
                        now</a>
                    </p>

                    <LoginForm/>
                </div>

                <div className="hidden sm:hidden md:block">
                    <img className="min-h-screen w-full" alt="Login" src={LoginImg}/>
                </div>
            </div>
        </section>
    );
}

export default Login;