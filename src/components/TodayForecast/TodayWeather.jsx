import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './todayWeather.scss';

const TodayWeather = ({ data }) => {
    const [time, setTime] = useState();
    const [currentTime, setCurrentTime] = useState('');
    const [currentDay, setCurrentDay] = useState('');

    const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    const iconWeather = data.weather[0].icon;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTimeInMillis = Date.now() + userTimezoneOffset;
            const adjustedTimeInMillis =
                data?.dt * 1000 +
                data?.timezone * 1000 +
                (currentTimeInMillis - Date.now());
            const date = new Date(adjustedTimeInMillis);
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const sunriseTime = data.sys.sunrise;
            const sunsetTime = data.sys.sunset;
            const isSunriseTime =
                currentTimeInSeconds > sunriseTime &&
                currentTimeInSeconds < sunsetTime;

            setCurrentTime(isSunriseTime ? 'Sunrise Time' : 'Sunset Time');
        }, 2000);

        const currentDay = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
        });

        setCurrentDay(currentDay);

        return () => clearInterval(interval);
    }, []);

    console.log(time);

    return (
        <div className='todayWeather'>
            <div className='todayWeather__bg'>
                <div className='todayWeather__details'>
                    <div className='weather'>
                        <img
                            src={` https://openweathermap.org/img/wn/${iconWeather}@2x.png`}
                            alt=''
                            className='weather__icon'
                        />
                        <div>
                            {data.main?.temp ? (
                                <h1>{Math.round(data.main?.temp)}°</h1>
                            ) : (
                                <p>No Connection Available</p>
                            )}
                        </div>
                        <div>
                            {data.name && data.sys?.country ? (
                                <p className='weather__place'>
                                    {data.name}, {data.sys?.country}
                                </p>
                            ) : (
                                <p>No Connection Available</p>
                            )}
                        </div>
                    </div>
                    <div className='time'>
                        <h2>{time}</h2>
                        <p>
                            {currentTime}, {currentDay}
                        </p>
                        <p className='desc'>{data.weather[0].description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

TodayWeather.propTypes = {
    data: PropTypes.array,
};

export default TodayWeather;
