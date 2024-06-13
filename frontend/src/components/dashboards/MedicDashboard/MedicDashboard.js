import React, { useState, useEffect } from 'react';
import Doctors from "../../../assets/images/Doctors-pana.svg";
import DefaultLayout from "../layout/DefaultLayout";
import {Link} from "react-router-dom";
import PatientLineChart from "../common/Charts/SymptomsLineChart";
import DiseasesBarChart from '../common/Charts/DiseasesBarChart';
const MedicDashboard = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
          const response = await fetch("/practitioners_patients");
          if (response.ok) {
            const data = await response.json();
            setPatients(data);
          } else {
            console.error("Failed to fetch patients");
          }
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
    };

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
                            <h3 className="font-poppins font-bold text-white text-[28px] p-4 dark:text-black md:whitespace-nowrap lg:whitespace-normal">
                                Welcome Dr. {currentUser.name}!
                            </h3>
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

                        {patients.slice(0, 5).map((patient, key) => (
                            <div
                                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                                key={key}
                            >
                                <div className="col-span-3 flex items-center">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <p className="font-poppins text-sm text-black dark:text-white">
                                            {patient[1]}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-2 hidden items-center sm:flex">
                                    <p className="font-poppins text-sm text-black dark:text-white">
                                        {patient[3]}
                                    </p>
                                </div>

                                <div className="col-span-1 hidden items-center sm:flex">
                                    <p className="font-poppins text-sm text-black dark:text-white">
                                        {patient[4]} yrs.
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-stroke md:px-6 xl:px-7.5 dark:border-strokedark">
                            <p className="mt-3 mb-3 text-[16px] text-center font-poppins font-normal text-black dark:text-white">
                                <Link to="/medic-dashboard/patients">View all Patients</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 mt-[2rem] lg:mt-[3rem] gap-4 lg:gap-6 2xl:gap-7.5">
                <div className="col-span-2">
                    <PatientLineChart/>
                </div>

                <div className="col-span-2">
                    <DiseasesBarChart/>

                </div>
            </div>

            {/* <div className="grid lg:grid-cols-1 mt-[2rem] lg:mt-[3rem] gap-4">
                <div className="col-span-1 mt-[1rem] lg:mt-0">
                </div>
            </div> */}
        </DefaultLayout>
    )
}

export default MedicDashboard;
