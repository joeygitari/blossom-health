import React from 'react';
import Home1 from "../assets/images/Home1.png";
import Home2 from "../assets/images/Home2.png";
import Home4 from "../assets/images/Home4.png";
import Home5 from "../assets/images/Home5.png";
import Partner1 from "../assets/images/Partner1.png";
import Partner2 from "../assets/images/Partner2.png";
import Partner3 from "../assets/images/Partner3.png";
import Partner4 from "../assets/images/Partner4.png";
import Partner5 from "../assets/images/Partner5.png";
import Line1 from "../assets/images/Line1.png";
import Line2 from "../assets/images/Line2.png";
import Line5 from "../assets/images/Line5.png";
import Do1 from "../assets/images/Do1.png";
import Do2 from "../assets/images/Do2.png";
import Do3 from "../assets/images/Do3.png";
import Icon from "../assets/images/Icon.png";
import {Card} from "@material-tailwind/react";
import Footer from "./Footer";
import Header from "./Header";
import AboutImg1 from "../assets/images/AboutImg1.png";

const About = () => {
    return (
        <>
            <Header/>
            <div className="grid md:grid-cols-1 mt-[2rem]">
                <img src={AboutImg1} alt="About" width="1560px" height="520px" className="md:h-full w-full"/>
            </div>

            <div className="text-center mt-[2.5rem] md:mt-[5rem]">
                <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[58px] text-center">
                    <span className="text-[#F70000]">Who</span> We Are
                </p>
                <h4 className="font-poppins font-normal text-[11px] md:text-[22px] text-[#C4C4C4] leading-5 md:leading-10 md:mt-5 sm:mt-3 text-center">
                    Your number 1 trusted women's clinic, we help women
                    with reproductive issues, and assess pregnancy risks.
                </h4>
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
        </>
    )
}

export default About;