import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Logo from '../../../assets/images/logo.png';
import { useParams } from "react-router-dom";
import { DocumentIcon } from "@heroicons/react/24/solid";
import html2pdf from 'html2pdf.js';

const Prediction = () => {
    const { patientId } = useParams();
    const [report, setReport] = useState(null);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/predict/${patientId}`);
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

        const fetchPatients = async () => {
            try {
                const response = await fetch(`/patients`);
                if (response.ok) {
                    const data = await response.json();
                    const selectedPatient = data.find(p => p[0] === parseInt(patientId, 10));
                    setPatient(selectedPatient);
                } else {
                    console.error("Failed to fetch patients");
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchReport();
        fetchPatients();
    }, [patientId]);

    const exportToPDF = () => {
        const element = document.getElementById('report-content'); // Assuming you have a container with id 'payslip-container'

        html2pdf()
            .from(element)
            .save('prediction-report.pdf');
    };

    return (
        <DefaultLayout>
            <div className="flex items-center mt-5 ml-5">
                <div className="absolute top-22 right-8 mb-5 mr-5 flex items-center">
                    <button className="font-bold font-poppins py-4 text-[14px] text-black flex items-center space-x-2" onClick={exportToPDF}>
                        <DocumentIcon className="h-5 w-5" /> 
                        <span>Export to PDF</span>
                    </button>
                </div>
            </div>
            <Card id="report-content">
                <div className="flex items-center mt-5 ml-5">
                    <img className="h-16" alt="Logo" src={Logo}/>
                    <p className="font-bold font-poppins py-4 text-[20px] text-black ml-2">BlossomHealth</p> 
                </div>
                <CardBody>
                    <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-center">
                        <h4 className="text-xl font-poppins font-semibold underline text-black">
                            PREDICTION REPORT
                        </h4>
                    </div>
                    <br />
                    {patient ? (
                        <div className="mb-6 text-black">
                            <Typography variant="h6" className="mb-1 font-poppins font-semibold italic">
                                <strong>Patient information</strong>
                            </Typography>
                            <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                <strong>Name:</strong> {patient[1]}
                            </Typography>
                            <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                <strong>Gender:</strong> {patient[3]}
                            </Typography>
                            <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                <strong>Age:</strong> {patient[4]}
                            </Typography>
                            <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                <strong>Location:</strong> {patient[5]}
                            </Typography>

                            <br />
                            <br />

                            {report && report.symptoms ? (
                                <>
                                    <Typography variant="h6" className="mb-2 font-poppins font-semibold italic">
                                        <strong>Patient Symptoms:</strong>
                                    </Typography>
                                    <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                        {report.symptoms.join(', ')}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="body1" className="text-center">
                                    Loading patient symptoms...
                                </Typography>
                            )}
                        </div>
                    ) : (
                        <Typography variant="body1" className="text-center">
                            Loading patient details...
                        </Typography>
                    )}

                    {report ? (
                        <div className="text-black">
                            <Typography variant="h6" className="mb-2 font-poppins font-semibold italic">
                                <strong>Interpretation:</strong>
                            </Typography>
                            {report.endometriosis_prediction === 1 && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    <strong>Endometriosis:</strong> Positive
                                    <span> ({report.endometriosis_accuracy}%)</span>
                                    {/* <p>Endometriosis is a disease in which tissue similar to the lining of the uterus grows outside the uterus. It can cause severe pain in the pelvis and make it harder to get pregnant. Endometriosis can start at a person's first menstrual period and last until menopause</p> */}
                                    <br />
                                    <br />

                                    <strong>Symptoms</strong>
                                    <p>Endometriosis symptoms include lower abdominal and pelvic pain and cramping, painful intercourse, vaginal bleeding, low back pain, infertility, and pain with bowel movements.</p>
                                    <br />

                                    <strong>How common?</strong>
                                    <p>Approximately 1 in 25 women have endometriosis.</p>
                                    <br />

                                    <strong>Overview</strong>
                                    <p>Endometriosis occurs when tissue cells that line the uterus start growing outside the uterus. This tissue can grow on the fallopian tubes, ovaries, bladder, bowels, or other areas in the pelvis. In rare cases, the cells grow in other areas of the body. The displaced tissue may bleed during a woman's menstrual period just like it does in the uterus. Over time, scar tissue called adhesions form, causing pain, cramping, and sometimes infertility. Endometriosis usually starts when a woman is in her 20s to early 40s. It slows down after menopause.</p>
                                    <br />

                                    <strong>Diagnosis</strong>
                                    <p>To diagnose endometriosis, analyse medical history and do a physical, including a pelvic exam. As needed, do an ultrasound, CT scan, MRI, cell biopsies, and laparoscopy.</p>

                                </Typography>
                            )}
                            {report.maternal_health_prediction === 1 && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    <strong>Maternal Health Prediction:</strong> Positive
                                </Typography>
                            )}
                            {report.pcos_prediction === 1 && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    <strong>PCOS Prediction:</strong> Positive
                                </Typography>
                            )}
                            {report.endometriosis_prediction === 0 && report.maternal_health_prediction === 0 && report.pcos_prediction === 0 && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    Great news! No positive predictions for endometriosis, PCOS, or maternal health risk!
                                </Typography>
                            )}
                        </div>
                    ) : (
                        <Typography variant="body1" className="text-center">
                            Loading report...
                        </Typography>
                    )}
                </CardBody>
            </Card>
        </DefaultLayout>
    );
}

export default Prediction;
