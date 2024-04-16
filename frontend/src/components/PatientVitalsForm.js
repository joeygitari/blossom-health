import React from 'react';

const PatientVitalsForm = () => {
    return (
        <>
            <form className="mt-[2rem]" noValidate>
                <div className="grid md:grid-cols-2 gap-[6rem]">
                    <div>
                        <div className="mb-5">
                            <label htmlFor="bloodGroup"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Blood Group <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="bloodGroup" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="eg A+" name="bloodGroup" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="bloodSugar"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Blood Sugar <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="bloodSugar" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   name="bloodSugar" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="bloodPressure"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Blood Pressure <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="bloodPressure" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   name="bloodPressure" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="heartRate"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Heart Rate <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="heartRate" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   name="heartRate" required/>
                        </div>
                    </div>

                    <div>
                        <div className="mb-5">
                            <label htmlFor="bodyTemperature"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Body Temperature <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="bodyTemperature" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   name="bodyTemperature" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="respiratoryRate"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Respiratory Rate <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="respiratoryRate" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   name="respiratoryRate" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="gravidity"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Gravidity <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="gravidity" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="Yes/No and how many" name="gravidity" required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="parity"
                                   className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                Parity <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="parity" autoComplete="off"
                                   className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                   placeholder="Yes/No" name="parity" required/>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3">
                   <div></div>
                    <div>
                        <button type="submit"
                                className="mt-[2.5rem] text-[#F7FAFC] bg-[#FF8585] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                            Update
                        </button>
                    </div>
                    <div></div>
                </div>
            </form>
        </>
    )
}

export default PatientVitalsForm;
