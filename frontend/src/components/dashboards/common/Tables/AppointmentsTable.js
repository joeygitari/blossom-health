import React from 'react';

const AppointmentsTable = () => {
    const appointmentsData = [
        {
            name: 'Jordan Nt',
            email: 'jordan-nt@gmail.com',
            phone: 320456589,
            status: 'Start'

        },
        {
            name: 'Thomas Jaja',
            email: 'thomas-jaja@gmail.com',
            phone: 136121390,
            status: 'Re-Schedule'

        },
        {
            name: 'Angela Nurhayati',
            email: 'angela-nurhayati@gmail.com',
            phone: 150456589,
            status: 'Cancelled'
        },
        {
            name: 'Garrett Winters',
            email: 'garret-winters@gmail.com',
            phone: 240305060,
            status: 'Pending'
        },
    ];

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-black">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-poppins font-semibold text-black dark:text-white">
                    Recent Appointments
                </h4>
            </div>

            <div
                className="font-poppins grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Patient Name</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-medium">Email</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Phone</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Status</p>
                </div>
            </div>

            {appointmentsData.map((patient, key) => (
                <div
                    className="font-poppins grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={key}
                >
                    <div className=" col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <p className="text-sm text-black dark:text-white">
                                {patient.name}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {patient.email}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            +{patient.phone}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center mb-3">
                        <p
                            className={`font-poppins inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                patient.status === 'Start'
                                    ? 'bg-success text-success'
                                    : patient.status === 'Re-Schedule'
                                        ? 'bg-warning text-warning'
                                        : patient.status === 'Cancelled'
                                            ? 'bg-danger text-danger'
                                            : 'bg-blue-500 text-blue-500'
                            }`}
                        >
                            {patient.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AppointmentsTable;
