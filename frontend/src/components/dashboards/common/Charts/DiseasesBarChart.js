import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import html2pdf from 'html2pdf.js';
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";

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
        categories: ['Endometriosis', 'PCOS', 'Maternal Health Risk'],
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

const DiseasesBarChart = () => {
    const [patients, setPatients] = useState([]);
    const [chartData, setChartData] = useState({
        series: [
            { name: 'Endometriosis', data: [0] },
            { name: 'PCOS', data: [0] },
            { name: 'Maternal Health Risk', data: [0] }
        ],
        categories: ['Diseases']
    });
    const chartRef = useRef(null);

    const fetchPatients = async () => {
        try {
            const response = await fetch("/patients");
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
                handlePredict(data);
            } else {
                console.error("Failed to fetch patients");
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handlePredict = async (patients) => {
        try {
            const predictions = {
                endometriosis: 0,
                pcos: 0,
                maternal_health: 0
            };

            for (const patient of patients) {
                const response = await fetch(`/predict/${patient[0]}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.endometriosis_prediction) predictions.endometriosis++;
                    if (data.pcos_prediction) predictions.pcos++;
                    if (data.maternal_health_prediction === 'high risk') predictions.maternal_health++;
                } else {
                    console.error(`Failed to fetch predictions for patient ${patient.id}`);
                }
            }

            setChartData({
                series: [
                    {
                        name: 'Endometriosis',
                        data: [predictions.endometriosis, 0, 0]
                    },
                    {
                        name: 'PCOS',
                        data: [0, predictions.pcos, 0]
                    },
                    {
                        name: 'Maternal Health Risk',
                        data: [0, 0, predictions.maternal_health]
                    }
                ],
                categories: ['Endometriosis', 'PCOS', 'Maternal Health Risk']
            });

        } catch (error) {
            console.error("Error fetching predictions: " + error.message);
        }
    };

    const generatePDF = () => {
        const element = chartRef.current;
        const options = {
            margin: [0.5, 0.5, 1, 0.5],
            filename: 'diseases-chart.pdf',
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
                         Diseases Report
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
                <div id="chartTwo" className="-ml-4 -mb-6" ref={chartRef}>
                    <ReactApexChart
                        options={options}
                        series={chartData.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default DiseasesBarChart;
