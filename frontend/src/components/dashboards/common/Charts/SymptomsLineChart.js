import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import html2pdf from 'html2pdf.js';

const options = {
    colors: [
        '#FF8585', '#80CAEE', '#FFC75F', '#8FD0EF', '#6577F3', '#F7B267', 
        '#A9A9A9', '#8FCB9B', '#D881E3', '#FCD35E', '#5EC4E8', '#EFB9FF',
        '#91E4D1', '#FFB3A7', '#B2ABFF'
    ],
    chart: {
        fontFamily: 'Poppins, sans-serif',
        type: 'line',
        height: 335,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        type: 'category',
        title: {
            text: 'Ages',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                color: '#333'
            }
        },
        labels: {
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif',
                colors: ['#333']
            }
        },
    },
    yaxis: {
        title: {
            text: 'Number of Patients',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                color: '#333'
            }
        },
        labels: {
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif',
                colors: ['#333']
            }
        },
    },
    legend: {
        show: false,
    },
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 5,
    },
    markers: {
        size: 5,
        hover: {
            size: 7,
        }
    },
    fill: {
        opacity: 1,
    },
};

const PatientLineChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        categories: []
    });
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("/practitioners_patients");
                if (response.ok) {
                    const data = await response.json();
                    // console.log("Fetched patients:", data); // Debug log
                    return data;
                } else {
                    throw new Error("Failed to fetch patients");
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
                return [];
            }
        };

        const fetchPatientSymptoms = async (patientId) => {
            try {
                const response = await fetch(`/predict/${patientId}`);
                if (response.ok) {
                    const data = await response.json();
                    // console.log(`Fetched symptoms for patient ${patientId}:`, data.symptoms); // Debug log
                    return data.symptoms;
                } else {
                    throw new Error(`Failed to fetch symptoms for patient ${patientId}`);
                }
            } catch (error) {
                console.error(`Error fetching symptoms for patient ${patientId}:`, error);
                return [];
            }
        };

        const processPatientData = async () => {
            try {
                const patients = await fetchPatients();
                const ages = [...new Set(patients.map(patient => patient[4]))].sort();
                const symptomsMap = {};

                for (const patient of patients) {
                    const patientId = patient[0];
                    const patientSymptoms = await fetchPatientSymptoms(patientId);

                    if (patientSymptoms && patientSymptoms.length > 0) {
                        patientSymptoms.forEach(symptom => {
                            if (!symptomsMap[symptom]) {
                                symptomsMap[symptom] = Array(ages.length).fill(0);
                            }
                            symptomsMap[symptom][ages.indexOf(patient[4])]++; // Increment count for the corresponding age
                        });
                    }
                }

                // console.log("Symptoms map:", symptomsMap); // Debug log

                const seriesData = Object.keys(symptomsMap).map(symptom => ({
                    name: symptom,
                    data: symptomsMap[symptom],
                }));

                // console.log("Series data:", seriesData); // Debug log

                setChartData({
                    series: seriesData,
                    categories: ages.map(age => age.toString()), // Convert ages to strings
                });
            } catch (error) {
                console.error("Error processing patient data:", error);
            }
        };

        processPatientData();
    }, []);

    const updatedOptions = {
        ...options,
        xaxis: {
            ...options.xaxis,
            categories: chartData.categories,
        },
    };

    const generatePDF = () => {
        const element = chartRef.current;
        const options = {
            margin: [0.5, 0.5, 1, 0.5],
            filename: 'symptoms-line-chart.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'in', format: [8.5, 11], orientation: 'portrait' }
        };

        html2pdf().from(element).set(options).save();
    };

    return (
        <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-black xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                    <h4 className="text-xl font-poppins font-semibold text-black dark:text-white">
                         Symptoms Report
                    </h4>
                </div>
                <div>
                    <button 
                        className="bg-[#FF8585] text-poppins text-white text-[14px] px-4 py-2 rounded flex items-center space-x-2" 
                        onClick={generatePDF}
                    >
                        <ArrowUpOnSquareIcon className="h-5 w-5" /> export
                    </button>
                </div>
            </div>
            <div>
                <div id="chartTwo" className="-ml-0 -mb-6" ref={chartRef}>
                    <ReactApexChart
                        options={updatedOptions}
                        series={chartData.series}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default PatientLineChart;
