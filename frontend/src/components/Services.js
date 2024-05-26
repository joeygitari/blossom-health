import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import Icon from "../assets/images/Icon.png";
import Line5 from "../assets/images/Line5.png";

const Services = () => {
    return (
        <>
            <Header/>
            <div className="container mx-auto bg-white md:p-0 p-6">
                <div className="grid md:grid-cols-1 gap-4">
                    <div className="md:mt-[3.5rem]">
                        <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[58px] text-center">
                            Our <span className="text-[#F70000]">Services</span>
                        </p>

                        {/* <p className="font-poppins font-normal text-[11px] md:text-[22px] text-black leading-5 md:leading-10 md:mt-5 sm:mt-3 text-center">
                            BlossomHealth offers a range of services designed to improve reproductive health outcomes:
                        </p> */}
                        {/* <br /> */}
                        <img className="mx-auto mt-2 md:mt-4" alt="Line5" src={Line5}/>


                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div className="font-poppins font-normal text-[10px] md:text-[18px] text-[#172048] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5">
                                <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                                <h3 className="font-bold">Predictive Analysis</h3>
                                <p>Utilizing sophisticated machine learning algorithms, our system predicts and diagnoses reproductive health conditions such as endometriosis and polycystic ovary syndrome (PCOS). 
                                    By analyzing patient data including biodata, medical history, and user-inputted symptoms, we provide early and accurate diagnoses, facilitating timely intervention and management.</p>
                            </div>
                            <div className="font-poppins font-normal text-[10px] md:text-[18px] text-[#172048] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5">
                                <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                                <h3 className="font-bold">Risk Assessment</h3>
                                <p>Our platform assesses the risk of complications during childbirth, focusing on critical issues such as hemorrhages and pregnancy loss. 
                                    By identifying potential risks early, we enable healthcare providers and expectant mothers to take proactive measures, improving the chances of a safe delivery and healthy postpartum period.</p>
                            </div>
                            <div className="font-poppins font-normal text-[10px] md:text-[18px] text-[#172048] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5">
                                <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                                <h3 className="font-bold">Personalized Recommendations</h3>
                                <p>We generate tailored recommendations based on the comprehensive analysis of each user’s data. 
                                    These recommendations help in managing risks and improving reproductive health outcomes, providing actionable insights that users can trust.</p>
                            </div>
                            <div className="font-poppins font-normal text-[10px] md:text-[18px] text-[#172048] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5">
                                <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                                <h3 className="font-bold">User-Friendly Interface</h3>
                                <p>Our platform features an intuitive interface that encourages users to input relevant symptoms and medical history efficiently. 
                                    This user-centric design ensures that women can engage with the platform easily, leading to better health management and outcomes.</p>
                            </div>
                            <div className="font-poppins font-normal text-[10px] md:text-[18px] text-[#172048] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5">
                                <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                                <h3 className="font-bold">Continuous Learning and Improvement</h3>
                                <p>Our machine learning models continuously learn from new data and incorporate the latest medical research to enhance their predictive accuracy and recommendation quality. 
                                    This ensures that BlossomHealth remains at the forefront of reproductive health technology.</p>
                            </div>
                            <div className="font-poppins font-normal text-[10px] md:text-[18px] text-[#172048] leading-5 md:leading-10 md:mt-5 sm:mt-3 ml-5 mr-5">
                                <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                                <h3 className="font-bold">Privacy and Security</h3>
                                <p>We prioritize the privacy and security of our users. 
                                    BlossomHealth adheres to strict medical regulations and employs advanced encryption and access control measures to protect user data. We are committed to maintaining a secure environment where women can confidently share their health information.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Services;
