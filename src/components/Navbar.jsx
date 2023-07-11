import { useState } from 'react';
import { CgMenuRight, CgSearch } from 'react-icons/cg';

import './navbar.scss';
import { checkPropTypes } from 'prop-types';

const Navbar = ({ onSearch, cityWeather, onClick }) => {
    const [city, setCity] = useState('');
    const [isListOpen, setListOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(city);
        // setListOpen(true);
    };
    console.log(city);
    // const handleClick = (lat, lon, e) => {
    //     e.preventDefault();
    //     const coordinates = {
    //         lat: lat,
    //         lon: lon,
    //     };
    //     onClick(coordinates);
    //     setListOpen(false);
    // };

    const handleChange = (e) => {
        e.preventDefault();

        const inputCity = e.target.value;
        setCity(inputCity);

        // if (inputCity.length > 0) {
        //     setListOpen(true);
        // } else {
        //     setListOpen(false);
        // }
    };

    return (
        <nav>
            <h1 className='nav__logo'>Weather</h1>
            <form className='nav__wrapper' onSubmit={handleSearch}>
                <label className='nav__search'>
                    <input
                        type='search'
                        placeholder='Enter city name...'
                        value={city}
                        onChange={handleChange}
                    />
                    <CgSearch className='searchIcon' />
                </label>
                {/* {isListOpen && ( */}
                {/* <div className='listCity'>
                    {cityWeather.length > 0 ? (
                        <ul>
                            {cityWeather.map((city, i) => (
                                <li
                                    key={i}
                                    // onClick={(e) =>
                                    //     handleClick(city.lat, city.lon, e)
                                    // }
                                >
                                    <p>
                                        {city.name},{' '}
                                        {city.state && `${city.state},`}{' '}
                                        {city.country}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>Search city</div>
                    )}
                </div> */}
                {/* )} */}
                <div className='nav__menu'>
                    <CgMenuRight className='menuIcon' />
                </div>
            </form>
        </nav>
    );
};

Navbar.propTypes = {
    onSearch: checkPropTypes.function,
};

export default Navbar;
