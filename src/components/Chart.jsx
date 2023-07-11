import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import 'chart.js/auto';

import './chart.scss';
import { checkPropTypes } from 'prop-types';

const Chart = ({ dataWeather }) => {
    const mainTemp = dataWeather?.map((item) => item.mainTemp);
    const windSpeedData = dataWeather?.map((item) => item.windSpeed);
    const pop = dataWeather?.map((item) => item.pop);

    const isMainTempValid = mainTemp && mainTemp.length > 0;
    const isMainWindSpeedValid = windSpeedData && windSpeedData.length > 0;
    const isPopValid = pop && pop.length > 0;

    const data = {
        labels: ['03 am', '06 am', '09 am', '12 pm', '15 pm', '18 pm', '21 pm'],
        datasets: [
            {
                label: 'Temperature',
                data: isMainTempValid ? mainTemp : [],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4,
                showDataPoints: true,
                // pointStyle: false,
            },
            {
                label: 'Wind Speed',
                data: isMainWindSpeedValid ? windSpeedData : [],
                fill: false,
                borderColor: 'transparent',
                pointRadius: 0,
                pointStyle: false,
                hidden: true,
            },
            {
                label: 'Pop',
                data: isPopValid ? pop : [],
                fill: false,
                borderColor: 'transparent',
                pointRadius: 0,
                pointStyle: false,
                hidden: true,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    display: true,
                },
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            y: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
            mode: 'nearest',
        },

        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    title: function () {
                        return `Today's weather:`;
                    },

                    label: (context) => {
                        const index = context.dataIndex;

                        const temp = mainTemp[index];
                        const windSpeed = windSpeedData[index];
                        const precipitation = pop[index];

                        let tooltipLabel = `Temperature: ${Math.round(temp)}°C`;
                        let tooltipLabel1 = `Wind Speed: ${windSpeed}m/s`;
                        let tooltipLabel2 = `Precipitation: ${
                            precipitation * 100
                        }%`;

                        return [tooltipLabel, tooltipLabel1, tooltipLabel2];
                    },
                },

                legend: {
                    display: false,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    return (
        <div className='chart'>
            {/* <p>{clicked}</p> */}
            <Line data={data} options={options} style={{ height: '120px' }} />
        </div>
    );
};

// onClick: (event, elements) => {
//     if (elements.length > 0) {
//         const firstPoint = elements[0];
//         const label = data.labels[firstPoint.index];
//         const temperature = data.datasets[0].data[firstPoint.index];
//         const windSpeed = data.datasets[1].data[firstPoint.index];

//         const info = `${label}: Temperature ${temperature}°C, Wind Speed ${windSpeed}m/s`;
//         setClicked(info);
//     }
// },

Chart.propTypes = {
    mainWeatherArray: checkPropTypes.array,
    temp: checkPropTypes.array,
    dataWeather: checkPropTypes.array,
};

export default Chart;
