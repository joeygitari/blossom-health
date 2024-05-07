import React from 'react';
import Footer from "./Footer";
import Header from "./Header";


const Services = () => {
    return (
        <>
            <Header/>
            <div className="container mx-auto bg-white md:p-0 p-6">
                <div className="grid md:grid-cols- 1gap-4">
                    <div className="md:mt-[3.5rem]">
                        <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[58px] text-center">
                            Our <span className="text-[#F70000]">Services</span>
                        </p>

                        <p className="font-poppins font-normal text-[11px] md:text-[22px] text-[#C4C4C4] leading-5 md:leading-10 md:mt-5 sm:mt-3 text-center">
                            Your number 1 trusted women's clinic, we help women
                            with reproductive issues, and assess pregnancy risks.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Services;