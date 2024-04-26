import React, { useState, useEffect } from "react";
import Logo from "../assets/images/logo.png";
import Select from 'react-select';
import SymptomsImg from "../assets/images/SymptomsImg.png";
import {Card} from "@material-tailwind/react";

import {Link} from "react-router-dom";
const Symptoms = () => {
    
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            // console.log(data); 
            const symptomOptions = data.map(symptom => ({
                value: symptom[0],
                label: symptom[1]
            }));
            // console.log(symptomOptions);
            setSymptoms(symptomOptions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching symptoms:', error);
            setError('Failed to fetch symptoms');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSymptomChange = (selectedOptions) => {
        setSelectedSymptoms(selectedOptions);
    };
    // const symptomOptions = symptoms.map(symptom => ({
    //     value: symptom.symptomid,
    //     label: symptom.symptomname
    // }));

    const customStyles = {
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50
        })
    };

    return (
        <section className="bg-[#F7FAFC]">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-1">
                    <Link to="/" className="flex py-5">
                        <img className="flex items-center space-x-3 rtl:space-x-reverse h-16 cursor-pointer"
                             alt="Logo"
                             src={Logo}/>
                        <p className="font-bold font-poppins py-4 px-3 text-[20px]">BlossomHealth</p>
                    </Link>
                    <p className="font-poppins font-bold text-[48px] text-[#172048] mt-[1rem]">Select your current
                        symptoms</p>

                    <div className="mt-[2rem] font-poppins">
                        <Select
                            isMulti
                            options={symptoms}
                            styles={customStyles}
                            onChange={handleSymptomChange}
                        />
                    </div>

                    <div className="grid md:grid-cols-2">
                        <div className="mt-[2rem]">
                            <p className="font-poppins font-bold text-[24px] text-[#172048]">Selected Symptoms</p>

                            <Card className="mt-[1rem]">
                                {/*<ul className="px-10 py-5 font-poppins font-medium text-[18px] text-black">*/}
                                {/*    <li>Headache</li>*/}
                                {/*    <li>Weight Gain</li>*/}
                                {/*    <li>Abdominal Cramps</li>*/}
                                {/*    <li>Hot Flushes</li>*/}
                                {/*</ul>*/}

                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table
                                                    className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface">
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
                                                    {/* <tbody>
                                                    <tr className="font-poppins font-medium border-b border-neutral-200 ">
                                                        <td
                                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium">
                                                            1
                                                        </td>
                                                        <td
                                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                            Headache
                                                        </td>
                                                    </tr>
                                                    <tr className="font-poppins font-medium border-b border-neutral-200">
                                                        <td
                                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium">
                                                            2
                                                        </td>
                                                        <td
                                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                            Weight Gain
                                                        </td>
                                                    </tr>
                                                    <tr className="font-poppins font-medium border-b border-neutral-200 dark:border-white/10">
                                                        <td
                                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium">
                                                            3
                                                        </td>
                                                        <td
                                                            colSpan="2"
                                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                            Abdominal Pains
                                                        </td>
                                                    </tr>
                                                    </tbody> */}
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
            </div>
        </section>
    )
}

export default Symptoms;
