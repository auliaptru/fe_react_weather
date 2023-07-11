import React from 'react';

import Humidity from '../Details/Humidity';
import Rainfall from '../Rainfall/Rainfall';
import WeeklyForecast from '../WeeklyForecast/WeeklyForecast';

import './forecastWrapper.scss';
import { checkPropTypes } from 'prop-types';

const ForecastWrapper = ({ data, dataWeather }) => {
    return (
        <div className='forecast'>
            <div className='forecast__wrapper'>
                <div className='forecast__humidity'>
                    <Humidity data={data} />
                </div>
                <div className='forecast__rainfall'>
                    <Rainfall />
                </div>
            </div>
            <div className='forecast__weekly'>
                <WeeklyForecast dataWeather={dataWeather} />
            </div>
        </div>
    );
};

ForecastWrapper.propTypes = {
    data: checkPropTypes.object,
    hourWeather: checkPropTypes.object,
};

export default ForecastWrapper;
