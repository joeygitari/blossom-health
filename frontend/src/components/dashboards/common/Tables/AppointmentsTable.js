import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AppointmentsTable = () => {
    const [appointments, setAppointments] = useState([]);
    const [practitioners, setPractitioners] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("/patient-appointments");
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else {
                console.error("Failed to fetch appointments");
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };
    
    const fetchPractitioners = async () => {
        try {
          const response = await fetch("/practitioners");
          if (response.ok) {
            const data = await response.json();
            setPractitioners(data);
            // console.log(patients);
          } else {
            console.error("Failed to fetch practitioners");
          }
        } catch (error) {
          console.error("Error fetching practitioners:", error);
        }
    };

    useEffect(() => {
        fetchPractitioners();
        fetchAppointments();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-black">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-poppins font-semibold text-black dark:text-white">
                    Appointments
                </h4>
            </div>

            <div
                className="font-poppins grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Doctor</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-medium">Date</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Time</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Status</p>
                </div>
            </div>

            {appointments.slice(0, 5).map((appointment, key) => (
                <div
                    className="font-poppins grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={key}
                >
                    <div className=" col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <p className="text-sm text-black dark:text-white">
                                {practitioners.find(practitioner => practitioner[0] === appointment.practitionerid)?.[1] || "Unknown"}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {appointment.datescheduled}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                        {appointment.timescheduled}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                        {appointment.location}
                        </p>
                    </div>
                </div>
            ))}
            <div className="border-t border-stroke md:px-6 xl:px-7.5 dark:border-strokedark">
                <p className="mt-3 mb-3 text-[14px] text-center font-poppins font-semibold text-[#FF8585] dark:text-white">
                    <Link to="/patient-dashboard/appointments">View all Appointments</Link>
                </p>
            </div>
        </div>
    )
}

export default AppointmentsTable;
