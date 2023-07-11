import React, { useEffect, useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import TodayWeather from './components/TodayForecast/TodayWeather';
import ForecastWrapper from './components/ForecastWrapper/ForecastWrapper';
import './app.scss';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const App = () => {
    const [currentWeather, setCurrentWeather] = useState([]);
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [searchCityWeather, setSearchCityWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [coords, setCoords] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Location data
                const getLocation = () => {
                    return new Promise((resolve, reject) => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                                (position) => resolve(position),
                                (error) => reject(error)
                            );
                        } else {
                            reject(new Error('Geolocation is not supported'));
                        }
                    });
                };
                getLocation();

                // Weather data
                const getCurrentWeather = async (lat, long) => {
                    const curWeatherResponse = await fetch(
                        `${API_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`
                    );
                    if (!curWeatherResponse.ok) {
                        throw new Error('Failed to fetch current weather');
                    }
                    return await curWeatherResponse.json();
                };

                const getHourlyWeather = async (lat, long) => {
                    const hrWeatherResponse = await fetch(
                        `${API_URL}/forecast?lat=${lat}&lon=${long}&cnt=7&units=metric&APPID=${API_KEY}`
                    );
                    if (!hrWeatherResponse.ok) {
                        throw new Error('Failed to fetch hourly weather');
                    }
                    return await hrWeatherResponse.json();
                };

                setLoading(true);
                setError(false);

                // Get position
                const position = await getLocation();

                const latitude =
                    (searchCityWeather && searchCityWeather.lat) ||
                    (coords && coords.lat) ||
                    position.coords.latitude;
                const longitude =
                    (searchCityWeather && searchCityWeather.lon) ||
                    (coords && coords.lon) ||
                    position.coords.longitude;

                // Get current weather
                const currentWeather = await getCurrentWeather(
                    latitude,
                    longitude
                );
                setCurrentWeather(currentWeather);

                // Get hourly weather
                const hourlyWeather = await getHourlyWeather(
                    latitude,
                    longitude
                );

                const formattedHourlyWeather = hourlyWeather.list?.map(
                    (item) => ({
                        pop: item.pop,
                        mainTemp: item.main.temp,
                        windSpeed: item.wind.speed,
                    })
                );
                setHourlyWeather(formattedHourlyWeather);

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        };

        fetchData();
    }, [searchCityWeather, coords]);

    // Search city by name
    const getCurrentWeatherByName = async (city) => {
        const searchWeatherResponse = await fetch(
            `${API_URL}/weather?q=${city}&appid=${API_KEY}`
        );
        if (!searchWeatherResponse.ok) {
            throw new Error('Failed to fetch search weather');
        }
        return await searchWeatherResponse.json();
    };

    const handleSearch = async (city) => {
        const resultSearch = await getCurrentWeatherByName(city);
        setSearchCityWeather(resultSearch.coord);
    };

    // Search city by name
    // const getSearchCityWeather = async (city) => {
    //     const searchWeatherResponse = await fetch(
    //         `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    //     );
    //     if (!searchWeatherResponse.ok) {
    //         throw new Error('Failed to fetch search weather');
    //     }
    //     return await searchWeatherResponse.json();
    // };

    // const handleSearch = async (city) => {
    //     const resultSearch = await getSearchCityWeather(city);
    //     setSearchCityWeather(resultSearch);
    // };

    // const handleClick = async (coord) => {
    //     setCoords(coord);
    //     setSearchCityWeather([]);
    // };

    return (
        <div className='app'>
            {loading ? (
                <h1
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    Loading....
                </h1>
            ) : error ? (
                <h1
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    No connection available
                </h1>
            ) : (
                <div className='app__weather'>
                    <div className='app__nav'>
                        <Navbar
                            onSearch={handleSearch}
                            // onClick={handleClick}
                            cityWeather={searchCityWeather}
                        />
                    </div>
                    <div className='app__todayWeather'>
                        <TodayWeather data={currentWeather} />
                    </div>
                    <div className='app__forecast'>
                        <ForecastWrapper
                            data={currentWeather}
                            dataWeather={hourlyWeather}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
