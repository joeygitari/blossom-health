import React, { useState, useEffect } from "react";
import Select from 'react-select';
import SymptomsImg from "../../../assets/images/SymptomsImg.png";
import {Card} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Symptoms = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const response = await fetch('/symptoms');
            if (!response.ok) {
                throw new Error('Failed to fetch symptoms');
            }
            const data = await response.json();
            const symptomOptions = data.map(symptom => ({
                value: symptom[0],
                label: symptom[1]
            }));
            setSymptoms(symptomOptions);
        } catch (error) {
            console.error('Error fetching symptoms:', error);
        }
    };

    const handleSymptomChange = (selectedOptions) => {
        setSelectedSymptoms(selectedOptions);
    };

    const customStyles = {
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50
        })
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/submit-symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selected_symptoms: selectedSymptoms.map(symptom => symptom.value) })
            });
            if (!response.ok) {
                throw new Error('Failed to submit symptoms');
            }
            // Handle success
            toast.success('Symptoms submitted successfully');
        } catch (error) {
            console.error("Error:", error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <DefaultLayout>
            <div className="grid md:grid-cols-1">
                <p className="font-poppins font-bold text-[48px] text-[#172048] dark:text-white mt-[1rem]">Select your current
                        symptoms</p>

                <div className="mt-[2rem] font-poppins dark:text-[#172048]">
                    <Select
                        isMulti
                        options={symptoms}
                        styles={customStyles}
                        onChange={handleSymptomChange}
                    />
                </div>

                <div className="grid md:grid-cols-2">
                    <div className="mt-[2rem]">
                        <Card className="mt-[1rem]">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table
                                                className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:text-[#172048]">
                                                    <thead
                                                    className="border-b border-neutral-200 font-medium">
                                                <tr className="font-poppins font-medium">
                                                    <th
                                                        scope="col"
                                                        className="border-e border-neutral-200 px-6 py-4">
                                                        #
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="border-e border-neutral-200 px-6 py-4">
                                                        Symptom
                                                    </th>
                                                </tr>
                                                </thead>
                                                 <tbody>
                                                    {selectedSymptoms.map((symptom, index) => (
                                                            <tr key={index} className="font-poppins font-medium border-b border-neutral-200">
                                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium">{index + 1}</td>
                                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">{symptom.label}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={handleSubmit}
                                className="font-poppins bg-[#FF8585] mx-auto mt-4 mb-6 w-[347px] h-[50px] font-semibold rounded-full text-white text-[16px] text-center px-4 py-3 cursor-pointer">
                                Submit symptoms
                            </div>
                        </Card>
                    </div>
                    <div>
                        <img className="mx-auto" alt="SymptomsImg" src={SymptomsImg}/>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme="colored"
                transition={Slide}
                style={{
                    color: '#FF8585'
                }}
            />
        </DefaultLayout>
    )
}

export default Symptoms;
