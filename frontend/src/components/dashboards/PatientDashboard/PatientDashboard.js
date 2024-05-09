import React, { useState, useEffect } from 'react';
import Patients from "../../../assets/images/Patient.svg";
import DefaultLayout from "../layout/DefaultLayout";
import PatientLineChart from "../common/Charts/PatientLineChart";
import DiseasesBarChart from "../common/Charts/DiseasesBarChart";
import DoctorSkillsPieChart from "../common/Charts/DoctorSkillsPieChart";
import AppointmentsTable from "../common/Tables/AppointmentsTable";

const PatientDashboard = () => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);
    

    return (
        <DefaultLayout>
            <div className="grid lg:grid-cols-1 gap-4">
                <div className="lg:col-span-3 rounded-sm border border-stroke bg-black cursor-pointer dark:bg-white">
                    <div className="grid lg:grid-cols-2 gap-7">
                        {currentUser && (
                            <div>
                                <h3 className="font-poppins font-bold text-white text-[30px] p-4 dark:text-black md:whitespace-nowrap lg:whitespace-normal">
                                    Welcome back, {currentUser.name}!
                                </h3>
                                <p className="font-poppins font-normal text-white text-[16px] p-4 dark:text-black md:whitespace-nowrap lg:whitespace-normal">
                                    What do you need help with today?
                                </p>
                            </div>
                        )}
                        <div className="hidden lg:block">
                            <img src={Patients} alt="Patients" className="w-[280px] h-[280px] ml-auto md:mt-[2rem]"/>
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

export default PatientDashboard;
