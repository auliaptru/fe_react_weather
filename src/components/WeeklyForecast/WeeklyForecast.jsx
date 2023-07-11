import React from 'react';
import {
    BsSun,
    BsWind,
    BsCloud,
    BsCloudLightning,
    BsCloudRain,
} from 'react-icons/bs';
import { checkPropTypes } from 'prop-types';

import Chart from '../Chart/Chart';
import './weeklyForecast.scss';

const data = [
    {
        name: 'monday',
        icon: <BsSun />,
        temp: 13,
    },
    {
        name: 'tuesday',
        icon: <BsWind />,
        temp: 12,
    },
    {
        name: 'wednesday',
        icon: <BsCloud />,
        temp: 12,
    },
    {
        name: 'thursday',
        icon: <BsCloudLightning />,
        temp: 9,
    },
    {
        name: 'friday',
        icon: <BsCloudRain />,
        temp: 7,
    },
    {
        name: 'saturday',
        icon: <BsCloud />,
        temp: 10,
    },
    {
        name: 'sunday',
        icon: <BsSun />,
        temp: 11,
    },
];

const WeeklyForecast = ({ dataWeather }) => {
    return (
        <div className='weeklyForecast'>
            <div className='weeklyForecast__title'>
                <p>Temperature</p>.<p>Precipitation</p>.<p>Wind</p>
            </div>
            <div className='weeklyForecast__chart'>
                <Chart dataWeather={dataWeather} />
            </div>
            <div className='weekly__weather'>
                <div className='card__wrapper'>
                    {data.map((item) => (
                        <>
                            <div className='card' key={item.name}>
                                <div className='weather'>
                                    <p className='weather__name'>
                                        {item.name.slice(0, 3)}
                                    </p>
                                    <div className='weather__icon'>
                                        {item.icon}
                                    </div>
                                    <h4 className='weather__temp'>
                                        {item.temp}°
                                    </h4>
                                </div>
                            </div>
                            <div className='line' />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

WeeklyForecast.propTypes = {
    hourWeather: checkPropTypes.object,
    dataWeather: checkPropTypes.array,
};

export default WeeklyForecast;
