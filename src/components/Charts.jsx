import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Charts = ({ dataWeather }) => {
    const [chart, setChart] = useState(null);

    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const mainTemp = dataWeather?.map((item) => item.mainTemp);
        const windSpeedData = dataWeather?.map((item) => item.windSpeed);

        if (chart) {
            chart.clear();
            chart.destroy();
        }

        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    '03 am',
                    '06 am',
                    '09 am',
                    '12 pm',
                    '15 pm',
                    '18 pm',
                    '21 pm',
                ],
                datasets: [
                    {
                        label: 'Temperature',
                        data: mainTemp,
                        fill: true,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.4,
                        pointStyle: false,
                    },
                    {
                        label: 'Wind Speed',
                        data: windSpeedData,
                        fill: false,
                        borderColor: 'transparent',
                        pointRadius: 0,
                        pointStyle: false,
                    },
                ],
            },
            options: {
                onClick: (event) => {
                    const activePoints = chart.getElementsAtEventForMode(
                        event,
                        'nearest',
                        { intersect: true },
                        true
                    );

                    if (activePoints.length > 0) {
                        const firstPoint = activePoints[0];
                        const label = chart.data.labels[firstPoint.index];
                        const temperature =
                            chart.data.datasets[0].data[firstPoint.index];
                        const windSpeed =
                            chart.data.datasets[1].data[firstPoint.index];

                        console.log(
                            `Clicked on ${label}: Temperature ${temperature}°C, Wind Speed ${windSpeed}m/s`
                        );
                    }
                },
            },
        });
        setChart(newChart);
        return () => {
            if (chart) {
                chart.clear();
                chart.destroy();
            }
        };
    }, [dataWeather, chart]);

    return (
        <div>
            <canvas ref={chartRef} style={{ height: '120px' }} />
        </div>
    );
};

export default Charts;
