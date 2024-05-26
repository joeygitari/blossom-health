import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import AboutImg1 from "../assets/images/AboutImg1.png";
import Line5 from "../assets/images/Line5.png";

const About = () => {
    return (
        <>
            <Header/>
            <div className="grid md:grid-cols-1 mt-[2rem]">
                <img src={AboutImg1} alt="About" className="md:h-full w-full"/>
            </div>

            <div className="mt-[2.5rem] md:mt-[5rem]">
                <p className="text-center font-poppins font-bold text-[#172048] text-[29px] md:text-[50px] text-center">
                    <span className="text-[#F70000]">Who</span> We Are
                </p>
                <img className="mx-auto mt-2 md:mt-4" alt="Line5" src={Line5}/>
                <p className="font-poppins font-normal text-[#172048] text-[10px] md:text-[18px] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5 text-center">
                    Welcome to BlossomHealth, where our passion lies in transforming women’s reproductive healthcare across Kenya. 
                    We are a multidisciplinary team comprising medical practitioners,  software developers, and health policy experts, united by a common goal: to harness the power of technology to bridge the significant gaps in reproductive health management. 
                    Our dedication stems from a deep understanding of the unique challenges faced by women in Kenya, particularly in accessing timely, accurate, and personalized healthcare.
                    BlossomHealth was founded on the belief that every woman deserves the best possible care, regardless of her geographical location or socioeconomic status. 
                    We are driven by the vision of a future where innovative technology and medical expertise converge to create a healthier and more empowered community of women.
                </p>
            </div>

            <div className="text-center mt-[2.5rem] md:mt-[5rem]">
                <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[50px] text-center">
                    <span className="text-[#F70000]">What</span> We Do
                </p>
                <img className="mx-auto mt-2 md:mt-4" alt="Line5" src={Line5}/>

                <p className="font-poppins font-normal text-[#172048] text-[10px] md:text-[18px] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5 text-center">
                    At BlossomHealth, our mission is to revolutionize the landscape of reproductive health through an advanced, web-based platform designed to predict, diagnose, and facilitate early intervention for various reproductive diseases. 
                    We aim to address critical healthcare gaps by providing a comprehensive solution that empowers women and healthcare professionals alike.
                    Our platform is designed with the user in mind, ensuring that it is accessible, user-friendly, and highly effective in delivering precise health insights and recommendations.      
                </p>
            </div>

            {/* <div className="container mx-auto bg-white md:p-0 p-6">
                <div className="grid md:grid-cols- 1gap-4">
                    <div className="md:mt-[3.5rem]">
                        <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[58px] text-center">
                            About <span className="text-[#F70000]">Us</span>
                        </p>

                        <p className="font-poppins font-normal text-[11px] md:text-[22px] text-[#C4C4C4] leading-5 md:leading-10 md:mt-5 sm:mt-3 text-center">
                            Your number 1 trusted women's clinic, we help women
                            with reproductive issues, and assess pregnancy risks.
                        </p>
                    </div>
                </div>
            </div> */}
            <Footer/>
        </>
    )
}

export default About;