import React from 'react';
import PropTypes from 'prop-types';
import 'styles/bankButton.css';

const BankButton = (props) => 
{
    const {
        callback,
        label,
        className,
        isDisabled
    } = props;

    return (
            <button 
                id='bankButton' 
                className={className} 
                onClick={callback}
                disabled={isDisabled}>{label}
            </button>
    );
    
}



BankButton.propTypes = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default BankButton;
