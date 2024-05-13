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

const Homepage = () => {
    return(
        <>
            <Header/>
            <div className="container mx-auto bg-white md:p-0 p-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:mt-[5rem]">
                        <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[58px]">
                            Making women's <br/>
                            <span className="text-[#F70000]">healthcare and wellness</span> <br/>
                            more accessible
                        </p>

                        <p className="font-poppins font-normal text-[11px] md:text-[22px] text-[#C4C4C4] leading-5 md:leading-10 md:mt-5 sm:mt-3">
                            We help women check their reproductive health, schedule appointments, and consult medical experts on reproductive health issues
                        </p>

                        {/* <div
                            className="mt-[3rem] font-poppins bg-[#FF8585] -pr-40 w-[232px] h-[60px] font-normal rounded-full text-white text-[16px] text-center px-4 py-4 cursor-pointer md:block hidden">
                            <a href="/tryfreeconsultation">Try Free Consultation</a>
                        </div> */}

                        {/* <div className="flex gap-20 md:gap-40 mt-[2rem] md:mt-[4rem]">
                            <div>
                                <p className="font-poppins font-bold text-[18px] md:text-[36px] text-[#172048]">
                                    200<span className="text-[#FF8585]">+</span>

                                    <p className="font-poppins font-semibold text-[9px] md:text-[18px] text-[#C4C4C4]">
                                        Registered <br/>
                                        medical professionals
                                    </p>
                                </p>
                            </div>

                            <div>
                                <p className="font-poppins font-bold text-[18px] md:text-[36px] text-[#172048]">
                                    15K<span className="text-[#FF8585]">+</span>

                                    <p className="font-poppins font-semibold text-[9px] md:text-[18px] text-[#C4C4C4]">
                                        Registered <br/>
                                        patients
                                    </p>
                                </p>
                            </div>
                        </div> */}
                    </div>

                    <div className="mt-[2.5rem] md:mt-[5rem]">
                        <img className="md:h-[780px] w-[826px] sm:h-full" alt="Home1" src={Home1}/>
                    </div>
                </div>


                {/* <div className="mt-[3.5rem] md:mt-[7rem]">
                    <h3 className="font-poppins font-medium text-[20px] text-[#BFBFBF] text-center tracking-[6.30px]">PARTNERS</h3>
                    <div className="grid md:grid-cols-5 gap-12 justify-center">
                        <div className="mt-5 flex justify-center">
                            <img className="md:h-[71px] w-[92px] sm:h-full" alt="Partner1" src={Partner1}/>
                        </div>
                        <div className="flex justify-center">
                            <img className="md:h-[131px] w-[131px] sm:h-full" alt="Partner2" src={Partner2}/>
                        </div>
                        <div className="flex justify-center">
                            <img className="md:h-[114px] w-[162px] sm:h-full" alt="Partner3" src={Partner3}/>
                        </div>
                        <div className="flex justify-center">
                            <img className="md:h-[118px] w-[170px] sm:h-full" alt="Partner4" src={Partner4}/>
                        </div>
                        <div className="flex justify-center">
                            <img className="md:h-[97px] w-[115px] sm:h-full" alt="Partner5" src={Partner5}/>
                        </div>
                    </div>
                </div> */}


                <div className="mt-[1.5rem] md:mt-[3rem] flex justify-center items-center">
                    <div>
                        <h4 className="font-poppins font-bold text-[#172048] text-[24px] md:text-[48px] text-center">
                            What We Do
                        </h4>
                        <img className="mx-auto mt-2 md:mt-4" alt="Line1" src={Line1}/>
                        <div className="mt-[2.5rem] md:mt-[5rem]">
                            <div className="grid md:grid-cols-3 gap-10">
                                <div
                                    className="max-w-sm bg-[#FFF8F8] rounded-[30px] border-[#FFF8F8] group hover:bg-gradient-to-b hover:from-[#FFBCBC] hover:to-[#FF6969] transition duration-300 cursor-pointer">
                                    <img src={Do1} alt="Do1" className="mx-auto mt-[3.5rem] md:mt-[7rem]"/>

                                    <h4 className="font-poppins font-bold text-[#172048] md:text-[22px] mt-[3.5rem] md:mt-[7rem] mb-4 px-5 group-hover:text-white">
                                        Engagement
                                    </h4>
                                    <p className="font-poppins font-normal text-[14px] text-[#868686] px-5 mb-[2rem] leading-8 group-hover:text-white">
                                        Connect directly, quickly and easily with our <br/> registered board doctors,
                                        and there is no need to doubt the quality of the consultation and <br/>
                                        treatment offered.
                                    </p>
                                </div>

                                <div
                                    className="max-w-sm bg-[#FFF8F8] rounded-[30px] border-[#FFF8F8] group hover:bg-gradient-to-b hover:from-[#FFBCBC] hover:to-[#FF6969] transition duration-300 cursor-pointer">
                                    <img src={Do2} alt="Do1" className="mx-auto mt-[3.5rem] md:mt-[7rem]"/>

                                    <h4 className="font-poppins font-bold text-[#172048] md:text-[22px] mt-[2rem] md:mt-[4rem] mb-4 px-5 group-hover:text-white">
                                        Health Records Management
                                    </h4>
                                    <p className="font-poppins font-normal text-[14px] text-[#868686] px-5 mb-[2rem] leading-8 group-hover:text-white">
                                        Talk about the health complaints you are experiencing and don't hesitate to
                                        ask about the proper treatment.
                                    </p>
                                </div>


                                <div
                                    className="max-w-sm bg-[#FFF8F8] rounded-[30px] border-[#FFF8F8] group hover:bg-gradient-to-b hover:from-[#FFBCBC] hover:to-[#FF6969] transition duration-300 cursor-pointer">
                                    <img src={Do3} alt="Do1" className="mx-auto mt-[3.5rem] md:mt-[7rem]"/>

                                    <h4 className="font-poppins font-bold text-[#172048] md:text-[22px] mt-[2.5rem] md:mt-[5rem] mb-4 px-5 group-hover:text-white">
                                        Early Intervention
                                    </h4>
                                    <p className="font-poppins font-normal text-[14px] text-[#868686] px-5 mb-[2rem] leading-8 group-hover:text-white">
                                        Get priority services in hospitals with Blossom Health. Which allows you to go
                                        to
                                        the hospital more practically and save time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-[2rem] md:mt-[5rem]">
                    <div className="grid md:grid-cols-2">
                        <div>
                            <img className="md:h-[876px] w-[542px] sm:h-full" src={Home2} alt="Home2"/>
                        </div>

                        <div className="mt-[3rem] md:mt-[6rem]">
                            <h3 className="font-poppins font-bold text-[24px] md:text-[48px] text-[#172048]">Our main
                                services</h3>
                            <img className="mt-2 md:mt-4" alt="Line1" src={Line1}/>

                            <p className="font-poppins font-medium md:text-[14px] text-[#C4C4C4] leading-8">
                                At Blossom Health, we aim to promote healthy lifestyes.&nbsp;
                                <span className="hidden md:inline-block">
                                    <br/>
                                </span>
                                We prioritize women's healthcare by providing convenient, hassle free access to quality healthcare services and wellness information&nbsp;
                                <span className="hidden md:inline-block">
                                    <br/>
                                </span>
                            </p>


                            <div className="grid md:grid-cols-2">
                                <div className="mt-[3rem] text-center md:text-left">
                                    <div>
                                        <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon}
                                             alt="Icon"/>

                                        <p className="font-poppins font-bold text-[20px] text-[#172048]">
                                            Convenient virtual visits
                                        </p>
                                        <p className="font-poppins font-medium text-[12px] text-[#C4C4C4] leading-6">
                                            Schedule a virtual visit&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            with a qualified specialists&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            from the comfort of your home.&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-[3rem] text-center md:text-left">
                                        <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon}
                                             alt="Icon"/>

                                        <p className="font-poppins font-bold text-[20px] text-[#172048]">
                                            Predictive screening 
                                        </p>
                                        <p className="font-poppins font-medium text-[12px] text-[#C4C4C4] leading-6">
                                            Unlock the power of Machine Learning!&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            Our platform uses advanced ML algorithms to analyze health data&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            and identify potential risks early on, improving health outcomes.&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-[3rem]">
                                    <div className="text-center md:text-left">
                                        <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon}
                                             alt="Icon"/>

                                        <p className="font-poppins font-bold text-[20px] text-[#172048]">
                                            Health and wellness education 

                                        </p>
                                        <p className="font-poppins font-medium text-[12px] text-[#C4C4C4] leading-6">
                                            Empower yourself with knowledge about women’s health issues,&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            wellness practices and products that help.&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-[3rem] text-center md:text-left">
                                        <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon}
                                             alt="Icon"/>

                                        <p className="font-poppins font-bold text-[20px] text-[#172048]">
                                            Supportive community 
                                        </p>
                                        <p className="font-poppins font-medium text-[12px] text-[#C4C4C4] leading-6">
                                            Join a community of women navigating similar health journeys,&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                            share experiences and offer a safe and supportive environment.&nbsp;
                                            <span className="hidden md:inline-block">
                                                <br/>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img className="mx-auto w-full mt-[2rem]" alt="Line2" src={Line2}/>
                        </div>
                    </div>
                </div>


                {/* <div className="mt-[5rem] md:mt-[10rem]">
                    <div className="grid md:grid-cols-2">
                        <div>
                            <p className="px-3 font-poppins font-semibold text-[18px] text-[#172048]">Our Doctors</p>
                            <img className="mt-4" alt="Line1" src={Line1}/>
                            <h4 className="px-3 font-poppins font-bold text-[#FF3737] text-[24px] md:text-[48px]">
                                Qualified Doctors
                            </h4>

                            <p className="px-3 font-poppins font-medium md:text-[18px] text-[#C4C4C4] leading-10 mt-3">
                                Handled directly by general doctors and professional <br/>
                                and experienced specialists doctors.
                            </p>

                            <img className="mt-4 md:h-[335px] w-[500px]" alt="Home5" src={Home5}/>
                        </div>

                        <div>
                            <img className="mt-4 md:h-[593px] w-[605px] " alt="Home4" src={Home4}/>
                        </div>
                    </div>
                </div> */}

                <Card className="mt-[2.5rem] md:mt-[5rem] p-[7rem]">
                    <div>
                        <div className="text-center">
                            <h4 className="font-poppins font-bold text-[24px] md:text-[48px] text-[#172048]">Get started
                                with Blossom Health</h4>

                            <img className="mx-auto mt-4" alt="Line5" src={Line5}/>
                            {/* <p className="mt-[2rem] font-poppins font-medium text-[18px] text-[#C4C4C4] leading-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales morbi tristique libero
                                urna sem
                                <span className="hidden md:inline-block">
                                    <br/>
                                </span>
                                vitae. Viverra facilisis rhoncus et, nibh nullam vitae laoreet.
                                <span className="hidden md:inline-block">
                                    <br/>
                                </span>
                            </p>

                            <p className="mt-4 font-poppins font-medium text-[18px] text-[#C4C4C4] leading-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales morbi tristique libero
                                urna sem
                                <span className="hidden md:inline-block">
                                    <br/>
                                </span>
                                vitae. Viverra facilisis rhoncus et, nibh nullam vitae laoreet.
                            </p> */}


                            <div className="mt-[4rem] flex justify-center">
                                <div
                                    className="font-poppins bg-[#FF8585] w-[173px] h-[55px] font-normal rounded-full text-white text-[16px] text-center px-4 py-4 cursor-pointer">
                                    <a href="/register">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <Footer/>
        </>
    );
}

export default Homepage;
