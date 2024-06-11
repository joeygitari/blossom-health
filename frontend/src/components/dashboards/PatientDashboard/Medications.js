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
    Chip, Menu, MenuHandler, MenuList, MenuItem
} from "@material-tailwind/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Medications = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);
    const [medications, setMedications] = useState([]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleAddMedication = async () => {
        const newMedication = {
            medicationname: document.getElementById('medicationname').value,
            condition: document.getElementById('condition').value,
            medicationtype: document.getElementById('medicationtype').value,
            strengthunit: document.getElementById('strengthunit').value,
            strength: document.getElementById('strength').value,
            startdate: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
            enddate: selectedDate1 ? selectedDate1.toISOString().split('T')[0] : null,
            prescribedby: document.getElementById('prescribedby').value
        };

        try {
            const response = await fetch("/medications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMedication)
            });

            if (response.ok) {
                const data = await response.json();
                setMedications([...medications, { ...newMedication, medicationid: data.medicationid }]);
                setOpenModal(false);
                toast.success("Medication added successfully");
            } else {
                toast.error("Failed to add medication");
            }
        } catch (error) {
            toast.error("Error adding medication: " + error.message);
        }
    };

    const fetchMedications = async () => {
        try {
            const response = await fetch("/medications");
            if (response.ok) {
                const data = await response.json();
                setMedications(data);
            } else {
                console.error("Failed to fetch medications");
            }
        } catch (error) {
            console.error("Error fetching medications:", error);
        }
    };

    useEffect(() => {
        fetchMedications();
    }, []);

    const handleStatusChange = async (medicationId, newStatus) => {
        try {
            const response = await fetch(`/medications/${medicationId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Update the status in the UI
                const updatedMedications = medications.map(medication => {
                    if (medication.medicationid === medicationId) {
                        return { ...medication, status: newStatus };
                    }
                    return medication;
                });
                setMedications(updatedMedications);
                // toast.success("Status updated successfully");
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const getStatusChipProps = (status) => {
        switch (status) {
            case 'pending':
                return { color: 'orange', value: 'Pending' };
            case 'taking':
                return { color: 'green', value: 'Taking' };
            case 'stopped':
                return { color: 'red', value: 'Stopped' };
            default:
                return { color: 'gray', value: 'Unknown' };
        }
    };

    return (
        <DefaultLayout>
            <div>
                <div>
                    <Card>
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="grid lg:grid-cols-5 gap-75">
                                <div className="col-span-3">
                                    <Typography
                                        color="blue-gray"
                                        className="flex items-end justify-between font-poppins font-bold text-[#172048] leading-none opacity-70 mt-4 ml-4"
                                    >
                                        Medications
                                    </Typography>
                                </div>
                                <div className="col-span-2">
                                    <Button className="flex items-center bg-[#FF8585] text-white rounded-full" onClick={handleOpenModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                                            <path d="M5 12h14"/><path d="M12 5v14"/>
                                        </svg>
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
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                            >
                                                Medication name
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                            >
                                                Prescribed by
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                            >
                                                Start Date
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                            >
                                                End Date
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                            >
                                                Status
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medications.map((medication) => (
                                        <tr key={medication.medicationid}>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="20" 
                                                        height="20" 
                                                        viewBox="0 0 24 24" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="2" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        className="lucide lucide-pill"
                                                    >
                                                        <path 
                                                            d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"
                                                        />
                                                        <path 
                                                        d="m8.5 8.5 7 7"
                                                        />
                                                    </svg>
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal"
                                                >
                                                    {medication.medicationname}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal opacity-70 text-[12px]"
                                                >
                                                    {medication.medicationtype}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal opacity-70 text-[12px]"
                                                >
                                                    {medication.strength}{medication.strengthunit}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal"
                                                >
                                                    {medication.prescribedby}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal"
                                                >
                                                    {medication.startdate}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-poppins font-normal"
                                                >
                                                    {medication.enddate}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <div className="flex items-center">
                                                    <Menu>
                                                        <MenuHandler>
                                                            <Chip
                                                                {...getStatusChipProps(medication.status)}
                                                                className="cursor-pointer"
                                                                variant="ghost"
                                                            />
                                                        </MenuHandler>
                                                        <MenuList>
                                                            <MenuItem onClick={() => handleStatusChange(medication.medicationid, 'pending')}>
                                                                <Chip {...getStatusChipProps('pending')} className="cursor-pointer w-full" variant="ghost"/>
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleStatusChange(medication.medicationid, 'taking')}>
                                                                <Chip {...getStatusChipProps('taking')} className="cursor-pointer w-full" variant="ghost"/>
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleStatusChange(medication.medicationid, 'stopped')}>
                                                                <Chip {...getStatusChipProps('stopped')} className="cursor-pointer w-full" variant="ghost"/>
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Dialog open={openModal} handler={setOpenModal}>
                <DialogHeader className="font-poppins">Add medication</DialogHeader>
                <DialogBody className="font-poppins">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Medication</label>
                        <input
                            id="medicationname"
                            name="medicationname"
                            className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]"
                            label=""
                            placeholder="Enter medication name"
                            autoComplete="off"
                        />
                    </div>
                    <br />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Condition</label>
                        <input
                            id="condition"
                            name="condition"
                            className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]"
                            label=""
                            placeholder="For which condition"
                            autoComplete="off"
                        />
                    </div>
                    <br />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                            autoComplete="off"
                            name="medicationtype"
                            id="medicationtype"
                        >
                            <option value="">-</option>
                            <option value="tablet">tablet</option>
                            <option value="capsule">capsule</option>
                            <option value="liquid">liquid</option>
                            <option value="injection">injection</option>
                            <option value="ointment">ointment</option>
                            <option value="drops">drops</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className="flex mt-4 space-x-4">
                        <div className="w-1/4">
                            <select
                                className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                                autoComplete="off"
                                name="strengthunit"
                                id="strengthunit"
                            >
                                <option value="">-</option>
                                <option value="mg">mg</option>
                                <option value="mcg">mcg</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                        <div className="w-3/4">
                            <input
                                id="strength"
                                name="strength"
                                className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]"
                                label=""
                                type="number"
                                placeholder="Strength"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="flex mt-4 space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="w-64 mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Select start date"
                                autoComplete="off"
                                name="startdate"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <DatePicker
                                selected={selectedDate1}
                                onChange={(date) => setSelectedDate1(date)}
                                className="w-64 mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px] font-semibold"
                                dateFormat="MMMM d, yyyy"                                placeholderText="Select end date"
                                autoComplete="off"
                                name="enddate"
                            />
                        </div>
                    </div>
                    <br />
                    <div className="font-poppins font-semibold">
                        <label className="block text-sm font-medium text-gray-700">Prescribed by</label>
                        <input
                            id="prescribedby"
                            name="prescribedby"
                            className="w-full mt-2 p-2 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-[#FF8585] text-[13px]"
                            label=""
                            placeholder="Enter doctor's name"
                            autoComplete="off"
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="font-poppins">
                    <Button variant="text" color="red" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="gradient" className="bg-[#FF8585]" onClick={handleAddMedication}>
                        Add
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </DefaultLayout>
    )
}

export default Medications;
