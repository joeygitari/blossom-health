import React from 'react';

const PatientProfileForm = () => {
    return (
        <>
            <form className="mt-[2rem]" noValidate>
                <div className="grid md:grid-cols-2 gap-[6rem]">
                    <div>
                        <div className="mb-5">
                            <label htmlFor="patientNames"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Patient Names <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="patientNames" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="eg Jane Doe" name="patientNames" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="medicalHistory"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Medical History <span className="text-red-500">*</span>
                            </label>
                            <textarea id="medicalHistory" autoComplete="off"
                                      className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                      placeholder="eg Previous illnesses" name="medicalHistory" rows="4" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="familyHistory"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Family History <span className="text-red-500">*</span>
                            </label>
                            <textarea id="familyHistory" autoComplete="off"
                                      className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                      placeholder="eg. Genetic illnesses such as diabetes" name="familyHistory" rows="4"
                                      required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="menstrualHistory"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Menstrual History <span className="text-red-500">*</span>
                            </label>
                            <textarea id="menstrualHistory" autoComplete="off"
                                      className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                      placeholder="eg. Cycle length" name="menstrualHistory" rows="4"
                                      required/>
                        </div>
                    </div>

                    <div>
                        <div className="mb-5">
                            <label htmlFor="medications"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Medications <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="medications" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="eg. Euthyrox" name="medications" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="allergies"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Allergies <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="allergies" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="eg. Soy" name="allergies" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="weight"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Weight <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="weight" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="in kgs" name="weight" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="height"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Height <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="height" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="in cm" name="height" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="bmi"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                BMI <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="bmi" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="kg/m2" name="bmi" required/>
                        </div>
                        <button type="submit"
                                className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
    }

    export default PatientProfileForm;
