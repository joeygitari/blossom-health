import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
    colors: ['#FF8585', '#80CAEE', '#FFC75F'],
    chart: {
        fontFamily: 'Poppins, sans-serif',
        type: 'bar',
        height: 335,
        stacked: true,
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
        categories: [],
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '14px',
        markers: {
            radius: 99,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 5,
        }
    },
    fill: {
        opacity: 1,
    },
};

const SymptomCountsChart = () => {
    const [chartData, setChartData] = useState({
        series: [{ name: 'Patients', data: [] }],
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
                    console.error("Failed to fetch patients");
                    return [];
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
                return [];
            }
        };

        const fetchSymptoms = async () => {
            try {
                const response = await fetch('/symptoms');
                if (!response.ok) {
                    throw new Error('Failed to fetch symptoms');
                }
                const data = await response.json();
                return data.map(symptom => symptom[1]);
            } catch (error) {
                console.error('Error fetching symptoms:', error);
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
                    console.error(`Failed to fetch symptoms for patient ${patientId}`);
                    return [];
                }
            } catch (error) {
                console.error(`Error fetching symptoms for patient ${patientId}:`, error);
                return [];
            }
        };

        const processSymptomCounts = async () => {
            const patients = await fetchPatients();
            const symptoms = await fetchSymptoms();

            const symptomCounts = {};
            symptoms.forEach(symptom => {
                symptomCounts[symptom] = 0;
            });

            for (const patient of patients) {
                const patientId = patient[0]; // Ensure correct field name here
                const patientSymptoms = await fetchPatientSymptoms(patientId);
                patientSymptoms.forEach(symptom => {
                    if (symptomCounts.hasOwnProperty(symptom)) {
                        symptomCounts[symptom]++;
                    }
                });
            }

            const categories = Object.keys(symptomCounts);
            const seriesData = Object.values(symptomCounts);

            setChartData({
                series: [{ name: 'Patients', data: seriesData }],
                categories: categories
            });
        };

        processSymptomCounts();
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
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default SymptomCountsChart;
