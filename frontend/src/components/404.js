import React from "react";
import FourOFourImg from "../assets/images/Oops.png";
import { Link } from "react-router-dom";

const FourOFour = () => {
    return (
        <section className="min-h-screen bg-white">
            <div className="grid grid-cols-2 lg:grid-cols-2">
                <div className="px-20 py-52 text-center lg:text-left">
                    {/* <h1 className="font-poppins font-normal text-[100px] md:text-[200px] text-[#FF8585]"> 
                        404
                    </h1> */}

                    <p className="font-poppins font-medium text-[20px] md:text-[30px] text-gray-900 mt-8">
                        We are sorry, but the page you requested was not found
                    </p>

                    <Link
                        to="/"
                        className="font-poppins mt-12 w-60 h-12 bg-[#FF8585] rounded-md flex items-center justify-center mx-auto lg:mx-0 text-white text-[18px] font-normal"
                    >
                        Back to home
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 1024 1024"
                            className="ml-2"
                        >
                            <path
                                fill="white"
                                d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="hidden lg:block">
                    <img className="h-200 w-200 object-cover" alt="404" src={FourOFourImg} />
                </div>
            </div>
        </section>
    );
};

export default FourOFour;
