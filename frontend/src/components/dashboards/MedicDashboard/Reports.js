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
    Dialog, 
    DialogHeader, 
    DialogBody, 
    DialogFooter 
} from "@material-tailwind/react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Reports = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const TABLE_HEAD = ["Patient", "Location", "Prediction", "Recommendation"];
    const [openModal, setOpenModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [recommendation, setRecommendation] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        fetchPatients();
    }, []);
    
    const fetchPatients = async () => {
        try {
          const response = await fetch("/practitioners_patients");
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
                console.log(data);
                navigate(`/medic-dashboard/prediction/${patientId}`);
            } else {
                console.error("Failed to fetch predictions");
            }
        } catch (error) {
            toast.error("Error fetching predictions:", error);
        }
    };

    const handleOpenModal = (patientId) => {
        setSelectedPatientId(patientId);
        setOpenModal(true);
    };

    // const handleAddRecommendation = () => {
    //     console.log(`Recommendation for patient ${selectedPatientId}: ${recommendation}`);
    //     // Add your code to handle the recommendation submission
    //     setOpenModal(false);
    //     setRecommendation("");
    // };
    const handleAddRecommendation = async () => {
        try {
            const response = await fetch('/submit-recommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientid: selectedPatientId,
                    recommendation: recommendation
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                // console.log('Recommendation added successfully:', data);
                toast.success(data.message, {
                    onClose: () => {
                        setRecommendation('');
                    }
                });
                
                if (typeof setOpenModal === 'function') {
                    setOpenModal(false); // Close modal only if setOpenModal is defined
                }
                
            } else {
                console.error('Failed to add recommendation');
                toast.error('Failed to add recommendation');
            }
        } catch (error) {
            console.error('Error adding recommendation:', error);
            toast.error('Error adding recommendation');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient[5].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DefaultLayout>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            onChange={handleSearch}
                            value={searchTerm}
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
                    {filteredPatients.map(
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
                                     {patient[4] || "unknown"}, {patient[3] || "unknown"}
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
                                    {patient[5] || "unknown"}
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
                                    <Button className="font-poppins bg-[#FF8585] text-white" variant="outlined" style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '13px'}} onClick={() => handleOpenModal(patient[0])}>
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
            </Card>
            <Dialog open={openModal} handler={setOpenModal}>
                <DialogHeader className="font-poppins">Add Recommendation</DialogHeader>
                <DialogBody className="font-poppins">
                    <Input
                        label="Recommendation"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                    />
                </DialogBody>
                <DialogFooter className="font-poppins">
                    <Button variant="text" color="red" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="gradient" className="bg-[#FF8585]" onClick={handleAddRecommendation}>
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

export default Reports;