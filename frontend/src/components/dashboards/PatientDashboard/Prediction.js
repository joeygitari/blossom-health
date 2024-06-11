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
    const [loading, setLoading] = useState(true);

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

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [patientId]);

    const exportToPDF = () => {
        const element = document.getElementById('report-content'); // Assuming you have a container with id 'payslip-container'

        html2pdf()
            .from(element)
            .save('prediction-report.pdf');
    };

    return (
        <DefaultLayout>
            {report && report.recommendation && report.recommendation !== "nothing to see here" ? (
            <>
            <div className="flex items-center mt-5 ml-5">
                <div className="absolute top-22 right-8 mb-5 mr-5 flex items-center">
                    <button className="font-bold font-poppins py-4 text-[14px] text-black dark:text-white flex items-center space-x-2" onClick={exportToPDF}>
                        <DocumentIcon className="h-5 w-5" /> 
                        <span>Export to PDF</span>
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex flex-col items-center mr-5 mt-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF8585] mb-2"></div>
                    <Typography variant="body1" className="font-poppins font-semibold text-[#FF8585]">
                        Predicting...
                    </Typography>
              </div>
            ) : (
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
                    <div className="mb-6 text-black">
                        {report && report.patients ? (
                            <>
                                <Typography variant="h6" className="mb-1 font-poppins font-semibold italic">
                                    {/* <strong>Patient information</strong> */}
                                </Typography>
                                <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                    <strong>Name:</strong> {report.patients[1]}
                                </Typography>
                                <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                    <strong>Gender:</strong> {report.patients[3]}
                                </Typography>
                                <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                    <strong>Age:</strong> {report.patients[4]}
                                </Typography>
                                <Typography variant="body1" className="mb-1 font-poppins font-normal">
                                    <strong>Location:</strong> {report.patients[5]}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body1" className="text-center">
                                    Loading patient details...
                            </Typography>
                        )}
                            <br />

                            {report && report.symptoms ? (
                                <>
                                    <Typography variant="h6" className="mb-2 font-poppins font-semibold">
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

                    {report ? (
                        <div className="text-black">
                            <Typography variant="h6" className="mb-2 font-poppins font-semibold underline">
                                <strong>Interpretation:</strong>
                            </Typography>
                            {report.endometriosis_prediction === 1 && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    <strong>Endometriosis:</strong> Positive
                                    {/* <span> ({report.endometriosis_accuracy}%)</span> */}
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
                                    <br />

                                    <strong>BlossomHealth Recommendation</strong>
                                    <p>Request a physical exam from your gynaecologist, especially an ultrasound to determine the presence of endometriosis.</p>
                                    
                                </Typography>
                            )}
                            {report.maternal_health_prediction === 'high risk' && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    <strong>Maternal Health Prediction:</strong> High risk
                                    {/* <span>(high risk)</span> */}
                                    {/* <span>({report.maternal_health_accuracy}%)</span> */}
                                    <br />
                                    <br />

                                    <strong className="underline">Overview</strong>
                                    <p>Maternal health risks and childbirth complications refer to health issues that arise during pregnancy, labor, delivery, and the postpartum period. These complications can affect both the mother and the baby, and their severity can range from mild to life-threatening. Common complications include preeclampsia, gestational diabetes, preterm labor, and infections.</p>
                                    <br />

                                    <strong className="underline">Common complications</strong>
                                    <ul>
                                        <li><strong>Preeclampsia:</strong><br /> High blood pressure, swelling of hands and feet, protein in urine, severe headaches, vision changes. Affects about 5-8% of pregnant women.</li>
                                        <br />
                                        <li><strong>Gestational Diabetes:</strong><br /> Often asymptomatic; sometimes increased thirst, frequent urination, fatigue. Affects 6-9% of pregnant women.</li>
                                        <br />
                                        <li><strong>Preterm Labor:</strong><br /> Regular contractions, lower back pain, changes in vaginal discharge, pelvic pressure. Approximately 10% of births are preterm.</li>
                                        <br />
                                        <li><strong>Infections:</strong><br /> Fever, chills, painful urination, abnormal discharge. Varies depending on the type of infection (e.g., urinary tract infections are common, affecting about 8% of pregnant women).</li>
                                        <br />
                                        <li><strong>Placental Abruption:</strong><br /> Vaginal bleeding, abdominal pain, back pain, uterine tenderness. Affects about 1 in 100 pregnancies.</li>
                                        <br />
                                        <li><strong>Postpartum Hemorrhage:</strong><br /> Heavy bleeding after delivery, drop in blood pressure, rapid heart rate. Occurs in about 1-5% of deliveries.</li>
                                    </ul>
                                    <br />

                                    <strong className="underline">Diagnosis</strong>
                                    <ul>
                                        <li><strong>Regular Prenatal Checkups:</strong> Monitoring blood pressure, blood tests, urine tests, and ultrasounds to identify potential complications early.</li>
                                        <br />
                                        <li><strong>Specific Tests:</strong> Blood pressure readings and urine tests for preeclampsia. Glucose tolerance test for gestational diabetes. Cervical exams and ultrasound for signs of preterm labor. Blood tests, cultures, and physical examinations for infections.</li>
                                    </ul>
                                    <br />
                                    
                                </Typography>
                            )}
                            {report.pcos_prediction === 1 && (
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    <strong>PCOS Prediction:</strong> Positive
                                    {/* <span> ({report.pcos_accuracy}%)</span> */}
                                    <br />
                                    <br />

                                    <strong>Symptoms</strong>
                                    <p>Absent or irregular periods, infertility, increased facial and body hair, acne, weight gain (especially around the abdomen), trouble losing weight, depression, male pattern hair loss, gestational diabetes, high blood pressure (especially during pregnancy or delivery), skin tags, pelvic pain, sleep apnea</p>
                                    <br />

                                    <strong>How common?</strong>
                                    <p>1 in every 10 - 20 women of childbearing age has PCOS.</p>
                                    <br />

                                    <strong>Overview</strong>
                                    <p>Polycystic ovary syndrome (PCOS) is a common cause of female infertility. In most, but not all, women with the condition, the ovaries have many small cysts. Women with PCOS may not ovulate regularly or at all, and have trouble getting pregnant. Other symptoms may include irregular periods, increased body and facial hair, acne, and obesity. Doctors don't know exactly what causes PCOS, but it happens when hormones get out of balance. With PCOS, a woman's body makes more androgens, the male sex hormones. Other hormones, including estrogen, progesterone, and insulin, are also out of balance. Over time, especially if not managed, PCOS increases the risk of such problems as repeated miscarriages, diabetes, heart disease, and cancer.</p>
                                    <br />

                                    <strong>Risk Factors</strong>
                                    <p>Family history of PCOS, irregular periods, or diabetes</p>
                                    <br />

                                    <strong>Diagnosis</strong>
                                    <p>To diagnose PCOS, take a health history and give you physical, including a pelvic exam to check the ovaries. Order blood tests to check hormone balance and look for other signs of PCOS. A vaginal ultrasound can show enlarged ovaries or excess tiny cysts in your ovaries.</p>
                                    <br />

                                    <strong>BlossomHealth Recommendation</strong>
                                    See your gynaecologist if you're worried about your periods, if you're having trouble getting pregnant, or if you have signs of excess androgen. These might include new hair growth on your face and body, acne and male-pattern baldness.
                                </Typography>
                            )}
                            {report.maternal_health_prediction === 'mid risk' && (
                                <>
                                <br />
                                <Typography variant="body1" className="mb-4 font-poppins font-normal">
                                    {/* Note: You are also at mid risk of getting maternal health complications */}
                                    <strong>Note</strong>
                                    <p>You are also at mid risk of getting maternal health complications. Kindly contact your doctor on how to deal with this.</p>
                                </Typography>
                                </>
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
                    <br />
                    <br />
                    <Typography variant="h6" className="mb-1 text-black font-poppins font-normal">
                        <strong>Doctor's Recommendation</strong>
                    </Typography>
                    <Typography variant="body1" className="mb-1 text-black font-poppins font-normal">
                        {report.recommendation}
                    </Typography>
                    <br />
                    {report && report.practitioner ? (
                            <>
                                <Typography variant="h6" className="mb-4 text-black font-poppins font-normal">
                                    <strong>Overseen by:</strong>
                                </Typography>
                                <Typography variant="body1" className="mb-1 text-black font-poppins font-normal">
                                    Dr. {report.practitioner.name}
                                </Typography>
                                <Typography variant="body1" className="mb-1 text-black font-poppins font-normal">
                                    {report.practitioner.specialization}
                                </Typography>
                            </>
                    ) : (
                            <Typography variant="body1" className="text-center">
                                    Loading practitioner details...
                            </Typography>
                    )}
                </CardBody>
            </Card>
            )}
            </>
            ):(
<               Typography variant="body1" className="text-center">
                    Nothing to see here
                </Typography>
            )}
        </DefaultLayout>
    );
}

export default Prediction;
