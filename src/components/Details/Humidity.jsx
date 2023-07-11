import React, { useEffect, useState } from 'react';
import { checkPropTypes } from 'prop-types';
import { WiHumidity } from 'react-icons/wi';
import { TbUvIndex, TbSunset, TbSunrise } from 'react-icons/tb';

import './humidity.scss';

const Humidity = ({ data }) => {
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const { main } = data;

    useEffect(() => {
        const interval = setInterval(() => {
            const sunsetTime = new Date(
                data.sys?.sunset * 1000
            ).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            const sunriseTime = new Date(
                data.sys?.sunrise * 1000
            ).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setSunrise(sunriseTime);
            setSunset(sunsetTime);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    // console.log(sunrise, sunset);
    return (
        <div className='humidity'>
            <div className='humidity__wrapper'>
                <div className='humidity__stats'>
                    <WiHumidity className='humidityIcon' />
                    <div className='humidity__detail'>
                        <p className='title'>Humidity</p>
                        <p className='percent'>{main?.humidity}%</p>
                    </div>
                </div>
                <div className='humidity__stats'>
                    <TbUvIndex className='humidityIcon' />
                    <div className='humidity__detail'>
                        <p className='title'>UV Index</p>
                        <p className='percent'>0 of 30</p>
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='humidity__wrapper'>
                <div className='humidity__stats'>
                    <TbSunset className='humidityIcon' />
                    <div className='humidity__detail'>
                        <p className='title'>Sunset</p>
                        <p className='percent'>{sunset}</p>
                    </div>
                </div>
                <div className='humidity__stats'>
                    <TbSunrise className='humidityIcon' />
                    <div className='humidity__detail'>
                        <p className='title'>Sunrise</p>
                        <p className='percent'>{sunrise}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Humidity.propTypes = {
    data: checkPropTypes.object,
};

export default Humidity;
