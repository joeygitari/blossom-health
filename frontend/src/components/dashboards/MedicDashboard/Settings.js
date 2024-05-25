import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Button,
    CardFooter,
} from "@material-tailwind/react";
import DefaultLayout from "../layout/DefaultLayout";
import { ToastContainer, toast, Slide } from "react-toastify";

const Settings = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async () => {
        try {
            const response = await fetch('/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
                credentials: 'include'
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, {
                    onClose: () => {
                        setOldPassword("");
                        setNewPassword("");
                    }
                });
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <DefaultLayout>
            <div className="flex justify-center items-center">
                <Card className="w-full max-w-lg">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="grid lg:grid-cols-5 gap-40">
                            <div className="col-span-3">
                                <Typography
                                    color="blue-gray"
                                    className="flex items-end justify-between font-poppins font-bold text-[#172048] leading-none opacity-70 mt-4"
                                >
                                    Change Password
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="font-poppins">
                        <div className="font-poppins font-semibold">
                            <label className="block text-sm font-medium text-gray-700">Old password</label>
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <br />
                        <div className="font-poppins font-semibold">
                            <label className="block text-sm font-medium text-gray-700">New password</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button variant="gradient" className="bg-[#FF8585]" onClick={handleChangePassword}>Change Password</Button>
                    </CardFooter>
                </Card>
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
            </div>
        </DefaultLayout>
    );
};

export default Settings;
