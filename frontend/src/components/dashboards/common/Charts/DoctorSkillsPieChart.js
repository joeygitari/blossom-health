import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const baseOptions = {
    chart: {
        fontFamily: 'Poppins, sans-serif',
        type: 'donut',
    },
    colors: ['#FF8585', '#6577F3', '#8FD0EF', '#0FADCF'],
    legend: {
        show: false,
        position: 'bottom',
    },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                background: 'transparent',
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
            breakpoint: 2600,
            options: {
                chart: {
                    width: 380,
                },
            },
        },
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: 200,
                },
            },
        },
    ],
};

const DoctorSkillsPieChart = () => {
    const [series, setSeries] = useState([]);
    const [chartOptions, setChartOptions] = useState({ ...baseOptions, labels: [] });
    const [symptoms, setSymptoms] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchSymptoms = async () => {
                try {
                    const response = await fetch(`/predict/${currentUser.user_id}`);
                    const data = await response.json();
                    if (data.error) {
                        console.error(data.error);
                        return;
                    }

                    const symptomsData = data.symptoms;
                    const symptomsLabels = [
                        'Heavy / Extreme menstrual bleeding', 'Menstrual pain (Dysmenorrhea)', 
                        'Painful / Burning pain during sex (Dyspareunia)', 'Pelvic pain', 
                        'Irregular / Missed periods', 'Cramping', 'Abdominal pain / pressure', 
                        'Back pain', 'Painful bowel movements', 'Nausea', 'Menstrual clots', 
                        'Infertility', 'Painful cramps during period', 'Pain / Chronic pain', 
                        'Diarrhea', 'Long menstruation', 'Constipation / Chronic constipation', 
                        'Vomiting / constant vomiting', 'Fatigue / Chronic fatigue'
                    ];
                    const filteredLabels = symptomsLabels.filter(label => symptomsData.includes(label));
                    const seriesData = filteredLabels.map(label => 1);

                    setSeries(seriesData);
                    setChartOptions({
                        ...baseOptions,
                        labels: filteredLabels
                    });
                    setSymptoms(symptomsData);
                } catch (error) {
                    console.error('Error fetching symptoms:', error);
                }
            };

            fetchSymptoms();
        }
    }, [currentUser]);

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-black xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-poppins font-semibold text-black dark:text-white">
                        My Symptoms
                    </h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={chartOptions}
                        series={series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {chartOptions.labels && chartOptions.labels.length > 0 && chartOptions.labels.map((label, index) => (
                    <div key={index} className="sm:w-1/2 w-full px-8">
                        <div className="flex w-full items-center">
                            <span className="mr-2 block h-3 w-full max-w-3 rounded-full" style={{ backgroundColor: baseOptions.colors[index % baseOptions.colors.length] }}></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span>{label}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorSkillsPieChart;
