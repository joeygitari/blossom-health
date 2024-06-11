import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
    colors: [ '#FF8585', '#80CAEE', '#FFC75F'],
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
        categories: ['Endometriosis', 'PCOS', 'Maternal Health Risk'],  // Updated to show diseases
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
            horizontal: 10,  // Add horizontal spacing between legend items
            vertical: 5      // Add vertical spacing between legend items (optional)
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
                        data: [predictions.endometriosis, 0, 0] // One value for each category
                    },
                    {
                        name: 'PCOS',
                        data: [0, predictions.pcos, 0] // One value for each category
                    },
                    {
                        name: 'Maternal Health Risk',
                        data: [0, 0, predictions.maternal_health] // One value for each category
                    }
                ],
                categories: ['Endometriosis', 'PCOS', 'Maternal Health Risk']
            });
    
        } catch (error) {
            console.error("Error fetching predictions: " + error.message);
        }
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
                    <div className="relative z-20 inline-block">
                        <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                    fill="#637381"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                    fill="#637381"
                />
              </svg>
            </span>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
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
