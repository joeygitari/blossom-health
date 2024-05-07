import React, { useState, useEffect } from 'react';
import Doctors from "../../../assets/images/Doctors-pana.svg";
import DefaultLayout from "../layout/DefaultLayout";
import {Link} from "react-router-dom";
import PatientLineChart from "../common/Charts/PatientLineChart";
import DiseasesBarChart from "../common/Charts/DiseasesBarChart";
import DoctorSkillsPieChart from "../common/Charts/DoctorSkillsPieChart";
import AppointmentsTable from "../common/Tables/AppointmentsTable";

const MedicDashboard = () => {
    const patientData = [
        {
            name: 'Jordan Nt',
            age: '41 years old',
            status: "Recovered"
        },
        {
            name: 'Thomas Jaja',
            age: '22 years old',
            status: "Recuperating"
        },
        {
            name: 'Angela Nurhayati',
            age: '61 years old',
            status: "Sick"
        },
    ];

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);
    

    return (
        <DefaultLayout>
            <div className="grid lg:grid-cols-5 gap-4">
                <div className="col-span-2 lg:col-span-3 rounded-sm border border-stroke bg-black cursor-pointer dark:bg-white">
                    <div className="grid lg:grid-cols-2 gap-4">
                    {currentUser && (
                        <div>
                            <h3 className="font-poppins font-bold text-white text-[30px] p-4 dark:text-black md:whitespace-nowrap lg:whitespace-normal">
                                Welcome back, Dr. {currentUser.name}!
                            </h3>

                            {/* <p className="font-poppins font-normal text-white text-[16px] p-4 dark:text-black md:whitespace-nowrap lg:whitespace-normal">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
                            </p>


                            <div className="p-4">
                                <div
                                    className="font-poppins bg-[#FF8585] w-[120px] h-[45px] font-normal rounded-md text-white text-[16px] text-center px-4 py-2 cursor-pointer">
                                    <a href="/register">Read More</a>
                                </div>
                            </div> */}
                        </div>
                    )}
                        <div className="hidden lg:block">
                            <img src={Doctors} alt="Doctors" className="w-full h-full ml-auto md:mt-[3.5rem]"/>
                        </div>
                    </div>
                </div>


                <div className="col-span-2 md:col-span-2">
                    <div className="mt-3 lg:mt-0 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-black w-full md:w-auto">
                        <div className="py-6 px-4 md:px-6 xl:px-7.5">
                            <h4 className="text-xl font-poppins font-semibold text-black dark:text-white">
                                Recent Patients
                            </h4>
                        </div>

                        {patientData.map((patient, key) => (
                            <div
                                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                                key={key}
                            >
                                <div className="col-span-3 flex items-center">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <p className="font-poppins text-sm text-black dark:text-white">
                                            {patient.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-2 hidden items-center sm:flex">
                                    <p className="font-poppins text-sm text-black dark:text-white">
                                        {patient.age}
                                    </p>
                                </div>

                                <div className="col-span-1 flex items-center">
                                    <p
                                        className={`font-poppins inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                            patient.status === 'Recovered'
                                                ? 'bg-success text-success'
                                                : patient.status === 'Recuperating'
                                                    ? 'bg-warning text-warning'
                                                    : patient.status === 'Sick'
                                                        ? 'bg-danger text-danger'
                                                        : 'bg-blue-500 text-blue-500'
                                        }`}
                                    >
                                        {patient.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-stroke md:px-6 xl:px-7.5 dark:border-strokedark">
                            <p className="mt-3 text-[16px] text-center font-poppins font-normal text-black dark:text-white">
                                <Link to="/medic-dashboard/patients">View all Patients</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 mt-[2rem] lg:mt-[3rem] gap-4 lg:gap-6 2xl:gap-7.5">
                <div className="col-span-2">
                    <PatientLineChart/>
                </div>

                <div className="col-span-2 lg:col-span-1 mt-[1rem] lg:mt-0">
                    <DiseasesBarChart/>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 mt-[2rem] lg:mt-[3rem] gap-4">
                <div className="col-span-2 lg:col-span-1">
                    <DoctorSkillsPieChart/>
                </div>

                <div className="col-span-2 mt-[1rem] lg:mt-0">
                    <AppointmentsTable/>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default MedicDashboard;
