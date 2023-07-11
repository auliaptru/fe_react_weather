import React from 'react';

import { TbArrowDown } from 'react-icons/tb';
import './rainfall.scss';

const Rainfall = () => {
    return (
        <div className='rainfall'>
            <div className='rainfall__monthly'>
                <h3>Monthly Rainfall</h3>
                <p>45mm</p>
            </div>
            <div className='rainfall__year'>
                <p className='title'>This Year</p>
                <div className='rainfall__percent'>
                    <TbArrowDown className='adIcon' />
                    <p className='percent'>17%</p>
                </div>
            </div>
        </div>
    );
};

export default Rainfall;
