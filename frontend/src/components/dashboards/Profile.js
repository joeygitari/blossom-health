import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Button,
    Dialog, 
    DialogHeader, 
    DialogBody, 
    DialogFooter
} from "@material-tailwind/react";
import DefaultLayout from "./layout/DefaultLayout";

const Profile = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    // console.log("Current User", currentUser)

    return (
        <DefaultLayout>
            <Card>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="grid lg:grid-cols-5 gap-75">
                        <div className="col-span-3">
                            <Typography
                                color="blue-gray"
                                className="flex items-end justify-between font-poppins font-bold text-[#172048] text-[20px] leading-none opacity-70 mt-4"
                            >
                                Your Details
                            </Typography>
                        </div>
                        <div className="col-span-2">
                            <Button className="flex items-center bg-[#FF8585] text-white rounded-full"  onClick={handleOpenModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <span className="ml-2">Edit</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody  className="font-poppins">
                {currentUser && (
                    <div className="grid gap-4">
                        <div>
                            <Typography
                                // variant="small"
                                color="blue-gray"
                                className="font-poppins font-semibold mb-2"
                            >
                                Name: <span className="font-poppins font-normal">{currentUser.name}</span>
                            </Typography> 
                        </div>
                        <div>
                            <Typography
                                // variant="small"
                                color="blue-gray"
                                className="font-poppins font-semibold mb-2"
                            >
                                Email:  <span className="font-poppins font-normal">{currentUser.email}</span>
                            </Typography>
                        </div>
                        {currentUser && currentUser.role === 'practitioner' ? (
                            <div>
                                <Typography
                                    // variant="small"
                                    color="blue-gray"
                                    className="font-poppins font-semibold mb-2"
                                >
                                    Specialization: <span className="font-poppins font-normal">{currentUser.specialization}</span>
                                </Typography>
                            </div>
                        ):(
                            <>
                            <div>
                                <Typography
                                    // variant="small"
                                    color="blue-gray"
                                    className="font-poppins font-semibold mb-2"
                                >
                                    Age: <span className="font-poppins font-normal">{currentUser.age}</span>
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    // variant="small"
                                    color="blue-gray"
                                    className="font-poppins font-semibold mb-2"
                                >
                                    Gender: <span className="font-poppins font-normal">{currentUser.gender}</span>
                                </Typography>
                            </div>
                            </>
                        )}
                        <div>
                            <Typography
                                // variant="small"
                                color="blue-gray"
                                className="font-poppins font-semibold mb-2"
                            >
                                Location:  <span className="font-poppins font-normal">{currentUser.location}</span>
                            </Typography>
                        </div>
                    </div>
                )}
                </CardBody>
            </Card>
            <Dialog open={openModal} handler={setOpenModal}>
                <DialogHeader className="font-poppins text-[#172048] text-center">Edit Profile</DialogHeader>
                <DialogBody className="font-poppins">
                    <div>
                        <label htmlFor="fullNames" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="fullNames" 
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[13px] rounded-[12px] w-full p-3"
                            name="fullNames" 
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="email" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[13px] rounded-[12px] w-full p-3"
                            name="email"
                        />
                    </div>
                    <br />
                    {currentUser && currentUser.role === 'practitioner' ? (
                    <>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                            Specialization
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[13px] rounded-[12px] w-full p-3"
                            name="specialization"
                            autoComplete="off"
                        />
                    </div>
                    <br />
                    </>
                    ):(
                    <>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[13px] rounded-[12px] w-full p-3"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="text" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                            Gender
                        </label>
                        <select
                            type="text"
                            id="gender"
                            name="gender"
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[13px] rounded-[12px] w-full p-3"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non binary</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    </>
                    )}
                    <br />
                    <div>
                        <label htmlFor="text" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                            Location
                        </label>
                        <input 
                            type="text" 
                            id="text" 
                            autoComplete="off"
                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                            name="location"
                        />
                    </div>
                    <br />
                </DialogBody>
                <DialogFooter className="font-poppins">
                    <Button variant="text" color="red" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="gradient" className="bg-[#FF8585]">
                        Update
                    </Button>
                </DialogFooter>
            </Dialog>
        </DefaultLayout>
    )
}

export default Profile;