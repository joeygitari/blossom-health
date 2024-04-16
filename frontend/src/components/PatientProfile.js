import React from "react";
import Logo from "../assets/images/logo.png";
import {Link} from "react-router-dom";
import PatientProfileForm from "./PatientProfileForm";

const PatientProfile = () => {
    return (
        <>
            <section className="bg-[#F7FAFC]">
                <div className="container mx-auto min-h-screen p-8">
                    <div className="grid md:grid-cols-1">
                        <Link to="/" className="flex py-5">
                            <img className="flex items-center space-x-3 rtl:space-x-reverse h-16 cursor-pointer"
                                 alt="Logo"
                                 src={Logo}/>
                            <p className="font-bold font-poppins py-4 px-3 text-[20px]">BlossomHealth</p>
                        </Link>
                        <p className="font-poppins font-bold text-[48px] text-[#172048] mt-[1rem]">Add Patient
                            Profile</p>
                    </div>

                    <PatientProfileForm/>
                </div>
            </section>
        </>
)
}

export default PatientProfile;