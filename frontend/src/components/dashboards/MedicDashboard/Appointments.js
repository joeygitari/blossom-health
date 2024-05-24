import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Button,
    Dialog, 
    DialogHeader, 
    DialogBody, 
    DialogFooter,
} from "@material-tailwind/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Appointments = () => {
    const [openModal, setOpenModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedVisit, setSelectedVisit] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');

    const [patients, setPatients] = useState([]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    useEffect(() => {
        const calendarTitle = document.querySelector('.fc-toolbar-title');
        const calendarButtons = document.querySelectorAll('.fc-button');
        const dayToday = document.querySelector('.fc-day-today');
        if (calendarTitle) {
            calendarTitle.style.fontFamily = 'Poppins, sans-serif';
            calendarTitle.style.color = '#FF8585';
            calendarTitle.style.fontWeight = 'bold';
            calendarTitle.style.fontSize = '18px';
        }

        if (calendarButtons) {
            calendarButtons.forEach(button => {
                button.style.fontFamily = 'Poppins, sans-serif';
                button.style.color = 'white';
                button.style.backgroundColor = '#172048';
                button.style.fontWeight = 'bold';
            });
        }

        if (dayToday){
            dayToday.style.backgroundColor = '#FF8585';
            dayToday.style.color = 'white';
        }
    }, []);

    const fetchPatients = async () => {
        try {
          const response = await fetch("/patients");
          if (response.ok) {
            const data = await response.json();
            setPatients(data);
            // console.log(patients);
          } else {
            console.error("Failed to fetch patients");
          }
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);
    
    return (
        <DefaultLayout> 
        <div className="grid lg:grid-cols-5 gap-4">
            <div className="col-span-2">
            <Card className="h-full w-full">
                <CardBody>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        // height="100%"
                        // className="text-xs font-poppins"
                        dayHeaderClassNames="bg-gray-200 text-[#FF8585] font-poppins"
                        eventClassNames="bg-[#FF8585] text-white font-poppins"
                        headerToolbar={{
                            right: 'prev,next',
                            left: 'title',
                        }}
                    />
                </CardBody>
            </Card>
            </div>
            <div className="col-span-3">
                <Card>
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="grid lg:grid-cols-5 gap-40">
                            <div className="col-span-3">
                                <Typography
                                        color="blue-gray"
                                        className="flex items-end justify-between font-poppins font-bold text-[#172048] leading-none opacity-70 mt-4"
                                >
                                        Appointments
                                </Typography>
                            </div>
                            <div className="col-span-2">
                                <Button className="flex items-center bg-[#FF8585] text-white rounded-full" onClick={handleOpenModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg> 
                                    <span className="ml-2">Add</span>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <table className="mt-4 w-full min-w-max table-auto text-left table-striped">
                            <thead>
                                <tr>
                                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                        >
                                            Patient name
                                        </Typography>
                                    </th>
                                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                        >
                                            Date
                                        </Typography>
                                    </th>
                                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                        >
                                            Time
                                        </Typography>
                                    </th>
                                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                        >
                                            Location
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-poppins font-normal"
                                        >
                                            ** patient
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-poppins font-normal"
                                        >
                                            ** date
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-poppins font-normal"
                                        >
                                            ** time
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-poppins font-normal"
                                        >
                                            ** location
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </div>
        <Dialog open={openModal} handler={setOpenModal}>
            <DialogHeader className="font-poppins">Add Appointment</DialogHeader>
            <DialogBody className="font-poppins">
            <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                >
                    <option value="">Select a patient</option>
                    {patients.map(patient => (
                        <option key={patient[0]} value={patient[0]}>
                            {patient[1]}
                        </option>
                    ))}
                        </select>
                    </div>
                <div className="flex mt-4 space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Select Date</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="w-64 mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a date"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Select Time</label>
                        <DatePicker
                            selected={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className="w-64 mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                            placeholderText="Select a time"
                        />
                    </div>
                </div>
                <br />
                <div className="font-poppins font-semibold">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]"
                        label=""
                        placeholder="Enter location"
                    />
                </div>

                <br />
                <div> 
                    <label className="block text-sm font-medium text-gray-700">Visit Type</label>
                    <select
                        value={selectedVisit}
                        onChange={(e) => setSelectedVisit(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                    >
                        <option value="">Select visit type</option>
                        <option value="Checkup">Checkup</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Procedure">Procedure</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <br />
                <div> 
                    <label className="block text-sm font-medium text-gray-700">Online/In-person?</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                    >
                        <option value="">Select</option>
                        <option value="Online">Online</option>
                        <option value="In-Person">In-Person</option>
                    </select>
                </div>
            </DialogBody>
            <DialogFooter className="font-poppins">
                <Button variant="text" color="red" onClick={() => setOpenModal(false)}>
                    Cancel
                </Button>
                <Button variant="gradient" className="bg-[#FF8585]">
                    Add
                </Button>
            </DialogFooter>
        </Dialog>
        </DefaultLayout>
    )
}

export default Appointments;
