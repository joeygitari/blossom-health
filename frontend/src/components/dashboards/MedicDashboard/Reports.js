import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";

const Reports = () => {
    const [patients, setPatients] = useState([]);
    const TABLE_HEAD = ["Patient", "Location", "Prediction", "Recommendation"];
    
    useEffect(() => {
        fetchPatients();
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

    const handleViewReport = async (patientId) => {
        try {
            const response = await fetch(`/predict/${patientId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Handle the prediction data as needed
            } else {
                console.error("Failed to fetch predictions");
            }
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };
    return (
        <DefaultLayout>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left ">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                        <th
                            key={index}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                            >
                            {head}{" "}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map(
                        (patient, index) => {
                        const isLast = index === patients.length - 1;
                        const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";
        
                        return (
                            <tr key={index}>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-poppins font-normal"
                                    >
                                    {patient[1]}
                                    </Typography>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-poppins font-normal opacity-70"
                                    >
                                    {patient[3]}, {patient[4]}
                                    </Typography>
                                </div>
                                </div>
                            </td>
                            <td className={classes}>
                                <div className="flex flex-col">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-poppins font-normal"
                                >
                                    {patient[5]}
                                </Typography>
                                </div>
                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Button className="font-poppins bg-[#FF8585] text-white" variant="outlined" onClick={() => handleViewReport(patient[0])} style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '13px' }}>
                                        View prediction report
                                    </Button>
                                </div>
                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Button className="font-poppins bg-[#FF8585] text-white" variant="outlined" style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '13px'}}>
                                    Add recommendation
                                    </Button>
                                </div>
                            </td>
                            </tr>
                        );
                        },
                    )}
                    </tbody>
                </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-poppins font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                    Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                    Next
                    </Button>
                </div>
                </CardFooter>
            </Card>
        </DefaultLayout>
    )
}

export default Reports;