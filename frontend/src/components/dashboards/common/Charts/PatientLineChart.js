import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
    colors: ['#FF8585', '#80CAEE', '#FFC75F'],
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
    responsive: [
        {
            breakpoint: 1536,
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 0,
                        columnWidth: '25%',
                    },
                },
            },
        },
    ],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '25%',
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        type: 'category',
        title: {
            text: 'Ages',
        },
    },
    yaxis: {
        title: {
            text: 'Number of Patients',
        },
    },
    legend: {
        show: false,
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

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("/patients");
                if (response.ok) {
                    const data = await response.json();
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
                const ages = patients.map(patient => patient[4]);
                const symptomsMap = {};

                for (const patient of patients) {
                    const patientId = patient[0];
                    const patientSymptoms = await fetchPatientSymptoms(patientId);

                    patientSymptoms.forEach(symptom => {
                        if (!symptomsMap[symptom]) {
                            symptomsMap[symptom] = Array(ages.length).fill(0);
                        }
                        symptomsMap[symptom][ages.indexOf(patient[4])]++; // Increment count for the corresponding age
                    });
                }

                const seriesData = Object.keys(symptomsMap).map(symptom => ({
                    name: symptom,
                    data: symptomsMap[symptom],
                }));

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

    return (
        <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-black xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                    <h4 className="text-xl font-poppins font-semibold text-black dark:text-white">
                         Symptoms Report
                    </h4>
                </div>
            </div>
            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
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
