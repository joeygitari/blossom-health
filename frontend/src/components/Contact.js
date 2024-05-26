import React, { useState, useRef } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import Line5 from "../assets/images/Line5.png";
import Icon from "../assets/images/Icon.png";
import { Input, Textarea, Button, Alert } from "@material-tailwind/react";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com';


const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      }
      const [formDetails, setFormDetails] = useState(formInitialDetails);
      const [buttonText, setButtonText] = useState('Send');
      const [showSuccessAlert, setShowSuccessAlert] = useState(false);
      const [showDangerAlert, setShowDangerAlert] = useState(false);
    
      const form = useRef();
    
    const onFormUpdate = (category, value) => {
        setFormDetails({
          ...formDetails,
          [category]: value
        })
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formDetails)
    
        setFormDetails(formInitialDetails);
    
        emailjs.sendForm("service_x6iazpg","template_fl5ge16",form.current, "ApvPEcQ8qrd4VM4HZ")
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
      };

      const handleButtonClick = () => {
        if (formDetails.firstName === '' || formDetails.lastName === '' || formDetails.email === '' || formDetails.phone === ''|| formDetails.message === '') {
          setShowDangerAlert(true);
          setTimeout(() => {
            setShowDangerAlert(false);
          }, 3000);
        } else {
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 3000);
        }
      };
    return (
        <>
            <Header/>
            <div className="container mx-auto bg-white md:p-0 p-6">
                <div className="grid md:grid-cols- 1gap-4">
                    <div className="md:mt-[3.5rem]">
                        <p className="font-poppins font-bold text-[#172048] text-[29px] md:text-[58px] text-center">
                            Contact <span className="text-[#F70000]">Us</span> &nbsp;
                            <img className="mx-auto md:inline md:h-[64px] w-[64px] sm:h-full" src={Icon} alt="Icon"/>
                        </p>
                        <img className="mx-auto mt-2 md:mt-4" alt="Line5" src={Line5}/>
                        <br />
                            <div className="flex flex-wrap justify-center items-center">
                                <div className="w-full md:w-1/2">
                                    <TrackVisibility>
                                        {({ isVisible }) =>
                                            <div className={`${isVisible ? "animate__animated animate__fadeIn" : ""}`}>
                                                {/* <h2 className="font-poppins text-[#172048] text-3xl font-bold mb-4">Get In Touch</h2> */}
                                                <form ref={form} onSubmit={handleSubmit}>
                                                    <div className="flex flex-wrap -mx-2">
                                                        <div className="w-full sm:w-1/2 px-2 mb-4 font-poppins">
                                                            <label className="block text-sm font-medium text-[#172048]">First name</label>
                                                            <input className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]" type="text" name="firstName" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} autoComplete="off"/>
                                                        </div>
                                                        <div className="w-full sm:w-1/2 px-2 mb-4 font-poppins">
                                                            <label className="block text-sm font-medium text-[#172048]">Last name</label>
                                                            <input className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]" type="text" name="lastName" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} autoComplete="off"/>
                                                        </div>
                                                        <div className="w-full sm:w-1/2 px-2 mb-4 font-poppins">
                                                            <label className="block text-sm font-medium text-[#172048]">Email</label>
                                                            <input className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]" type="email" name="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} autoComplete="off"/>
                                                        </div>
                                                        <div className="w-full sm:w-1/2 px-2 mb-4 font-poppins">
                                                            <label className="block text-sm font-medium text-[#172048]">Phone number</label>
                                                            <input className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]" type="tel" name="phone" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} autoComplete="off"/>
                                                        </div>
                                                        <div className="w-full px-2 mb-4 font-poppins">
                                                            <label className="block text-sm font-medium text-[#172048]">Message</label>
                                                            <textarea className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]" rows="6" name="message" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} autoComplete="off"/>
                                                        </div>
                                                        <div className="w-full px-2 font-poppins">
                                                            <Button variant="gradient" className="bg-[#FF8585]" type="submit" onClick={handleButtonClick}>
                                                                <span>{buttonText}</span>
                                                            </Button>
                                                        </div>
                                                        {showSuccessAlert && (
                                                            <div className="w-full mt-4 px-2">
                                                            <Alert color="green" variant="ghost" className="text-center">
                                                                <strong>Success!</strong> Message sent. I will get back to you as soon as possible. 🩷
                                                            </Alert>
                                                            </div>
                                                        )}
                                                        {showDangerAlert && (
                                                            <div className="w-full mt-4 px-2">
                                                            <Alert color="red" variant="ghost" className="text-center">
                                                                <strong>Error!</strong> Please fill in all the fields.
                                                            </Alert>
                                                            </div>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        }
                                    </TrackVisibility>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Contact;