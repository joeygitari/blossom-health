import React, {useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';

const PatientsForm = () => {
    const [symptoms, setSymptoms] = useState([]);
    // const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        patientNames: '',
        medicalHistory: '',
        familyHistory: '',
        menstrualHistory: '',
        medications: '',
        allergies: '',
        weight: '',
        height: '',
        bmi: '',
        bloodGroup: '',
        bloodSugar: '',
        bloodPressure: '',
        heartRate: '',
        bodyTemperature: '',
        respiratoryRate: '',
        gravidity: '',
        parity: '',
        selectedSymptoms: [],
        gender: '',
        age: '',
        location: ''
    });

    const customStyles = {
        control: base => ({
            ...base,
            // height: 50,
            minHeight: 50
        })
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

         // Calculate BMI immediately when weight or height changes
         if (name === 'weight' || name === 'height') {
            calculateBMI(value, name);
        }
    };

    const calculateBMI = (value, name) => {
        const { weight, height } = formData;
        if (weight && height) {
            const weightInKg = parseFloat(weight);
            const heightInMeters = name === 'height' ? parseFloat(value) / 100 : parseFloat(height) / 100;
            const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
            setFormData((prevData) => ({
                ...prevData,
                bmi: bmi,
            }));
        }
    };

    const handleNext = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handlePrev = () => {
        setStep(prevStep => prevStep - 1);
    };

    const fetchSymptoms = async () => {
        try {
            const response = await fetch('/symptoms');
            if (!response.ok) {
                throw new Error('Failed to fetch symptoms');
            }
            const data = await response.json();
            const symptomOptions = data.map(symptom => ({
                value: symptom[0],
                label: symptom[1]
            }));
            setSymptoms(symptomOptions);
        } catch (error) {
            console.error('Error fetching symptoms:', error);
        }
    };

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const handleSymptomChange = (selectedOptions) => {
        setFormData({
            ...formData,
            selectedSymptoms: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/submit-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Patient profile started successfully",{
                    onClose: () => {
                        navigate('/medic-dashboard/patients');
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <DefaultLayout>
            <section className="bg-[#F7FAFC]">
                <div className="container mx-auto min-h-screen p-8">
                    <form className="mt-[2rem]" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                            <div className="grid md:grid-cols-1">
                                <p className="font-poppins font-bold text-[36px] text-[#172048] mt-[0rem]">Add Patient
                                    Profile</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-[6rem] mt-[2rem]">
                                    <div>
                                        <div className="mb-5">
                                            <label htmlFor="patientNames"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Patient Names <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="patientNames" autoComplete="off" value={formData.patientNames} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="eg Jane Doe" name="patientNames" required />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-[2rem]">
                                            <div>
                                                <div className="mb-5">
                                                    <label htmlFor="gender" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                        Gender <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        type="text"
                                                        id="gender"
                                                        name="gender"
                                                        autoComplete="off"
                                                        value={formData.gender}
                                                        onChange={handleChange}
                                                        className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                        required
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="non-binary">Non binary</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="mb-5">
                                                    <label htmlFor="age" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                        Age <span className="text-red-500">*</span>
                                                    </label>
                                                    <input type="number" id="age" autoComplete="off" value={formData.age} onChange={handleChange}
                                                        className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                        name="age" required />
                                                </div>
                                            </div>
                                            
                                        </div>


                                        <div className="mb-5">
                                            <label htmlFor="medicalHistory"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Medical History <span className="text-red-500">*</span>
                                            </label>
                                            <textarea id="medicalHistory" autoComplete="off" value={formData.medicalHistory} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="Previous illnesses" name="medicalHistory" rows="3" required />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="familyHistory"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Family History <span className="text-red-500">*</span>
                                            </label>
                                            <textarea id="familyHistory" autoComplete="off" value={formData.familyHistory} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="Genetic illnesses" name="familyHistory" rows="3"
                                                required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="text" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Location/Residence <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="text" autoComplete="off" value={formData.location} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="eg Nairobi" name="location" required/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-5">
                                            <label htmlFor="menstrualHistory"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Menstrual History <span className="text-red-500">*</span>
                                            </label>
                                            <input id="menstrualHistory" autoComplete="off" value={formData.menstrualHistory} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="Cycle length" name="menstrualHistory" rows="4"
                                                required />
                                        </div>
                                        <div className="mb-5">
                                            
                                            <label htmlFor="medications"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Medications <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="medications" autoComplete="off" value={formData.medications} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="eg. Euthyrox" name="medications" required />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="allergies"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Allergies <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="allergies" autoComplete="off" value={formData.allergies} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="eg. Soy" name="allergies" required />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="weight"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Weight <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="weight" autoComplete="off" value={formData.weight} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="in kgs" name="weight" required />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="height"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Height <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="height" autoComplete="off" value={formData.height} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="in cm" name="height" required />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="bmi"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                BMI <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="bmi" autoComplete="off" value={formData.bmi} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="kg/m2" name="bmi" required />
                                        </div>
                                        <button type="submit" onClick={handleNext}
                                            className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                                            Next
                                        </button>
                                    </div>
                                </div></>
                                )}
                                {step === 2 && (
                                    <>
                                    <div className="grid md:grid-cols-1">
                                            <p className="font-poppins font-bold text-[36px] text-[#172048] mt-[1rem]">Add Patient
                                                Vitals</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-[6rem]">
                                                <div>
                                                    <div className="mb-5">
                                                        <label htmlFor="bloodGroup"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Blood Group <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="bloodGroup" autoComplete="off" value={formData.bloodGroup} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            placeholder="eg A+" name="bloodGroup" required />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="bloodSugar"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Blood Sugar <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="bloodSugar" autoComplete="off" value={formData.bloodSugar} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            name="bloodSugar" required />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="bloodPressure"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Blood Pressure <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="bloodPressure" autoComplete="off" value={formData.bloodPressure} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            name="bloodPressure" required />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="heartRate"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Heart Rate <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="heartRate" autoComplete="off" value={formData.heartRate} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            name="heartRate" required />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="mb-5">
                                                        <label htmlFor="bodyTemperature"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Body Temperature <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="bodyTemperature" autoComplete="off" value={formData.bodyTemperature} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            name="bodyTemperature" required />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="respiratoryRate"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Respiratory Rate <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="respiratoryRate" autoComplete="off" value={formData.respiratoryRate} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            name="respiratoryRate" required />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="gravidity"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Gravidity <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="gravidity" autoComplete="off" value={formData.gravidity} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            placeholder="Yes/No and how many" name="gravidity" required />
                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="parity"
                                                            className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                            Parity <span className="text-red-500">*</span>
                                                        </label>
                                                        <input type="text" id="parity" autoComplete="off" value={formData.parity} onChange={handleChange}
                                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                            placeholder="Yes/No" name="parity" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-3">
                                                {/* <div></div> */}
                                                <div>
                                                    <button onClick={handlePrev}
                                                        className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                                                        Back
                                                    </button>
                                                </div>
                                                <div></div>
                                                <div>
                                                    <button onClick={handleNext}
                                                        className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                                                        Next
                                                    </button>
                                                </div>

                                            </div>
                                        </>
                                )}
                                {step === 3 && (
                                    <>
                                        <div className="grid md:grid-cols-1">
                                                <p className="font-poppins font-bold text-[36px] text-[#172048] mt-[1rem]">Add Patient
                                                    Symptoms</p>
                                        </div>
                                        <div className="mt-[2rem] font-poppins dark:text-[#172048]">
                                            <Select
                                                isMulti
                                                options={symptoms}
                                                styles={customStyles}
                                                onChange={handleSymptomChange}
                                                value={formData.selectedSymptoms.map(symptom => symptoms.find(option => option.value === symptom))}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div className="mb-5">
                                            {/* <label htmlFor="medicalHistory"
                                                className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                                Medical History <span className="text-red-500">*</span>
                                            </label> */}
                                            <textarea id="otherSymptoms" autoComplete="off" value={formData.otherSymptoms} onChange={handleChange}
                                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                                placeholder="Other Symptoms" name="otherSymptoms" rows="4" required />
                                        </div>
                                        <div className="grid md:grid-cols-3">
                                            {/* <div></div> */}
                                            <div>
                                                <button onClick={handlePrev}
                                                    className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                                                    Back
                                                </button>
                                            </div>
                                            <div></div>
                                            <div>
                                                <button type="submit"
                                                    className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                        </form>
                    
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={3000}
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
    );
};

export default PatientsForm;