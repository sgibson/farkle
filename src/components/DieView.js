import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

import imgD1 from 'img/d1.png';
import imgD2 from 'img/d2.png';
import imgD3 from 'img/d3.png';
import imgD4 from 'img/d4.png';
import imgD5 from 'img/d5.png';
import imgD6 from 'img/d6.png';

import imgF from 'img/f.png';
import imgA from 'img/a.png';
import imgR from 'img/r.png';
import imgK from 'img/k.png';
import imgL from 'img/l.png';
import imgE from 'img/e.png';

const DieView = (props) => 
{
    const diceVO = [
        { img: imgD1, idle: imgF, value: 1, altText: 'one', altIdle: 'F' },
        { img: imgD2, idle: imgA, value: 2, altText: 'two', altIdle: 'A' },
        { img: imgD3, idle: imgR, value: 3, altText: 'three', altIdle: 'R' },
        { img: imgD4, idle: imgK, value: 4, altText: 'four', altIdle: 'K' },
        { img: imgD5, idle: imgL, value: 5, altText: 'five', altIdle: 'L' },
        { img: imgD6, idle: imgE, value: 6, altText: 'six', altIdle: 'E' }
    ];

    const {
        dieValue,
        isIdle,
        index
    } = props;

    const i = (isIdle === false) ? diceVO[dieValue].img : diceVO[index].idle;
    const a = (isIdle === false) ? diceVO[dieValue].altText : diceVO[index].altIdle;
    return(
        <div>
            <Image 
                className='diceImg' 
                src={i} 
                altText={a} /> 
        </div>
    );
}



DieView.propTypes = {
    dieValue: PropTypes.number,
    isIdle: PropTypes.bool,
    index: PropTypes.number.isRequired
};

export default DieView;



