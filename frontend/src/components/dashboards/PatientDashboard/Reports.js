import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import {
    UserIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
} from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const Reports = () => {
    const { patientId } = useParams();
    const [report, setReport] = useState(null);

    const navigate = useNavigate();

    const handleViewReport = async (patientId) => {
        try {
            const response = await fetch(`/report`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate(`/patient-dashboard/prediction/${patientId}`);
            } else {
                console.error("Failed to fetch predictions");
            }
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/report`);
                if (response.ok) {
                    const data = await response.json();
                    setReport(data);
                } else {
                    console.error("Failed to fetch prediction report");
                }
            } catch (error) {
                console.error("Error fetching prediction report:", error);
            }
        };

        fetchReport();
    }, [patientId]);
    
    return (
        <DefaultLayout>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="w-full">
                            {report && report.patients ? (
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                    >
                                        <UserIcon className="h-10 w-10"/>
                                        {report.patients[1]} <br /> <br />
                                        Gender: {report.patients[3]}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                                        Age: {report.patients[4]}
                                </Typography>
                            ):(
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                >
                                    Nothing to see here
                                </Typography>
                            )}
                            </div>
                        </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left ">
                        <thead>
                            <tr>
                                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                    >
                                        Report
                                    </Typography>
                                </th>
                                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                    >
                                        Doctor / Medical practitioner
                                    </Typography>
                                </th>
                                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                                    >
                                        Date of Report
                                    </Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="w-max">
                                        <Button className="font-poppins bg-[#FF8585] text-white" variant="outlined" onClick={handleViewReport} style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '13px'}}>
                                            View Report
                                        </Button>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {report && report.practitioner ? (
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-poppins font-normal"
                                            >
                                                {report.practitioner.name}
                                            </Typography>
                                        </div>
                                    ):(
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-poppins font-normal"
                                            >
                                                No one yet
                                            </Typography>
                                    )}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {report && report.datecreated ? (
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-poppins font-normal"
                                            >
                                                {report.datecreated}
                                            </Typography>
                                        </div>
                                    ):(
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-poppins font-normal"
                                            >
                                                Not available
                                            </Typography>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </DefaultLayout>
    )
}

export default Reports;
