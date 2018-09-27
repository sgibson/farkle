import React from 'react';
import PropTypes from 'prop-types';
import 'styles/gameButton.css';

const GameButton = (props) =>
{
    const {
        callback,
        label,
        className,
        isDisabled
    } = props;

    return ( <button 
                id='gameButton' 
                className = {className} 
                onClick = {callback}
                disabled = {isDisabled} > 
                    {label} 
            </button>
    );

}

GameButton.propTypes = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default GameButton;